/**
 * Defines the base schema.org data for all pages.
 *
 * This data can be overridden on a per-page basis using 11ty's data cascade.
 * The final object must be a valid Schema.org JSON-LD context when serialized.
 *
 * @see https://schema.org/WebPage
 * @property {string} @context - The schema.org context.
 * @property {string} @type - The schema.org type.
 */
export default {
  "@context": "https://schema.org",
  "@type": "WebPage",
}