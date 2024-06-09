import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2022,
      globals: { ...globals.node },
    },
  },
  {
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default config;
