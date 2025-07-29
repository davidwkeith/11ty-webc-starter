# 11ty WebC Starter

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A style-free starter for templating an entire 11ty site using WebC, designed for simplicity and flexibility. This project demonstrates how to leverage WebC components for all your templating needs, including HTML, XML, and plain text files. While pre-configured for [Cloudflare Pages](https://pages.cloudflare.com), its static nature makes it easily adaptable to any static site hosting provider.

## Purpose

This starter aims to provide a clean, unopinionated foundation for building static sites with Eleventy and WebC. It focuses on:

- **WebC-first Templating:** All content and layouts are built using WebC components, showcasing a modern approach to templating in Eleventy.
- **Minimal Styling:** It comes with minimal, unopinionated styling, allowing you to bring your own design system or framework without conflicts.
- **Essential Features:** Includes common features like JSON Feed generation, favicon support, and Schema.org integration.
- **Clear Structure:** A well-organized project structure that's easy to understand and extend.

## Demo

A live demo of this starter is available at [11ty-webc-starter.dwk.io](https://11ty-webc-starter.dwk.io).

## Features

### Templating & Content

- **Eleventy:** A simpler static site generator.
- **WebC:** Component-based templating for HTML, XML, and text files.
- **JSON Feed:** Automatically generated `feed.json` for your blog posts.

### Security

- **Content Security Policy (CSP):** A strict CSP is configured in `_headers` to help prevent XSS and other injection attacks.

### SEO & Metadata

- **Schema.org Integration:** Easy setup for structured data using JSON-LD.
- **Theme Color:** A `theme-color` meta tag is automatically generated from the `appleIconBgColor` in `src/_data/site.js`.
- **Author Link:** A `rel="me"` link is automatically generated from the author's URL in `src/_data/schema.js`.
- **Webmention.io Integration:** Includes support for receiving and displaying webmentions, with a feature flag to easily enable or disable.
- **ActivityPub Integration:** Generates an ActivityPub actor and representations for each post, making the site discoverable and interactive on the Fediverse.

### Progressive Web App (PWA)

- **PWA Ready:** Configured with a web app manifest (`manifest.webmanifest`) and a service worker (`service-worker.js`) for offline capabilities and installability.
- **Automatic Icon Generation:** PWA icons (e.g., `icon-192.png`, `icon-512.png`) are automatically generated from `img/favicon.svg`.

### Deployment

- **Cloudflare Pages Ready:** Includes `_headers` and `_redirects` for Cloudflare Pages deployment.
- **Favicon Generation:** Configurable favicon generation from a single SVG source.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/davidwkeith/11ty-webc-starter.git
    cd 11ty-webc-starter
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Creating a New Project from this Starter

To start a fresh project using this starter, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/davidwkeith/11ty-webc-starter.git your-new-project-name
    ```

    Replace `your-new-project-name` with the desired name for your new website's directory.

2.  **Navigate into your new project:**

    ```bash
    cd your-new-project-name
    ```

3.  **Remove the old Git history:**

    ```bash
    rm -rf .git
    ```

    This command removes the `.git` directory, effectively detaching your new project from the starter's repository.

4.  **Initialize a new Git repository (optional, but recommended):**

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

    Now you have a clean Git repository for your new project.

5.  **Install dependencies:**

    ```bash
    npm install
    ```

6.  **Customize your site:**
    - Edit `src/_data/site.js` to update your site's title, description, URL, and other global settings.
    - Start adding your content in `src/index.md`, `src/posts/`, or create new pages.

## Available Commands

This starter uses `npm` scripts to automate common tasks:

- **`npm run serve`**: Starts the Eleventy development server with hot-reloading.
- **`npm run build`**: Builds the Eleventy site.
- **`npm run serve`**: Starts the Eleventy development server with hot-reloading.

### Testing PWA Features with Lighthouse

To thoroughly test the PWA features of your site, including manifest, service worker, and offline capabilities, use Google Chrome's Lighthouse tool:

1.  **Start the development server:**
    ```bash
    npm run serve
    ```
2.  **Open Chrome DevTools:** Navigate to `http://localhost:8080` (or your configured local server address) in Google Chrome. Open DevTools (F12 or right-click -> Inspect).
3.  **Go to the Lighthouse tab:** In DevTools, click on the "Lighthouse" tab.
4.  **Configure and run audit:** Select "Progressive Web App" as the category and choose "Desktop" or "Mobile" for the device. Click "Analyze page load" to run the audit.

Lighthouse will provide a detailed report on your PWA's performance, accessibility, best practices, SEO, and PWA readiness, highlighting any areas for improvement.

## Project Structure

```
.
├── .eleventy.config.js   # Eleventy configuration file
├── package.json          # Project dependencies and scripts
├── README.md             # This file
├── LICENSE               # The ISC license file
└── src/                  # All source files for your site
    ├── _data/            # Global data files (site.js, schema.js)
    ├── _includes/        # Reusable WebC components, CSS, JS
    ├── _layouts/         # WebC layout components
    ├── .well-known/      # Standard web files (e.g., security.txt)
    ├── posts/            # Markdown files for blog posts
    ├── 404.md            # Custom 404 page
    ├── feed.json.11ty.js # JSON Feed generation
    ├── index.md          # Homepage content
    └── ...               # Other pages and assets
```

## Customization

### Site Configuration (`src/_data/site.js`)

This file contains global site-wide variables such as the site title, description, URL, and more. It's the primary place to configure your site's metadata and global settings. The JSDoc comments within the file provide detailed explanations for each property.

### Schema Data (`src/_data/schema.js`)

This file defines the base Schema.org JSON-LD data for your site. You can extend or override this data on a per-page basis using Eleventy's data cascade. This is crucial for improving your site's SEO and how it appears in search results.

### Content

- **Pages:** Add new Markdown (`.md`) or WebC (`.webc`) files directly in the `src/` directory or its subdirectories to create new pages.
- **Blog Posts:** Create new Markdown files within the `src/posts/` directory. Each Markdown file will be processed as a blog post.

### Styling and Scripting

- **CSS:** Add your global CSS to `src/_includes/main.css`. You can also include component-specific styles within your WebC components.
- **JavaScript:** Add your global JavaScript to `src/_includes/main.js`. WebC also allows for scoped JavaScript directly within your components.

## Deployment

This starter is designed for easy deployment to [Cloudflare Pages](https://pages.cloudflare.com). Cloudflare Pages has native support for Eleventy projects, simplifying the deployment process.

1.  **Connect your Git repository:** Link your project's Git repository (e.g., GitHub, GitLab, Bitbucket) to Cloudflare Pages.
2.  **Automatic Detection:** Cloudflare Pages will automatically detect that your project is an Eleventy site.
3.  **Build & Deploy:** It will use the `npm install` command to install dependencies and `npm run build` to build your site. The output will be served from the `_site` directory.

No special configuration is typically required for Eleventy projects on Cloudflare Pages. For other hosting providers, consult their documentation for Eleventy deployment.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for improvement, please open an issue or submit a pull request.

## TODO

- **Subresource Integrity (SRI):** Re-implement the automated post-build process to add SHA-384 hashes to local CSS and JavaScript assets.
- **Webmention Display:** Improve the display of webmentions.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
