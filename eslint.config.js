import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  prettierRecommended,
  {
    files: ['src/_headers.11ty.js', 'src/_redirects.11ty.js'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^data$' }],
    },
  },
  {
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
