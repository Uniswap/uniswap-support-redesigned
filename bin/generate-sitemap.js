#!/usr/bin/env node

/**
 * Custom Sitemap Generator for Zendesk Guide
 *
 * This script generates a properly structured XML sitemap that:
 * - Groups articles by their original locale (canonical)
 * - Lists all translations as alternates (not separate canonicals)
 * - Follows proper hreflang and canonical URL conventions
 *
 * Usage:
 *   node bin/generate-sitemap.js
 *
 * Environment variables required:
 *   ZENDESK_EMAIL - Your Zendesk admin email
 *   ZENDESK_API_TOKEN - Your Zendesk API token
 */

/* eslint-env node */
require('dotenv').config();

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const ZENDESK_SUBDOMAIN = 'uniswaplabs';
const ZENDESK_EMAIL = process.env.ZENDESK_EMAIL;
const ZENDESK_API_TOKEN = process.env.ZENDESK_API_TOKEN;
const OUTPUT_FILE = path.join(__dirname, '../sitemap.xml');

/**
 * Make authenticated request to Zendesk API
 */
function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${ZENDESK_EMAIL}/token:${ZENDESK_API_TOKEN}`).toString('base64');

    const options = {
      hostname: `${ZENDESK_SUBDOMAIN}.zendesk.com`,
      path: endpoint,
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    };

    https
      .get(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

/**
 * Fetch all articles with pagination
 */
async function fetchAllArticles() {
  let allArticles = [];
  let page = 1;
  let hasMore = true;

  console.log('Fetching articles from Zendesk API...');

  while (hasMore) {
    try {
      const response = await makeRequest(
        `/api/v2/help_center/articles.json?page=${page}&per_page=100`
      );

      if (response.articles && response.articles.length > 0) {
        allArticles = allArticles.concat(response.articles);
        console.log(`Fetched page ${page} - ${response.articles.length} articles`);
        page++;
        hasMore = response.next_page !== null;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching articles:`, error.message);
      hasMore = false;
    }
  }

  console.log(`Total articles fetched: ${allArticles.length}`);
  return allArticles;
}

/**
 * Fetch all translations for a specific article
 */
async function fetchArticleTranslations(articleId) {
  try {
    const response = await makeRequest(
      `/api/v2/help_center/articles/${articleId}/translations.json`
    );
    return response.translations || [];
  } catch (error) {
    console.error(`Error fetching translations for article ${articleId}:`, error.message);
    return [];
  }
}

/**
 * Group articles by their source (original) article
 */
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

/**
 * Generate XML sitemap content
 */
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

/**
 * Escape XML special characters
 */
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Main execution
 */
async function main() {
  try {
    // Validate environment variables
    if (!ZENDESK_EMAIL || !ZENDESK_API_TOKEN) {
      console.error(
        'Error: ZENDESK_EMAIL and ZENDESK_API_TOKEN environment variables are required'
      );
      process.exit(1);
    }

    console.log('Starting custom sitemap generation...\n');

    // Fetch all articles
    const articles = await fetchAllArticles();

    if (articles.length === 0) {
      console.error('No articles found. Please check your API credentials.');
      process.exit(1);
    }

    // Fetch all translations for each article
    console.log('\nFetching translations for all articles...');
    const allTranslations = [];
    const totalArticles = articles.length;

    for (let i = 0; i < totalArticles; i++) {
      const article = articles[i];
      const translations = await fetchArticleTranslations(article.id);
      allTranslations.push(...translations);

      // Show progress every 25 articles or on the last one
      if ((i + 1) % 25 === 0 || i === totalArticles - 1) {
        const percentage = Math.round(((i + 1) / totalArticles) * 100);
        console.log(
          `  Progress: ${i + 1}/${totalArticles} articles (${percentage}%) - ${
            allTranslations.length
          } translations so far`
        );
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(`\n✓ Total translations fetched: ${allTranslations.length}\n`);

    // Group articles by source
    const articlesMap = groupArticlesBySource(articles);

    // Generate sitemap XML
    const sitemapXML = generateSitemapXML(articlesMap, allTranslations);

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, sitemapXML, 'utf8');

    console.log(`\n✓ Sitemap successfully generated!`);
    console.log(`  Location: ${OUTPUT_FILE}`);
    console.log(`  Total URLs: ${articlesMap.size}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
main();
