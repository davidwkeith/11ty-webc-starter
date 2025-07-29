/**
 * Generates the WebFinger response for the site.
 * This file is responsible for creating the `/.well-known/webfinger` endpoint,
 * which allows ActivityPub clients to discover your site's actor.
 * 
 * @see https://www.rfc-editor.org/rfc/rfc7033
 */
export default class {
  /**
   * Defines the Eleventy data for the WebFinger response.
   * 
   * @returns {object} The Eleventy data object.
   * @property {string} permalink - The output path for the WebFinger response.
   * @property {boolean} eleventyExcludeFromCollections - Excludes this file from Eleventy collections.
   */
  data() {
    return {
      permalink: "/.well-known/webfinger",
      eleventyExcludeFromCollections: true,
    };
  }

  /**
   * Renders the WebFinger response content.
   * 
   * @param {object} data - The Eleventy data cascade.
   * @returns {string|null} A JSON string representing the WebFinger response, or `null` if ActivityPub is disabled.
   */
  render(data) {
    const { site } = data;
    if (!site.hasActivityPub) {
      return null;
    }

    const resource = `acct:${site.author.handle}@${new URL(site.url).hostname}`;

    const webfinger = {
      "subject": resource,
      "links": [
        {
          "rel": "self",
          "type": "application/activity+json",
          "href": `https://${new URL(site.url).hostname}/actor.json`,
        },
      ],
    };

    return JSON.stringify(webfinger, null, 2);
  }
}
