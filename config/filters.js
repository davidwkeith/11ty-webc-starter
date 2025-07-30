export default function (eleventyConfig) {
  /**
   * Converts a date object to an HTML-friendly date string (YYYY-MM-DD).
   * @param {Date} dateObj - The date object to format.
   * @returns {string} The formatted date string.
   */
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return dateObj.toISOString().slice(0, 10);
  });

  /**
   * Converts a date object to a human-readable date string.
   * @param {Date} dateObj - The date object to format.
   * @returns {string} The formatted date string.
   */
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });
}
