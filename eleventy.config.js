import dotenv from 'dotenv';
import eleventyWebcPlugin from '@11ty/eleventy-plugin-webc';
import { eleventyImagePlugin } from '@11ty/eleventy-img';
import Image from '@11ty/eleventy-img';

import htmlmin from 'html-minifier-terser';
import markdownIt from 'markdown-it';
import { lint } from 'jsonld-lint';

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

  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: ['src/_includes/**/*.webc', 'npm:@11ty/eleventy-img/*.webc'],
  });

  /**
   * Configure the Eleventy Image plugin to process images in web components.
   */
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    formats: ['webp', 'jpeg'],
    outputDir: './_site/img/',
    urlPath: '/img/',
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
    },
  });

  /**
   * Generates an optimized Open Graph image URL using Eleventy Image.
   * @param {string} src - The path to the source image (relative to the input directory).
   * @returns {Promise<string>} The URL of the optimized JPEG image.
   */
  eleventyConfig.addShortcode('ogImage', async (src) => {
    if (!src) {
      return ''; // Or handle error/default more robustly
    }
    let metadata = await Image(`./${src}`, {
      widths: [1200],
      formats: ['jpeg'],
      outputDir: './_site/img/og/',
      urlPath: '/img/og/',
      filenameFormat: function (id, src, width, format) {
        return `${id}-${width}.${format}`;
      },
    });
    return metadata.jpeg[0].url;
  });

  /**
   * Converts a date object to an HTML-friendly date string (YYYY-MM-DD).
   * @param {Date} dateObj - The date object to format.
   * @returns {string} The formatted date string.
   */
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return dateObj.toISOString().slice(0, 10);
  });

  /**
   * Converts a date object to a human-readable date string.
   * @param {Date} dateObj - The date object to format.
   * @returns {string} The formatted date string.
   */
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  /**
   * Generates a responsive <picture> element with optimized images.
   * @param {string} src - The path to the source image (relative to the input directory).
   * @param {string} alt - The alt text for the image.
   * @param {string} [classes] - Optional CSS classes to apply to the <img> tag.
   * @returns {Promise<string>} The HTML string for the <picture> element.
   */
  eleventyConfig.addShortcode('image', async (src, alt, classes) => {
    if (!src) {
      throw new Error("Image shortcode requires a 'src' attribute.");
    }
    if (!alt) {
      console.warn(`Image "${src}" is missing alt text.`);
    }

    let metadata = await Image(src, {
      widths: [400, 800, 1200, 1600],
      formats: ['webp', 'jpeg'],
      outputDir: './_site/img/',
      urlPath: '/img/',
      defaultAttributes: {
        loading: 'lazy',
        decoding: 'async',
      },
    });

    let imageAttributes = {
      alt,
      sizes: '(min-width: 1024px) 100vw, 50vw', // Example sizes, can be customized
      loading: 'lazy',
      decoding: 'async',
    };

    if (classes) {
      imageAttributes.class = classes;
    }

    return Image.generateHTML(metadata, imageAttributes);
  });

  /**
   * Get schema.org JSON-LD data, validates against the schema.org
   * context and returns it as a JSON string.
   * @param {object} schema - The schema object to validate and stringify.
   * @returns {Promise<string>} The JSON-LD string.
   * @throws {string} Throws an error if the schema is invalid.
   */
  eleventyConfig.addJavaScriptFunction('getSchema', async (schema) => {
    const JSONSchema = JSON.stringify(schema);
    const lintErrors = await lint(JSONSchema);
    if (lintErrors.length > 0) {
      console.error('Schema.org JSON-LD validation errors:');
      lintErrors.forEach((error) => {
        console.error(
          `  - ${error.path}: ${error.message} (Line: ${error.line}, Column: ${error.column})`
        );
      });
      throw new Error(
        'Invalid Schema.org JSON-LD detected. See console for details.'
      );
    }
    return JSONSchema;
  });

  /**
   * Minify the HTML output using html-minifier-terser.
   * This transform is applied to all HTML files.
   * @param {string} content - The HTML content to minify.
   * @returns {string} The minified HTML content.
   */
  eleventyConfig.addTransform('htmlmin', function (content) {
    if ((this.page.outputPath || '').endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    // If not an HTML output, return content as-is
    return content;
  });

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    }).use(function (md) {
      // Override the default image renderer to use our `image` shortcode
      md.renderer.rules.image = (tokens, idx, _options, _env, _self) => {
        const token = tokens[idx];
        const src = token.attrGet('src');
        const alt = token.attrGet('alt');
        const classes = token.attrGet('class');

        // Get the image shortcode function
        const imageShortcode = eleventyConfig.getFilter('image');

        // Call the image shortcode and return its output
        // Note: This is an async function, but markdown-it expects sync output.
        // Eleventy handles async shortcodes in markdown, so this should be fine.
        return imageShortcode(src, alt, classes);
      };
    })
  );

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
