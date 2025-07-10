# 11ty WebC Starter

An example of a simple blog using WebC templating throughout (including in XML and TXT files, but not JSON as that is crazy talk). This starter project assumes deployment to [Cloudflare Pages](https://pages.cloudflare.com) so it includes static configuration files for that platform, but similar files exist for most common static site hosts.

## Overview

Run `npm @11ty/eleventy` to build the site, or view the latest version here: https://11ty-webc-starter.dwk.io

## Customization

The CSS and JS can be updated however is needed, but some data files are required to build with the way the WebC templates are setup. These are fully documented.

### Site

The [site data file](./src/_data/site.js) is for sitewide data like the site's URL, title, and more.

### Schema

The [schema data file](./src/_data/schema.js) is directly seralized into JSON-LD once it is validated. This makes it easy to add the appropraiate schema.org metadata to each page. It ultimately must conform to the Schema.org context.