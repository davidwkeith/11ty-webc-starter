import eleventyWebcPlugin from '@11ty/eleventy-plugin-webc';
import { eleventyImagePlugin } from '@11ty/eleventy-img';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: ['src/_includes/**/*.webc', 'npm:@11ty/eleventy-img/*.webc'],
  });

  /**
   * Configure the Eleventy Image plugin to process images in web components.
   */
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    formats: ['webp', 'jpeg', 'png'],
    outputDir: './_site/img/',
    urlPath: '/img/',
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
    },
  });
}
