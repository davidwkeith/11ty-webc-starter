export default class {
  data() {
    return {
      permalink: "/actor.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const { site } = data;
    if (!site.hasActivityPub) {
      return null;
    }

    const actor = {
      "@context": "https://www.w3.org/ns/activitystreams",
      "type": "Application",
      "name": site.author.name,
      "preferredUsername": site.author.handle,
      "inbox": `https://${new URL(site.url).hostname}/.well-known/webfinger`,
      "outbox": `https://${new URL(site.url).hostname}/outbox.json`,
      "url": `https://${new URL(site.url).hostname}/actor.json`,
      "publicKey": {
        "id": `https://${new URL(site.url).hostname}/actor.json#main-key`,
        "owner": `https://${new URL(site.url).hostname}/actor.json`,
        "publicKeyPem": "", // You would generate and add a real public key here
      },
    };

    return JSON.stringify(actor, null, 2);
  }
}
