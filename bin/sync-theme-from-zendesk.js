/* eslint-env node */
require('dotenv').config();

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const AdmZip = require('adm-zip');

// Configuration
const ZENDESK_SUBDOMAIN = 'uniswaplabs';
const ZENDESK_EMAIL = process.env.ZENDESK_EMAIL;
const ZENDESK_API_TOKEN = process.env.ZENDESK_API_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO_OWNER = 'Uniswap';
const GITHUB_REPO_NAME = 'uniswap-support-redesigned';

const POLL_INTERVAL = 5000; // 5 seconds
const MAX_POLL_ATTEMPTS = 60; // 5 minutes max

// Validate required environment variables
function validateEnv() {
  const required = ['ZENDESK_EMAIL', 'ZENDESK_API_TOKEN', 'GITHUB_TOKEN'];
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
          resolve({ status: res.statusCode, data: JSON.parse(data) });
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

// Make authenticated API request to GitHub
function makeGitHubRequest(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: method,
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'uniswap-support-sync-script',
        Accept: 'application/vnd.github+json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
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

// Get the live theme ID
async function getLiveThemeId() {
  console.log('📋 Fetching list of themes...');
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

// Create theme export job
async function createExportJob(themeId) {
  console.log('📦 Creating theme export job...');
  const response = await makeZendeskRequest('POST', '/api/v2/guide/theming/jobs/themes/exports', {
    job: {
      attributes: {
        theme_id: themeId,
        format: 'zip',
      },
    },
  });

  if (response.status !== 202) {
    throw new Error(`Failed to create export job: ${response.status}`);
  }

  const job = response.data.job;
  console.log(`✓ Export job created: ${job.id}`);

  return {
    jobId: job.id,
    downloadUrl: job.data?.download?.url,
  };
}

// Poll job status until complete
async function pollJobStatus(jobId) {
  console.log('⏳ Waiting for export job to complete...');

  for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
    const response = await makeZendeskRequest('GET', `/api/v2/guide/theming/jobs/${jobId}`);

    if (response.status !== 200) {
      throw new Error(`Failed to check job status: ${response.status}`);
    }

    const job = response.data.job;

    if (job.status === 'completed') {
      console.log('✓ Export job completed!');
      return;
    }

    if (job.status === 'failed') {
      throw new Error(`Export job failed: ${job.errors}`);
    }

    // Still pending, wait and retry
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }

  throw new Error('Export job timed out');
}

// Download file from URL
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    console.log('⬇️  Downloading theme ZIP...');

    const protocol = url.startsWith('https') ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          // Handle redirect
          downloadFile(response.headers.location, outputPath).then(resolve).catch(reject);
          return;
        }

        const fileStream = fs.createWriteStream(outputPath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log('✓ Theme downloaded');
          resolve();
        });
      })
      .on('error', reject);
  });
}

// Extract handlebars files from ZIP
function extractHandlebarsFiles(zipPath, projectRoot) {
  console.log('📂 Extracting handlebars files...');

  const zip = new AdmZip(zipPath);
  const zipEntries = zip.getEntries();

  let extractedCount = 0;

  zipEntries.forEach((entry) => {
    if (entry.entryName.startsWith('templates/') && entry.entryName.endsWith('.hbs')) {
      // Extract to templates/ directory (assumes it exists)
      const outputPath = path.join(projectRoot, entry.entryName);
      fs.writeFileSync(outputPath, entry.getData());
      extractedCount++;
    }
  });

  console.log(`✓ Extracted ${extractedCount} handlebars files`);
  return extractedCount;
}

// Check if there are git changes
function hasGitChanges() {
  try {
    const output = execSync('git status --porcelain templates/', { encoding: 'utf-8' });
    return output.trim().length > 0;
  } catch (error) {
    console.error('Error checking git status:', error);
    return false;
  }
}

