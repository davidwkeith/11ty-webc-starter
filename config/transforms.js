import htmlmin from 'html-minifier-terser';
import postcss from 'postcss';
import postcssLoadConfig from 'postcss-load-config';

export default function (eleventyConfig) {
  eleventyConfig.addTransform('postcss', async function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith('.css')) {
      const { plugins, options } = await postcssLoadConfig();
      return await postcss(plugins).process(content, options);
    }
    return content;
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
}
