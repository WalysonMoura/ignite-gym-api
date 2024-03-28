import { defineConfig } from "prettier";
import sortImports from "@ianvs/prettier-plugin-sort-imports";

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @type { PrettierConfig | SortImportsConfig } */

const path = require("path"); // Use path for Node.js

const prettierConfig = {
  plugins: [sortImports], // Include only the necessary plugin
  importOrder: [
    // Optimized backend import order:
    "<THIRD_PARTY_MODULES>", // Prioritize third-party modules
    "^@acme(/.*)?$", // Then custom '@acme' modules
    "<TYPES>", // Then type imports
    "",
    "^[./|../|~/]", // Lastly, relative imports
  ],
  importOrderParserPlugins: ["typescript"], // Tailored for TypeScript backend
  importOrderTypeScriptVersion: "4.4.0",
};

export default prettierConfig;
