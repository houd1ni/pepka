import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist/**', 'tmp/**', '**/*.d.ts'] },
  {
    files: ['**/*.ts'],
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
            'time',
            'timeEnd',
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
    files: ['**/*.ts'],
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
)