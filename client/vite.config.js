import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      type: "asset/resource",
    },
  ],
});
