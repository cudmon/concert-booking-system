import { defineConfig } from "eslint/config";

import js from "@eslint/js";
import globals from "globals";
import lint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  js.configs.recommended,

  ...lint.configs.recommended,

  prettier,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

    languageOptions: {
      parser: lint.parser,

      globals: {
        ...globals.node,
        ...globals.jest
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
]);
