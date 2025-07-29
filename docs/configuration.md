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
