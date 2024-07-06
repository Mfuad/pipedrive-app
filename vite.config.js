import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./build",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: `static/[name]-[hash][extname]`,
        chunkFileNames: "static/[name]-[hash].js",
        entryFileNames: "static/[name]-[hash].js",
      },
    },
  },
});
