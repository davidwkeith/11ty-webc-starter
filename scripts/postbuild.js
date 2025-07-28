import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import * as cheerio from 'cheerio';

const buildDir = './_site';

/**
 * Generates a SHA-384 hash for the given file content.
 * @param {string} filePath - The absolute path to the file.
 * @returns {Promise<string>} The SHA-384 hash prefixed with 'sha384-'.
 */
async function generateSriHash(filePath) {
  const fileContent = await fs.readFile(filePath);
  const hash = crypto.createHash('sha384').update(fileContent).digest('base64');
  return `sha384-${hash}`;
}

/**
 * Processes a single HTML file to add SRI attributes to its assets.
 * @param {string} filePath - The absolute path to the HTML file.
 */
async function processHtmlFile(filePath) {
  const htmlContent = await fs.readFile(filePath, 'utf8');
  const $ = cheerio.load(htmlContent);

  /**
   * Processes a single asset element (link or script) to add SRI attributes.
   * @param {number} index - The index of the element in the selection.
   * @param {cheerio.Element} element - The Cheerio element object.
   */
  const processAsset = async (index, element) => {
    const srcAttr = $(element).attr('src') || $(element).attr('href');
    if (srcAttr && !srcAttr.startsWith('http') && !srcAttr.startsWith('//')) {
      // Only process local assets
      const assetPath = path.join(buildDir, srcAttr);
      try {
        const integrity = await generateSriHash(assetPath);
        $(element).attr('integrity', integrity);
        $(element).attr('crossorigin', 'anonymous');
      } catch (e) {
        console.warn(`SRI: Could not process ${assetPath}: ${e.message}`);
      }
    }
  };

  const promises = [];
  $('link[rel="stylesheet"]').each((i, el) => promises.push(processAsset(i, el)));
  $('script').each((i, el) => promises.push(processAsset(i, el)));

  await Promise.all(promises);

  await fs.writeFile(filePath, $.html());
}

async function main() {
  try {
    const files = await fs.readdir(buildDir, { recursive: true });
    const htmlFiles = files.filter(file => file.endsWith('.html')).map(file => path.join(buildDir, file));

    for (const htmlFile of htmlFiles) {
      await processHtmlFile(htmlFile);
    }
    console.log('SRI: Successfully added integrity attributes to HTML files.');
  } catch (e) {
    console.error('SRI: Error during postbuild process:', e);
    process.exit(1);
  }
}

main();
