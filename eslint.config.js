import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
    "node_modules",
    "dist",
    "build",
    "src/assets"
    ]
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@tanstack/query': pluginQuery,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@tanstack/query/exhaustive-deps': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "indent": ["error", 2, {SwitchCase: 1}],
      "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-empty-interface": "off",
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
      },
    ],
    semi: ["error", "always"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 0}],
    "react-hooks/exhaustive-deps": "off",
    "react-refresh/only-export-components": "warn",
    "curly": "error",
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "computed-property-spacing": ["error", "never"],
    "brace-style": ["error", "1tbs", {"allowSingleLine": false}],
    }
  },
)
