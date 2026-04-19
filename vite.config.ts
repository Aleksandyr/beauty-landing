import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { handleContactRequest } from "./server/contact-mail";

// ... (keep all your existing plugin code: vitePluginManusDebugCollector, viteContactApiPlugin, viteOptionalAnalyticsPlugin) ...

export default defineConfig(async ({ mode }) => {
  const envDir = path.resolve(import.meta.dirname);
  
  // Dynamically import tailwindcss
  let tailwindPlugin = null;
  try {
    const tailwindcss = await import("@tailwindcss/vite");
    tailwindPlugin = tailwindcss.default;
  } catch (e) {
    console.warn("Tailwind CSS Vite plugin failed to load", e);
  }

  const plugins = [
    react(),
    tailwindPlugin,
    jsxLocPlugin(),
    vitePluginManusRuntime(),
    vitePluginManusDebugCollector(),
    viteOptionalAnalyticsPlugin(mode, envDir),
    viteContactApiPlugin(),
  ].filter(Boolean);

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir,
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      strictPort: false,
      host: true,
      allowedHosts: [
        ".manuspre.computer",
        ".manus.computer",
        ".manus-asia.computer",
        ".manuscomputer.ai",
        ".manusvm.computer",
        "localhost",
        "127.0.0.1",
      ],
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});