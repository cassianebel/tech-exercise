import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [
      "tests/**",
      "playwright-report/**",
      "test-results/**",
      "**/node_modules/**",
    ],
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
  },
});
