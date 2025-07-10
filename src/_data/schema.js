/***
 * Using 11ty's data cascade this can be overridden to more specific
 * types of WebPage's.
 * 
 * For a sucessfull build, this object must validate as a Schema.org
 * JSON-LD context when serialized to JSON.
 * 
 * @see https://schema.org/WebPage
 */
export default {
  "@context": "https://schema.org",
  "@type": "WebPage",
}