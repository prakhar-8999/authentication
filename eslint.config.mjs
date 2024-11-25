import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['node_modules/*', 'dist/*'] },
  {
    plugins: {
      prettier,
      import: importPlugin,
    },
    rules: {
      'linebreak-style': 'off',
      'implicit-arrow-linebreak': 'off',
      'prettier/prettier': 'error',
      'import/no-extraneous-dependencies': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'func-names': ['error', 'never'],
      'import/no-relative-packages': 'off',
      'sort-imports': ['off'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true }, // Alphabetical order
          'newlines-between': 'always', // Optional: Add newlines between groups
        },
      ],
      'no-magic-numbers': [
        'error',
        {
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          enforceConst: true,
          ignore: [0, 1],
        },
      ],
      curly: ['error', 'multi-line'],
      'object-curly-newline': 'off',
      eqeqeq: ['error', 'smart'],
      'logical-assignment-operators': [
        'error',
        'always',
        { enforceForIfStatements: true },
      ],
      'require-await': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'no-plusplus': 'off',
      'no-param-reassign': 'off',
      'wrap-iife': 'off',
      camelcase: ['error', { ignoreGlobals: true }],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
          imports: 'always-multiline',
          objects: 'always-multiline',
        },
      ],
      'operator-linebreak': 'off',
      'function-paren-newline': 'off',
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
