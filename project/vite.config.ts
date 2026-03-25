import { defineConfig } from "vitest/config"; // Use this import for better types
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/vitest-setup.ts",
  },
});
