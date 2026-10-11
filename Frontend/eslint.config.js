import globals from 'globals'

export default [
  {
    files: ['src/**/*.{js,jsx}', 'tests/**/*.test.jsx', 'vite.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unreachable': 'error',
    },
  },
]
