import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  // Main app files (browser)
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['vite.config.js', 'tailwind.config.js', 'postcss.config.js'], // prevent double lint
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Za-z_]' }],
    },
  },

  // Node.js config files (vite.config.js, tailwind, etc.)
  {
    files: ['*.config.js', 'vite.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // 👈 enables process, __dirname, module, etc.
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: {
      // allow console in config files
      'no-console': 'off',
    },
  },
])
