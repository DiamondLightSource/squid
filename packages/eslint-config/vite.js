const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  parser: '@typescript-eslint/parser',
  plugins: ["only-warn",'react-refresh'],
  root: true,
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
