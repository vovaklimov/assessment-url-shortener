import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import config from "./vitest.config";

export default mergeConfig(
  config,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, "__tests__/**"],
    },
  }),
);
