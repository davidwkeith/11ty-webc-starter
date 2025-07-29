import EleventyFetch from '@11ty/eleventy-fetch';
import site from './site.js';

/**
 * Fetches webmentions from webmention.io for the domain specified in the site configuration.
 * This data is made available in the Eleventy data cascade as `webmentions`.
 *
 * @returns {Promise<object[]>} A promise that resolves to an array of webmention objects, or an empty array if the feature is disabled or the fetch fails.
 */
export default async function () {
  if (!site.hasWebmentions) {
    return [];
  }

  const domain = new URL(site.url).hostname;
  const url = `https://webmention.io/api/mentions.json?target=${domain}`;

  try {
    const webmentions = await EleventyFetch(url, { type: 'json' });
    return webmentions;
  } catch (error) {
    console.error('Failed to fetch webmentions', error);
    return [];
  }
}
