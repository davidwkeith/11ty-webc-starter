import EleventyFetch from '@11ty/eleventy-fetch';
import site from './site.js';

export default async function() {
  if (!site.hasWebmentions) {
    return [];
  }

  const domain = new URL(site.url).hostname;
  const url = `https://webmention.io/api/mentions.json?target=${domain}`;

  try {
    const webmentions = await EleventyFetch(url, { type: "json" });
    return webmentions;
  } catch (error) {
    console.error('Failed to fetch webmentions', error);
    return [];
  }
}
