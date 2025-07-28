import dotenv from "dotenv"
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";
import Image from "@11ty/eleventy-img";
import faviconsPlugin from "eleventy-plugin-gen-favicons";
import htmlmin from "html-minifier-terser";
import { lint } from "jsonld-lint";

/**
 * Load environment variables from .env file.
 */
dotenv.config()

/**
 * Eleventy configuration function.
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @returns {object}
 */
export default function (eleventyConfig) {

  // FIXME: Workaround for https://github.com/11ty/eleventy-plugin-webc/issues/86
  // In the front matter of a file with a permalink like `/404.html`, simply
  // duplicate the permalink value in `page.url` to avoid build errors.
  // ```
  // permalink: /404.html
  // page:
  //    url: /404.html
  // ```
  eleventyConfig.setFreezeReservedData(false);

  eleventyConfig.addBundle("css");
  eleventyConfig.addBundle("js");

  eleventyConfig.addPlugin(faviconsPlugin, {});
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      "src/_includes/**/*.webc",
      "npm:@11ty/eleventy-img/*.webc",
    ]
  });

  /**
   * Configure the Eleventy Image plugin to process images in web components.
   */
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    }
  });

  /**
   * Generates an optimized Open Graph image URL using Eleventy Image.
   * @param {string} src - The path to the source image (relative to the input directory).
   * @returns {Promise<string>} The URL of the optimized JPEG image.
   */
  eleventyConfig.addShortcode("ogImage", async (src) => {
    if (!src) {
      return ""; // Or handle error/default more robustly
    }
    let metadata = await Image(src, {
      widths: [1200],
      formats: ["jpeg"],
      outputDir: "./_site/img/og/",
      urlPath: "/img/og/",
      filenameFormat: function (id, src, width, format, options) {
        const originalExtension = src.split('.').pop();
        return `${id}-${width}.${format}`;
      }
    });
    return metadata.jpeg[0].url;
  });

  /**
   * Get schema.org JSON-LD data, validates against the schema.org
   * context and returns it as a JSON string.
   * @param {object} schema - The schema object to validate and stringify.
   * @returns {Promise<string>} The JSON-LD string.
   * @throws {string} Throws an error if the schema is invalid.
   */
  eleventyConfig.addJavaScriptFunction("getSchema", async (schema) => {
    const JSONSchema = JSON.stringify(schema)
    const lintErrors = await lint(JSONSchema);
    if (lintErrors.length > 0) {
      console.error("Schema.org JSON-LD validation errors:");
      lintErrors.forEach(error => {
        console.error(`  - ${error.path}: ${error.message} (Line: ${error.line}, Column: ${error.column})`);
      });
      throw new Error("Invalid Schema.org JSON-LD detected. See console for details.");
    }
    return JSONSchema;
  });

  /**
   * Minify the HTML output using html-minifier-terser.
   * This transform is applied to all HTML files.
   * @param {string} content - The HTML content to minify.
   * @returns {string} The minified HTML content.
   */
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
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


  // Set input and output directories
  return {
    templateFormats: [ "11ty.js", "webc", "md", "html" ],
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "webc",
    htmlTemplateEngine: "webc",
  };
}