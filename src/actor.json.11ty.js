/**
 * Generates the ActivityPub Actor object for the site.
 * This file is responsible for creating the `actor.json` endpoint,
 * which represents your site as an ActivityPub `Application` actor.
 *
 * @see https://www.w3.org/TR/activitypub/#actor-objects
 */
export default class {
  /**
   * Defines the Eleventy data for the Actor object.
   *
   * @returns {object} The Eleventy data object.
   * @property {string} permalink - The output path for the Actor object.
   * @property {boolean} eleventyExcludeFromCollections - Excludes this file from Eleventy collections.
   */
  data() {
    return {
      permalink: '/actor.json',
      eleventyExcludeFromCollections: true,
    };
  }

  /**
   * Renders the ActivityPub Actor object content.
   *
   * @param {object} data - The Eleventy data cascade.
   * @returns {string|null} A JSON string representing the Actor object, or `null` if ActivityPub is disabled.
   */
  render(data) {
    const { site } = data;
    if (!site.hasActivityPub) {
      return null;
    }

    const actor = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'Application',
      name: site.author,
      preferredUsername: site.fediverseCreator.split('@')[1],
      inbox: `https://${new URL(site.url).hostname}/.well-known/webfinger`,
      outbox: `https://${new URL(site.url).hostname}/outbox.json`,
      url: `https://${new URL(site.url).hostname}/actor.json`,
      publicKey: {
        id: `https://${new URL(site.url).hostname}/actor.json#main-key`,
        owner: `https://${new URL(site.url).hostname}/actor.json`,
        publicKeyPem: '', // You would generate and add a real public key here
      },
    };

    return JSON.stringify(actor, null, 2);
  }
}
