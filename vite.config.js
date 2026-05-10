import {
  defineConfig,
} from "vite";

import react,
{
  reactCompilerPreset,
} from "@vitejs/plugin-react";

import babel
  from "@rolldown/plugin-babel";

import tailwindcss
  from "@tailwindcss/vite";

import {
  VitePWA,
} from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

    babel({
      presets: [
        reactCompilerPreset(),
      ],
    }),

    tailwindcss(),

    // PWA
    VitePWA({

      registerType:
        "autoUpdate",

      includeAssets: [

        "favicon.svg",

        "apple-touch-icon.png",

      ],

      manifest: {

        name:
          "YOmusic",

        short_name:
          "YOmusic",

        description:
          "Music Streaming App",

        theme_color:
          "#000000",

        background_color:
          "#000000",

        display:
          "standalone",

        orientation:
          "portrait",

        scope: "/",

        start_url: "/",

        icons: [

          {
            src: "/pwa-192.png",

            sizes: "192x192",

            type: "image/png",
          },

          {
            src: "/pwa-512.png",

            sizes: "512x512",

            type: "image/png",
          },

          {
            src: "/pwa-512.png",

            sizes: "512x512",

            type: "image/png",

            purpose:
              "any maskable",
          },

        ],

      },

    }),

  ],

});