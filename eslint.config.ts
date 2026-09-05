import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['src/**/*.ts'],
    extends: [tseslint.configs.base],
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
    rules: {
      'quotes': ['error', 'single'],
      'max-len': ['error', { code: 120 }],
      'no-caller': 'error',
      'no-console': [
        'warn',
        {
          allow: [
            'assert',
            'clear',
            'count',
            'countReset',
            'dir',
            'dirxml',
            'error',
            'group',
            'groupCollapsed',
            'groupEnd',
            'log',
            'table',
            'profile',
            'profileEnd',
            'profileDelete',
            'warn',
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: {
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        NodeJS: 'readonly',
      },
    },
  },
);
