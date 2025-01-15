import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
      },
      parser: parserTs,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      plugins: {
        react: pluginReact,
        '@typescript-eslint': pluginTs,
        prettier: 'eslint-plugin-prettier',
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      plugins: {
        '@typescript-eslint': pluginTs,
      },
    },
  },
];