// Get list of changed files
function getChangedFiles() {
  try {
    const output = execSync('git status --porcelain templates/', { encoding: 'utf-8' });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    return [];
  }
}

// Create branch and commit changes
function createBranchAndCommit() {
  const date = new Date().toISOString().split('T')[0];
  const branchName = `sync/zendesk-theme-${date}`;

  console.log(`🌿 Creating branch: ${branchName}`);

  try {
    // Create and checkout new branch
    execSync(`git checkout -b ${branchName}`, { encoding: 'utf-8' });

    // Add template files
    execSync('git add templates/', { encoding: 'utf-8' });

    // Commit
    const commitMessage = `Sync handlebars files from live Zendesk theme

Automated sync from Zendesk theme editor.

This commit contains changes made by content editors in the Zendesk UI.`;

    execSync(`git commit -m "${commitMessage}"`, { encoding: 'utf-8' });

    console.log('✓ Changes committed');
    return branchName;
  } catch (error) {
    console.error('Error creating branch/commit:', error.message);
    throw error;
  }
}

// Push branch and create PR
async function createPullRequest(branchName, changedFiles) {
  console.log('📤 Pushing branch and creating PR...');

  try {
    // Push branch
    execSync(`git push -u origin ${branchName}`, { encoding: 'utf-8' });

    // Create PR using GitHub API
    const fileList = changedFiles.map((f) => `- ${f}`).join('\n');

    const prBody = `## 🔄 Zendesk Theme Sync

This PR syncs handlebars files from the live Zendesk theme.

### Files Changed (${changedFiles.length})
${fileList}

### What to Review
- Ensure changes are intentional (made by content editors)
- Check for any syntax errors or broken templates
- Verify no sensitive information was added

### Next Steps
1. Review the changes
2. Merge this PR
3. Proceed with deployment`;

    const response = await makeGitHubRequest(
      'POST',
      `/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/pulls`,
      {
        title: `Sync Zendesk theme handlebars (${new Date().toISOString().split('T')[0]})`,
        body: prBody,
        head: branchName,
        base: 'master',
      }
    );

    if (response.status !== 201) {
      throw new Error(`Failed to create PR: ${response.status} - ${JSON.stringify(response.data)}`);
    }

    const prUrl = response.data.html_url;
    console.log(`✓ PR created: ${prUrl}`);
    return prUrl;
  } catch (error) {
    console.error('Error creating PR:', error.message);
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting Zendesk theme sync check...\n');

    validateEnv();

    // Step 1: Get live theme ID
    const themeId = await getLiveThemeId();

    // Step 2: Create export job
    const { jobId, downloadUrl } = await createExportJob(themeId);

    if (!downloadUrl) {
      throw new Error('Download URL not provided in export job response');
    }

    // Step 3: Poll until complete
    await pollJobStatus(jobId);

    // Step 4: Download theme ZIP
    const zipPath = path.join(__dirname, '..', 'theme-download.zip');
    await downloadFile(downloadUrl, zipPath);

    // Step 5: Extract handlebars files
    const projectRoot = path.join(__dirname, '..');
    extractHandlebarsFiles(zipPath, projectRoot);

    // Clean up ZIP file
    fs.unlinkSync(zipPath);

    // Step 6: Check for changes
    if (!hasGitChanges()) {
      console.log('\n✅ No handlebars changes detected. Safe to deploy!');
      process.exit(0);
    }

    console.log('\n⚠️  Handlebars changes detected!');

    const changedFiles = getChangedFiles();
    console.log(`   Changed files: ${changedFiles.length}`);
    changedFiles.forEach((file) => console.log(`   ${file}`));

    // Step 7: Create branch and commit
    const branchName = createBranchAndCommit();

    // Step 8: Create PR
    const prUrl = await createPullRequest(branchName, changedFiles);

    console.log('\n🛑 Deployment blocked until PR is merged.');
    console.log(`   Review PR: ${prUrl}\n`);

    process.exit(1); // Exit with error to block deployment
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
