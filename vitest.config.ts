import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "istanbul",
      reportOnFailure: true,
      reporter: ["json", "json-summary", "text"],
    },
  },
});
