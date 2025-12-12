#!/usr/bin/env node

/**
 * Monthly Sync Script
 *
 * 1. Syncs handlebars files from live Zendesk theme
 *    - See Disclaimer in README
 * 2. Generates updated sitemap from current articles.
 *    The script generates a properly structured XML sitemap that:
 *    - Groups articles by their original locale (canonical)
 *    - Lists all translations as alternates (not separate canonicals)
 *    - Follows proper hreflang and canonical URL conventions)
 * 3. Creates a single PR with both changes (if any exist)
 *
 * Usage:
 *   node bin/monthly-sync.js
 *
 * Environment variables required:
 *   ZENDESK_EMAIL - Your Zendesk admin email
 *   ZENDESK_API_TOKEN - Your Zendesk API token
 *   GITHUB_TOKEN - GitHub token for creating PRs
 */

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
        'User-Agent': 'uniswap-monthly-sync-script',
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

// ============= THEME SYNC FUNCTIONS =============

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

// ============= SITEMAP GENERATION FUNCTIONS =============

// Fetch all articles with pagination
async function fetchAllArticles() {
  let allArticles = [];
  let page = 1;
  let hasMore = true;

  console.log('📄 Fetching articles from Zendesk API...');

  while (hasMore) {
    try {
      const response = await makeZendeskRequest(
        'GET',
        `/api/v2/help_center/articles.json?page=${page}&per_page=100`
      );

      if (response.status === 200 && response.data.articles && response.data.articles.length > 0) {
        allArticles = allArticles.concat(response.data.articles);
        console.log(`  Fetched page ${page} - ${response.data.articles.length} articles`);
        page++;
        hasMore = response.data.next_page !== null;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching articles:`, error.message);
      hasMore = false;
    }
  }

  console.log(`✓ Total articles fetched: ${allArticles.length}`);
  return allArticles;
}

// Fetch all translations for a specific article
async function fetchArticleTranslations(articleId) {
  try {
    const response = await makeZendeskRequest(
      'GET',
      `/api/v2/help_center/articles/${articleId}/translations.json`
    );
    return response.data?.translations || [];
  } catch (error) {
    console.error(`Error fetching translations for article ${articleId}:`, error.message);
    return [];
  }
}

// Group articles by their source (original language) article
function groupArticlesBySource(articles) {
  const grouped = new Map();

  for (const article of articles) {
    // Use source_locale to identify the canonical version
    const sourceId = article.source_locale ? article.id : article.id;

    if (!grouped.has(sourceId)) {
      grouped.set(sourceId, {
        canonical: article,
        translations: [],
      });
    }
  }

  return grouped;
}

// Escape XML special characters
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate XML sitemap content
function generateSitemapXML(articlesMap, translations) {
  const now = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml +=
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"\n';
  xml += '        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Group translations by article ID
  const translationsByArticle = new Map();
  translations.forEach((trans) => {
    if (!translationsByArticle.has(trans.source_id)) {
      translationsByArticle.set(trans.source_id, []);
    }
    translationsByArticle.get(trans.source_id).push(trans);
  });

  // Add each article as a URL entry
  for (const [articleId, data] of articlesMap) {
    const article = data.canonical;

    // Skip draft articles or articles with [Draft] in the title
    if (article.draft || article.title.toLowerCase().includes('draft')) continue;

    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(article.html_url)}</loc>\n`;
    xml += `    <lastmod>${article.updated_at || now}</lastmod>\n`;

    // Add hreflang alternates for all translations
    const articleTranslations = translationsByArticle.get(article.id) || [];

    // Add canonical locale
    xml += `    <xhtml:link rel="alternate" hreflang="${article.locale}" href="${escapeXml(
      article.html_url
    )}" />\n`;

    // Add all translation locales
    for (const translation of articleTranslations) {
      if (
        translation.locale !== article.locale &&
        !translation.draft &&
        !translation.title.toLowerCase().includes('draft')
      ) {
        xml += `    <xhtml:link rel="alternate" hreflang="${translation.locale}" href="${escapeXml(
          translation.html_url
        )}" />\n`;
      }
    }

    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

async function generateSitemap(outputPath) {
  console.log('\n📊 Generating sitemap...');

  const articles = await fetchAllArticles();

  if (articles.length === 0) {
    console.error('No articles found. Please check your API credentials.');
    return false;
  }

  console.log('  Fetching translations for all articles...');
  const allTranslations = [];
  const totalArticles = articles.length;

  for (let i = 0; i < totalArticles; i++) {
    const article = articles[i];
    const translations = await fetchArticleTranslations(article.id);
    allTranslations.push(...translations);

    if ((i + 1) % 25 === 0 || i === totalArticles - 1) {
      const percentage = Math.round(((i + 1) / totalArticles) * 100);
      console.log(
        `    Progress: ${i + 1}/${totalArticles} articles (${percentage}%) - ${
          allTranslations.length
        } translations`
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(`✓ Total translations fetched: ${allTranslations.length}`);

  // Group articles by source
  const articlesMap = groupArticlesBySource(articles);

  // Generate sitemap XML
  const sitemapXML = generateSitemapXML(articlesMap, allTranslations);

  // Write to file
  fs.writeFileSync(outputPath, sitemapXML, 'utf8');
  console.log(`✓ Sitemap generated: ${outputPath}`);
  console.log(`  Total URLs: ${articlesMap.size}`);

  return true;
}

// ============= GIT & PR FUNCTIONS =============

// Check if there are git changes
function hasGitChanges() {
  try {
    const output = execSync('git status --porcelain templates/ assets/sitemap.xml', {
      encoding: 'utf-8',
    });
    return output.trim().length > 0;
  } catch (error) {
    console.error('Error checking git status:', error);
    return false;
  }
}

// Get list of changed files
function getChangedFiles() {
  try {
    const output = execSync('git status --porcelain templates/ assets/sitemap.xml', {
      encoding: 'utf-8',
    });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    return [];
  }
}

// Create branch and commit changes
function createBranchAndCommit() {
  const date = new Date().toISOString().split('T')[0];
  const branchName = `sync/monthly-theme-sitemap-${date}`;

  console.log(`\n🌿 Creating branch: ${branchName}`);

  try {
    // Create and checkout new branch
    execSync(`git checkout -b ${branchName}`, { encoding: 'utf-8' });

    // Add template files
    execSync('git add templates/ assets/sitemap.xml', { encoding: 'utf-8' });

    // Commit
    const commitMessage = `Monthly sync: handlebars and sitemap

Automated monthly sync from Zendesk theme editor and article updates.

This commit contains:
- Handlebars file changes from Zendesk UI
- Updated sitemap from current articles`;

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
    const date = new Date().toISOString().split('T')[0];

    const prBody = `## 🔄 Monthly Zendesk Theme & Sitemap Sync

This PR syncs handlebars files from the live Zendesk theme and updates the sitemap with current articles.

### Files Changed (${changedFiles.length})
${fileList}

### Sitemap
After merging and deploying this PR, you can find the sitemap URL in the website's HTML head:
\`\`\`html
<link rel="sitemap" type="application/xml" href="..." />
\`\`\`

### What to Review
- Ensure template changes are intentional (made by content editors)
- Check for any syntax errors or broken templates
- **Review the auto-generated sitemap** in \`assets/sitemap.xml\`
- Verify no sensitive information was added
- Confirm draft articles are properly excluded from sitemap

### Next Steps
1. Review the changes carefully
2. Merge this PR when ready
3. Deployment will happen automatically after merge`;

    const response = await makeGitHubRequest(
      'POST',
      `/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/pulls`,
      {
        title: `Monthly sync: Zendesk theme & sitemap (${date})`,
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

// ============= MAIN FUNCTION =============

async function main() {
  try {
    console.log('🚀 Starting monthly sync: theme + sitemap...\n');

    validateEnv();

    const projectRoot = path.join(__dirname, '..');

    // Step 1: Sync handlebars from Zendesk
    console.log('=== STEP 1: Sync Handlebars ===\n');
    // Get live theme ID
    const themeId = await getLiveThemeId();
    // Create export job
    const { jobId, downloadUrl } = await createExportJob(themeId);

    if (!downloadUrl) {
      throw new Error('Download URL not provided in export job response');
    }

    // Poll until complete
    await pollJobStatus(jobId);
    // Download theme ZIP
    const zipPath = path.join(projectRoot, 'theme-download.zip');
    await downloadFile(downloadUrl, zipPath);
    // Extract handlebars files
    extractHandlebarsFiles(zipPath, projectRoot);
    // Clean up ZIP file
    fs.unlinkSync(zipPath);

    // Step 2: Generate sitemap
    console.log('\n=== STEP 2: Generate Sitemap ===\n');
    const sitemapTempPath = path.join(projectRoot, 'sitemap.xml');
    const sitemapFinalPath = path.join(projectRoot, 'assets', 'sitemap.xml');

    await generateSitemap(sitemapTempPath);

    // Move sitemap to assets/
    if (fs.existsSync(sitemapTempPath)) {
      fs.renameSync(sitemapTempPath, sitemapFinalPath);
      console.log(`✓ Sitemap moved to assets/`);
    }

    // Step 3: Check for changes
    console.log('\n=== STEP 3: Check for Changes ===\n');

    if (!hasGitChanges()) {
      console.log('✅ No changes detected. Everything is up to date!\n');
      process.exit(0);
    }

    console.log('⚠️  Changes detected!');

    const changedFiles = getChangedFiles();
    console.log(`   Changed files: ${changedFiles.length}`);
    changedFiles.forEach((file) => console.log(`   ${file}`));

    // Step 4: Create PR
    console.log('\n=== STEP 4: Create Pull Request ===\n');
    // Create branch and commit
    const branchName = createBranchAndCommit();
    // Create PR
    const prUrl = await createPullRequest(branchName, changedFiles);

    console.log('\n✅ Monthly sync complete!');
    console.log(`   Review PR: ${prUrl}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
