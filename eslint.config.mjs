import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

const config = [
  {
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2021,
      globals: { ...globals.node },
    },
  },
  js.configs.recommended,
  eslintConfigPrettier,
];

export default config;
