import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  site: SITE.website,
  integrations: [react(), sitemap()],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  scopedStyleStrategy: "class",
  vite: {
    resolve: {
      alias: {
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        "@content": fileURLToPath(new URL("./src/content", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@config": fileURLToPath(new URL("./src/config.ts", import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js", "@resvg/resvg-js-win32-x64-msvc"],
    },
    ssr: {
      noExternal: ["@resvg/resvg-js"],
    },
  },
});
