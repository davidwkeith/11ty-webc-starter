# Configuration

This document provides instructions for completing the configuration of advanced features in this starter.

## Webmention.io

This starter includes support for [webmention.io](https://webmention.io), a hosted service for receiving and displaying webmentions.

To enable webmentions, you will need to:

1.  **Sign in to webmention.io:** Use your domain to sign in to webmention.io.
2.  **Enable the feature:** In `src/_data/site.js`, set the `hasWebmentions` property to `true`.
3.  **Update your domain:** The webmention username is derived from the `url` property in `src/_data/site.js`. Ensure this is set to your correct domain.

## ActivityPub

This starter includes support for [ActivityPub](https://www.w3.org/TR/activitypub/), allowing your blog to be discovered and interacted with on the Fediverse.

To enable ActivityPub, you will need to:

1.  **Enable the feature:** In `src/_data/site.js`, set the `hasActivityPub` property to `true`.
2.  **Update your actor details:** In `src/_data/site.js`, update the `author` object with your desired name and handle.
3.  **Generate a keypair:** The `actor.json` file requires a public key. You will need to generate a public/private key pair and add the public key to the `publicKeyPem` property in `src/actor.json.11ty.js`.

## Favicon Generation

This starter automates favicon generation from a single SVG source (`img/favicon.svg`). The `favicon` shortcode (defined in `config/shortcodes.js`) handles the creation of multiple favicon formats and sizes, ensuring optimal display across various browsers and devices.

- **Multi-resolution ICO:** A `favicon.ico` file is generated with multiple resolutions (16x16, 24x24, 32x32, 48x48, 64x64, 128x128, 256x256) for broad browser compatibility.
- **PNG Icons:** Specific PNG sizes (e.g., 180x180 for Apple Touch Icon) are generated for PWA and mobile device compatibility.
- **SVG Favicon:** The original `favicon.svg` is also linked for modern browsers that support SVG favicons, providing a crisp, scalable icon.

To customize the favicon:

1.  **Replace `img/favicon.svg`:** Update this file with your desired SVG favicon. Ensure it is a square aspect ratio for best results.
2.  **No further configuration is typically required:** The build process automatically generates and links all necessary favicon formats. If you need to adjust the generated sizes or formats, you can modify the `favicon` shortcode in `config/shortcodes.js`.
