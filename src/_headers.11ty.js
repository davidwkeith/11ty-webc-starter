/**
 * Represents the Headers configuration for Cloudflare Pages.
 *
 * @see https://developers.cloudflare.com/pages/configuration/headers/
 */
export default class Headers {

  /**
   * Defines the headers to be output to the `_headers` file.
   * Each object in the array can represent either a redirect or a set of HTTP response headers.
   * 
   * For HTTP response headers:
   * @property {string} source - The URL path to apply the headers to (e.g., "/*").
   * @property {object} headers - An object where keys are header names and values are header values.
   *
   * @type {Array<Object>}
   */
  headers = [
    // Global security headers example
    { source: "/*",
      headers: {
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer-when-downgrade",
        "Content-Security-Policy": "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; frame-ancestors 'self'; form-action 'self';",
        // In development, the 'Content-Security-Policy-Report-Only' header is used to monitor violations
        // without blocking content. Before deploying to production, analyze the violation reports and
        // adjust the main 'Content-Security-Policy' header as needed.
        // For production, the 'Content-Security-Policy-Report-Only' header should be removed.
        "Content-Security-Policy-Report-Only": "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; frame-ancestors 'self'; form-action 'self';"
      }
    }
  ]


  /**
   * Eleventy data method to define permalink and exclude from collections.
   * @returns {object}
   */
  data() {
    return {
      permalink: "/_headers",
      eleventyExcludeFromCollections: true,
    }
  }

  /**
   * Renders the headers configuration into a string format for the `_headers` file.
   * @param {object} data - Eleventy's data cascade.
   * @returns {Promise<string>} The formatted headers string.
   */
  async render(data) {
    let output = [];

    this.headers.forEach(headerConfig => {
      if (headerConfig.headers) {
        // This is a set of HTTP response headers
        output.push(headerConfig.source);
        for (const [key, value] of Object.entries(headerConfig.headers)) {
          output.push(`  ${key}: ${value}`);
        }
      }
    });

    return output.join("\n");
  }
}