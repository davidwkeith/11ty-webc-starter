import dotenv from 'dotenv';

import addPlugins from './config/plugins.js';
import addTransforms from './config/transforms.js';
import addFilters from './config/filters.js';
import addShortcodes from './config/shortcodes.js';
import setLibraries from './config/libraries.js';

/**
 * Load environment variables from .env file.
 */
dotenv.config();

/**
 * Eleventy configuration function.
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @returns {object}
 */
export default function (eleventyConfig) {
  // FIXME: Workaround for a known issue in eleventy-plugin-webc (https://github.com/11ty/eleventy-plugin-webc/issues/86).
  // When using `permalink` in front matter, especially with dynamic values or for non-HTML files,
  // `page.url` may not be correctly populated or available to other plugins/filters.
  // To avoid build errors and ensure consistent URL generation, explicitly duplicate the `permalink`
  // value in `page.url` within the front matter for affected templates.
  //
  // Example:
  // ```
  // permalink: /my-page/index.html
  // page:
  //    url: /my-page/
  // ```
  // This ensures that `page.url` is always available and correctly reflects the intended output URL.
  eleventyConfig.setFreezeReservedData(false);

  eleventyConfig.addBundle('css');
  eleventyConfig.addBundle('js');

  // Pass through static assets
  eleventyConfig.addPassthroughCopy('img/favicon.svg');

  addPlugins(eleventyConfig);
  addTransforms(eleventyConfig);
  addFilters(eleventyConfig);
  addShortcodes(eleventyConfig);
  setLibraries(eleventyConfig);

  return {
    templateFormats: ['11ty.js', 'webc', 'md', 'html'],
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
    },
    markdownTemplateEngine: 'webc',
    htmlTemplateEngine: 'webc',
  };
}
