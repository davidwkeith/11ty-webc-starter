import childProcess from 'node:child_process';

/**
 * These are all the site-level variables. Often used as fallback for page-level data.
 */
export default {

  /**
   * The title of the site, used in the `<title>` tag and as the main heading.
   * Also used in the JSON (RSS) Feed. See the `base.webc` template for individual
   * page title computation.
   * 
   * @required
   * @property {string} title - Site title
   */
  title: "11ty WebC Starter",

  /**
   * Description is used in the `<meta name="description">` tag.
   * if the description is not set in front matter for the individual page.
   * This is also used in the JSON Feed.
   * 
   * @property {string} description - A short description of the site.
   */
  description: "A simple 11ty starter site using Webc templating.",

  /**
   * The URL is used in the `<link rel="canonical">` tag, JSON feed, and many other
   * locations throughout the build. If you need to vary based on enviornment it would
   * be best to store the value in an ENV variable so it can change by build.
   * 
   * @required
   * @property {URL} the URL of the site.
   */
  url: new URL("https://11ty-webc-starter.dwk.io"),

  /**
   * If present this will be used to generate the `<meta property="fediverse:creator">` tag.
   * 
   * @see https://blog.joinmastodon.org/2024/07/highlighting-journalism-on-mastodon/
   * @optional
   * @property {string} fediverseCreator: the handle of the creator on the Fediverse.
   */
  // fediverseCreator: "@11ty-webc-starter@example.com",

  /***
   * See [RFC9116 Section 2.5.3](https://www.rfc-editor.org/rfc/rfc9116#section-2.5.3) for options
   * 
   * @see https://www.rfc-editor.org/rfc/rfc9116#section-2.5.3
   * @optional
   * @property {string} securityContact - The contact email for security issues, used
   *                                      in /.well-known/security.txt.
   */
  // securityContact: "mailto:security@example.com",

  /**
   * If present this will be used to generate the `<meta name="copyright">` tag.
   * 
   * @optional
   * @property {string} copyright - The copywrite string for the site
   */
  copyright: `CC-BY-4.0 David W. Keith ${(new Date()).getFullYear()}`,

/***
 * This is used to generate the favicons for the site. Ideally using a
 * SVG so all the appropriate sizes can be generated at the higest quality.
 * 
 * @see https://github.com/NJAldwin/eleventy-plugin-gen-favicons
 */
  favicon: {
    src: "img/favicon.svg",
    appleIconBgColor: "#FFFFFF",
    appleIconPadding: 20,
  },

  /**
   * This gets mixed into the web-manifest for the site.
   * 
   * @see https://github.com/NJAldwin/eleventy-plugin-gen-favicons
   */
  manifest: { 
    appName: "11ty WebC Starter",
    appDescription: "A simple 11ty starter site using Webc templating.", 
    lang: "en",
  },

  /**
   * The content rating of the site, used in the `<meta name="rating">` tag.
   * If omitted the rating tag won't be output and is equivelent to "general"
   * 
   * @see https://developers.google.com/search/docs/specialty/explicit/guidelines?udm=14#mark-specific-pages
   * @optional
   * @property {string} rating - either "general" or "adult"
   */
  rating: "general",
  
  /***
   * The language for the content of the site, used in the `<html lang="">` attribute
   * and any other place where language information is needed. (assumes the entire site
   * is in the same language)
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang
   * @property {string} language - a valid BCP 47 language string
   * @default "en"
   */
  language: "en",
  
  /**
   * Support for switching between dark and light mode in CSS.
   * 
   * TODO: support `media` attribute.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme
   * @property {string} colorScheme - a string that defines the site's prefered color scheme
   */
  colorScheme: "dark light",

  /**
   * A quick and easy way to add addtional `<link>` tags to the site's `<head>`.
   * 
   * TODO: support all attributes
   * 
   * @optional
   * @property {object} headLinks - a key-value object where the key is the relationship type and the value is the URI.
   */
  headLinks: {
    "code-repository": "https://github.com/davidwkeith/11ty-webc-starter.git",
    "issues": "https://github.com/davidwkeith/11ty-webc-starter/-/issues",
    "code-license": "https://opensource.org/license/isc-license-txt",
  },

  /**
   * used in the build report for `humans.txt`
   * 
   * @computed
   * @property {string} The git hash of the current HEAD
   */
  hash: childProcess
      .execSync('git rev-parse --short HEAD')
      .toString()
      .trim(),
}