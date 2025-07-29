export default class {
  data() {
    return {
      permalink: "/.well-known/webfinger",
      eleventyExcludeFromCollections: true,
    };
  }

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
