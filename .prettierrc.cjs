/** @type {import('prettier').Config} */
module.exports = {
  ...require('@shopify/prettier-config'),
  tabWidth: 2,
  overrides: [
    {
      files: ['*.{scss,css}'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
