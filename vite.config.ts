import {reactRouter} from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: 'Fansity',
        short_name: 'Fansity',
        description: 'Exclusive content and live experience for your fans.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#121212',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,json}"],
        maximumFileSizeToCacheInBytes: 4000000,
      },
      injectManifest: {
        maximumFileSizeToCacheInBytes: 4000000,
      },
      devOptions: {
        enabled: true,
        type: "module",
      }
    }),
      {
      name: 'ignore-chrome-devtools-check',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith("/.well-known")) {
            res.statusCode = 204;
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3002,
    open: true,
    allowedHosts: true,
  },
  build: {
    outDir: 'build',
  },
});
