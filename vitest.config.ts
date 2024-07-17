import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    hookTimeout: 30_000,
    environment: "node",
    coverage: {
      provider: "istanbul",
      reportOnFailure: true,
      reporter: ["json", "json-summary", "text"],
    },
  },
});
