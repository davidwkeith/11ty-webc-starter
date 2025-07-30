import markdownIt from 'markdown-it';

export default function (eleventyConfig) {
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
}
