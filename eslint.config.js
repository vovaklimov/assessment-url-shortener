// @ts-check

import js from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default tsEslint.config(
  js.configs.recommended,
  ...tsEslint.configs.strict,
  eslintConfigPrettier,
  {
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2022,
      globals: { ...globals.node },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
);
