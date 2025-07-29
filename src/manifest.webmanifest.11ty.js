export default class {
  data() {
    return {
      permalink: '/manifest.webmanifest',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const { site } = data;
    if (!site.hasPWA) {
      return null;
    }

    const manifest = {
      name: site.title,
      short_name: site.pwa.short_name,
      description: site.description,
      start_url: '/',
      display: site.pwa.display,
      background_color: site.pwa.background_color,
      theme_color: site.pwa.theme_color,
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    };

    return JSON.stringify(manifest, null, 2);
  }
}
