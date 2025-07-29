export default class {
  data() {
    return {
      pagination: {
        data: "collections.post",
        size: 1,
        alias: "post",
      },
      permalink: data => `/posts/${data.post.fileSlug}.json`,
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const { site, post } = data;
    if (!site.hasActivityPub) {
      return null;
    }

    const article = {
      "@context": "https://www.w3.org/ns/activitystreams",
      "type": "Article",
      "id": `https://${new URL(site.url).hostname}${post.url}`,
      "url": `https://${new URL(site.url).hostname}${post.url}`,
      "name": post.data.title,
      "content": post.templateContent,
      "published": post.date.toISOString(),
      "attributedTo": `https://${new URL(site.url).hostname}/actor.json`,
    };

    return JSON.stringify(article, null, 2);
  }
}
