import childProcess from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkg = require('../../package.json');

/**
 * These are all the site-level variables. Often used as fallback for page-level data.
 *
 * Some of these values are sourced from `package.json`.
 * @see package.json
 */
export default {
  /**
   * If present this will be used to generate the `<meta property="fediverse:creator">` tag.
   *
   * @see https://blog.joinmastodon.org/2024/07/highlighting-journalism-on-mastodon/
   * @optional
   * @property {string} fediverseCreator: the handle of the creator on the Fediverse.
   */
  fediverseCreator: '@dwk@xn--4t8h.dwk.io',

  /**
   * This is used to generate the favicons for the site.
   *
   * @see https://github.com/NJAldwin/eleventy-plugin-gen-favicons
   * @property {object} favicon - Favicon options.
   * @property {string} favicon.src - Path to the source image.
   * @property {string} favicon.appleIconBgColor - Background color for the Apple touch icon.
   * @property {number} favicon.appleIconPadding - Padding for the Apple touch icon.
   */
  favicon: {
    src: 'img/favicon.svg',
    appleIconBgColor: '#FFFFFF',
    appleIconPadding: 20,
  },

  /**
   * Controls whether the main navigation is rendered on the site.
   * Set to `false` for single-page sites or if navigation is handled differently.
   *
   * @property {boolean} hasNavigation - Whether to render the main navigation.
   * @default false
   */
  hasNavigation: false,

  /**
   * Controls whether webmentions are enabled on the site.
   * Set to `false` to disable webmention fetching and display.
   *
   * @property {boolean} hasWebmentions - Whether to enable webmentions.
   * @default false
   */
  hasWebmentions: false,

  /**
   * Controls whether ActivityPub support is enabled on the site.
   * Set to `false` to disable generating ActivityPub representations.
   *
   * @property {boolean} hasActivityPub - Whether to enable ActivityPub.
   * @default true
   */
  hasActivityPub: true,

  /**
   * Controls whether Progressive Web App (PWA) features are enabled.
   * Set to `false` to disable PWA manifest and service worker registration.
   *
   * @property {boolean} hasPWA - Whether to enable PWA features.
   * @default true
   */
  hasPWA: true,

  /**
   * Controls whether Open Graph meta tags are enabled.
   * Set to `false` to disable Open Graph generation.
   *
   * @property {boolean} hasOpenGraph - Whether to enable Open Graph meta tags.
   * @default true
   */
  hasOpenGraph: true,

  /**
   * PWA specific settings for the web app manifest.
   *
   * @property {object} pwa
   * @property {string} pwa.short_name - Short name for the PWA.
   * @property {string} pwa.background_color - Background color for the PWA splash screen.
   * @property {string} pwa.theme_color - Theme color for the PWA.
   * @property {string} pwa.display - Display mode for the PWA (e.g., "standalone").
   */
  pwa: {
    short_name: 'Starter',
    background_color: '#ffffff',
    theme_color: '#000000',
    display: 'standalone',
  },

  /**
   * Support for switching between dark and light mode in CSS.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme
   * @property {object} colorScheme - an object that defines the site's prefered color scheme
   * @property {string} colorScheme.content - the value of the content attribute
   * @property {string} [colorScheme.media] - the value of the media attribute
   */
  colorScheme: {
    content: 'light',
    // media: "(prefers-color-scheme: dark)",
  },

  /**
   * Controls whether Twitter Card meta tags are enabled.
   * Set to `false` to disable Twitter Card generation.
   * Consider using Fediverse or Bluesky alternatives for social sharing.
   *
   * @property {boolean} hasTwitter - Whether to enable Twitter Card meta tags.
   * @default false
   */
  hasTwitter: false,

  /**
   * The Twitter username for the site, used in the `twitter:site` and `twitter:creator` meta tags.
   * Include the `@` symbol (e.g., "@your_twitter_handle").
   *
   * @optional
   * @property {string} twitterUsername - The Twitter username for the site.
   */
  // twitterUsername: "@your_twitter_handle",

  /**
   * The content rating of the site, used in the `<meta name="rating">` tag.
   * If omitted the rating tag won't be output and is equivelent to "general"
   *
   * @see https://developers.google.com/search/docs/specialty/explicit/guidelines?udm=14#mark-specific-pages
   * @optional
   * @property {string} rating - either "general" or "adult"
   */
  rating: 'general',

  /**
   * The language for the content of the site, used in the `<html lang="">` attribute
   * and any other place where language information is needed. (assumes the entire site
   * is in the same language)
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang
   * @property {string} language - a valid BCP 47 language string
   * @default "en"
   */
  language: 'en',

  /**
   * The title of the site, used in the `<title>` tag and as the main heading.
   * Also used in the JSON (RSS) Feed. See the `base.webc` template for individual
   * page title computation.
   *
   * Sourced from the `name` property in `package.json`.
   * @required
   * @computed
   * @property {string} title - Site title
   */
  title: pkg.name,

  /**
   * Description is used in the `<meta name="description">` tag.
   * if the description is not set in front matter for the individual page.
   * This is also used in the JSON Feed.
   *
   * Sourced from the `description` property in `package.json`.
   * @computed
   * @property {string} description - A short description of the site.
   */
  description: pkg.description,

  /**
   * The URL is used in the `<link rel="canonical">` tag, JSON feed, and sitemap.
   * It should be the full URL to the site, including the protocol.
   *
   * Sourced from the `homepage` property in `package.json`.
   * @required
   * @type {URL}
   * @computed
   * @property {URL} url - The URL of the site.
   */
  url: new URL(pkg.homepage),

  /**
   * Sourced from the `keywords` property in `package.json`.
   * @computed
   * @property {string[]} keywords - An array of keywords for the site.
   */
  keywords: pkg.keywords,

  /**
   * Defines the author for the site, used in ActivityPub and other places.
   * Sourced from the `author` property in `package.json`.
   * @computed
   * @property {string} author - The name of the author.
   */
  author: pkg.author.name,

  /**
   * A quick and easy way to add addtional `<link>` tags to the site's `<head>`.
   *
   * Sourced from `package.json`.
   * @optional
   * @computed
   * @property {object[]} headLinks - an array of objects, each representing a `<link>` tag.
   * @property {string} headLinks[].rel - the relationship of the link
   * @property {string} headLinks[].href - the URL of the link
   */
  headLinks: [
    {
      rel: 'code-repository',
      href: pkg.repository.url.replace('git+', ''),
    },
    {
      rel: 'issues',
      href: pkg.bugs.url,
    },
    {
      rel: 'code-license',
      href: pkg.licenseUrl,
    },
  ],

  /**
   * The theme color for the site, used in the `<meta name="theme-color">` tag.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
   * @computed
   * @property {string} themeColor - The theme color for the site.
   */
  get themeColor() {
    return this.favicon.appleIconBgColor;
  },

  /**
   * The default Open Graph image for social sharing.
   * This will be used if no specific Open Graph image is defined for a page.
   *
   * @computed
   * @property {string} defaultOgImage - Path to the default Open Graph image.
   */
  get defaultOgImage() {
    return this.favicon.src;
  },

  /**
   * This gets mixed into the web-manifest for the site.
   *
   * @see https://github.com/NJAldwin/eleventy-plugin-gen-favicons
   * @computed
   * @property {object} manifest - Web manifest options.
   * @property {string} manifest.appName - The name of the application.
   * @property {string} manifest.appDescription - A description of the application.
   * @property {string} manifest.lang - The language of the application.
   */
  get manifest() {
    return {
      appName: this.title,
      appDescription: this.description,
      lang: this.language,
    };
  },

  /**
   * used in the build report for `humans.txt`
   *
   * @computed
   * @property {string} The git hash of the current HEAD
   */
  get hash() {
    return childProcess
      .execSync('git rev-parse --short HEAD')
      .toString()
      .trim();
  },

  /**
   * The security contact for the site, used in `security.txt`.
   *
   * @see https://www.rfc-editor.org/rfc/rfc9116#section-2.5.3
   * @computed
   * @property {string} securityContact - The security contact for the site.
   */
  securityContact: `mailto:${pkg.bugs.email}?subject=${encodeURIComponent(
    `Security Bug Report: ${pkg.name}`
  )}`,

  /**
   * The funding URL for the site.
   *
   * @computed
   * @property {string} funding - The funding URL for the site.
   */
  funding: pkg.funding,
};
