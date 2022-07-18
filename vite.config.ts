import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

import { createHtmlPlugin } from "vite-plugin-html";

import unpluginAutoImport from "unplugin-auto-import/vite";

import unpluginAutoImportConfig from "./configs/auto-imports";

import { visualizer as VisualizeChunksPlugin } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  const CHUNK_PREVIEW =
    command === "build" && process.env.CHUNK_PREVIEW !== "false";

  return {
    server: {
      port: 3000,
    },
    build: {
      rollupOptions: {
        plugins: [
          CHUNK_PREVIEW
            ? VisualizeChunksPlugin({
                open: false,
                template: "treemap",
                filename: "misc/chunks-report.html",
              })
            : null,
        ],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@store": path.resolve(__dirname, "./src/store/index.js"),
        "@helpers": path.resolve(__dirname, "./src/helpers"),
        "@@": path.resolve(__dirname, "./src/components"),
      },
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
        template: { transformAssetUrls },
      }),
      unpluginAutoImport(unpluginAutoImportConfig as unknown),
      quasar({
        sassVariables: "src/css/quasar-variables.scss",
      }),
      createHtmlPlugin({
        minify: true,
      }),
    ],
  };
});
