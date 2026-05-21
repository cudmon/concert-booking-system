import { defineConfig, globalIgnores } from "eslint/config";

import ts from "eslint-config-next/typescript";
import vitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...vitals,
  ...ts,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },

    settings: {
      react: {
        version: "19.0"
      }
    }
  }
]);
