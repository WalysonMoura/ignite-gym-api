module.exports = {
  extends: [
    // Prioritize Rocketseat's Node configuration
    "@rocketseat/eslint-config/node",
    // Base ESLint configurations for consistency
    "eslint:recommended",
    // TypeScript-specific configurations
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
  ],
  env: {
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    // Customizations based on project preferences
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      { checksVoidReturn: { attributes: false } },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  },
  ignorePatterns: [
    "**/*.config.js",
    "**/*.config.cjs",
    "**/.eslintrc.cjs",
    ".next",
    "dist",
    "pnpm-lock.yaml",
  ],
  reportUnusedDisableDirectives: true,
};
