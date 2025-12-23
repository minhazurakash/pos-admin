// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended', // Already includes the plugin, so no need to redefine it
  ),
  {
    ignores: ['.cache', '.next', '.vscode', 'node_modules', 'public'], // Replaces .eslintignore
    plugins: {
      '@typescript-eslint': tsEslint,
      'unused-imports': unusedImports, // Removed '@tanstack/query' to prevent redefinition error
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_', // Ignores variables starting with "_"
          args: 'after-used',
          argsIgnorePattern: '^_', // Ignores function arguments starting with "_"
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_', // Ignores caught errors starting with "_"
        },
      ],
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'error',
    },
  },
];
