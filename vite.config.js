import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon_io/favicon.ico',
        'favicon_io/apple-touch-icon.png',
        'favicon_io/favicon-32x32.png',
        'favicon_io/favicon-16x16.png',
        'favicon_io/mask-icon.svg',
      ],
      manifest: {
        id: '/?source=pwa',
        name: 'GlimmerInk Creations',
        short_name: 'GlimmerInk',
        description:
          'Premium design services blending artistry and technology — posters, branding, and digital design by GlimmerInk Creations.',
        start_url: '/?utm_source=homescreen',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#002B5B',
        background_color: '#ffffff',
        icons: [
          {
            src: '/favicon_io/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/favicon_io/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/home.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
          },
          {
            src: '/screenshots/portfolio.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
          },
        ],
        categories: ['design', 'branding', 'creative', 'technology'],
        shortcuts: [
          {
            name: 'Portfolio',
            short_name: 'Portfolio',
            url: '/portfolio',
          },
          {
            name: 'Contact Us',
            short_name: 'Contact',
            url: '/contact',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/glimmerink\.netlify\.app\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'glimmerink-content',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400, // 1 day
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'glimmerink-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 604800, // 7 days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
