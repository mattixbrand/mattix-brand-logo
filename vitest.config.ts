/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  }),
  defineVitestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      testTimeout: 15000,
      coverage: {
        reporter: ["text", "json", "html"],
        exclude: ["node_modules/", "src/test/", "**/*.d.ts"],
      },
    },
  })
);
