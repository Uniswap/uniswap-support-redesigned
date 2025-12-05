/* eslint-env node */
require('dotenv').config();

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const FormData = require('form-data');

// Configuration
const ZENDESK_SUBDOMAIN = 'uniswaplabs';
const ZENDESK_EMAIL = process.env.ZENDESK_EMAIL;
const ZENDESK_API_TOKEN = process.env.ZENDESK_API_TOKEN;

const POLL_INTERVAL = 5000; // 5 seconds
const MAX_POLL_ATTEMPTS = 120; // 10 minutes max

// Validate required environment variables
function validateEnv() {
  const required = ['ZENDESK_EMAIL', 'ZENDESK_API_TOKEN'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
}

// Make authenticated API request to Zendesk
function makeZendeskRequest(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${ZENDESK_EMAIL}/token:${ZENDESK_API_TOKEN}`).toString('base64');

    const options = {
      hostname: `${ZENDESK_SUBDOMAIN}.zendesk.com`,
      path: endpoint,
      method: method,
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Bump version in manifest.json using timestamp
function bumpVersion() {
  const manifestPath = path.join(__dirname, '..', 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  // Use timestamp to ensure always-incrementing unique version
  const [major, minor] = manifest.version.split('.').map(Number);
  const timestamp = Math.floor(Date.now() / 1000);
  manifest.version = `${major}.${minor}.${timestamp}`;

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`✓ Version bumped to ${manifest.version}`);

  return manifest.version;
}

// Create theme ZIP file
function createThemeZip() {
  console.log('📦 Creating theme ZIP file...');

  const zip = new AdmZip();
  const rootDir = path.join(__dirname, '..');

  // Files and directories to include in theme
  const includePatterns = [
    'manifest.json',
    'script.js',
    'style.css',
    'thumbnail.png',
    'assets',
    'templates',
    'settings',
    'translations',
  ];

  includePatterns.forEach((pattern) => {
    const fullPath = path.join(rootDir, pattern);

    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        zip.addLocalFolder(fullPath, pattern);
      } else {
        zip.addLocalFile(fullPath);
      }
    }
  });

  const zipPath = path.join(rootDir, 'theme-upload.zip');
  zip.writeZip(zipPath);

  console.log(`✓ Theme ZIP created: ${zipPath}`);
  return zipPath;
}

// Get the live theme ID
async function getLiveThemeId() {
  console.log('📋 Finding live theme...');
  const response = await makeZendeskRequest('GET', '/api/v2/guide/theming/themes');

  if (response.status !== 200) {
    throw new Error(`Failed to fetch themes: ${response.status}`);
  }

  const liveTheme = response.data.themes.find((theme) => theme.live);
  if (!liveTheme) {
    throw new Error('No live theme found');
  }

  console.log(`✓ Found live theme: ${liveTheme.name} (ID: ${liveTheme.id})`);
  return liveTheme.id;
}

// Create theme update job
async function createUpdateJob(themeId) {
  console.log('📤 Creating theme update job...');

  const response = await makeZendeskRequest('POST', '/api/v2/guide/theming/jobs/themes/updates', {
    job: {
      attributes: {
        theme_id: themeId,
        format: 'zip',
        replace_settings: false, // Preserve existing theme settings
      },
    },
  });

  if (response.status !== 202) {
    throw new Error(
      `Failed to create update job: ${response.status} - ${JSON.stringify(response.data)}`
    );
  }

  const job = response.data.job;
  console.log(`✓ Update job created: ${job.id}`);

  return {
    jobId: job.id,
    uploadUrl: job.data.upload.url,
    uploadParameters: job.data.upload.parameters,
  };
}

// Upload ZIP file to storage
function uploadThemeZip(uploadUrl, uploadParameters, zipPath) {
  return new Promise((resolve, reject) => {
    console.log('⬆️  Uploading theme ZIP to storage...');

    const form = new FormData();

    // Add all upload parameters
    Object.entries(uploadParameters).forEach(([key, value]) => {
      form.append(key, value);
    });

    // Add the file (must be last)
    form.append('file', fs.createReadStream(zipPath));

    const url = new URL(uploadUrl);
    const protocol = url.protocol === 'https:' ? https : http;

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: form.getHeaders(),
    };

    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✓ Theme ZIP uploaded successfully');
          resolve();
        } else {
          reject(new Error(`Upload failed: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    form.pipe(req);
  });
}

// Poll job status until complete
async function pollJobStatus(jobId) {
  console.log('⏳ Waiting for update job to complete...');

  for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
    const response = await makeZendeskRequest('GET', `/api/v2/guide/theming/jobs/${jobId}`);

    if (response.status !== 200) {
      throw new Error(`Failed to check job status: ${response.status}`);
    }

    const job = response.data.job;

    if (job.status === 'completed') {
      console.log('\n✓ Update job completed!');
      return;
    }

    if (job.status === 'failed') {
      throw new Error(`Update job failed: ${JSON.stringify(job.errors)}`);
    }

    // Still pending, wait and retry
    process.stdout.write('.');
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }

  throw new Error('Update job timed out');
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting Zendesk theme deployment...\n');

    validateEnv();

    // Step 1: Bump version
    bumpVersion();

    // Step 2: Get live theme ID
    const liveThemeId = await getLiveThemeId();

    // Step 3: Create theme ZIP
    const zipPath = createThemeZip();

    // Step 4: Create update job
    const { jobId, uploadUrl, uploadParameters } = await createUpdateJob(liveThemeId);

    // Step 5: Upload ZIP to storage
    await uploadThemeZip(uploadUrl, uploadParameters, zipPath);

    // Step 6: Poll until complete
    await pollJobStatus(jobId);

    // Step 7: Clean up ZIP file
    fs.unlinkSync(zipPath);

    console.log('\n✅ Live theme updated successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
