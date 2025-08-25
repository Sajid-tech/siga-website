// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import viteCompression from 'vite-plugin-compression'
// import { VitePWA } from 'vite-plugin-pwa'
// import { visualizer } from 'rollup-plugin-visualizer'
// import path from 'path'
// import { fileURLToPath } from 'url'

// // 🔧 Fix __dirname in ESM
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// export default defineConfig({
//   plugins: [
//     react(),
//     viteCompression({
//       algorithm: 'brotliCompress',
//       ext: '.br',
//       threshold: 1024,
//       compressionOptions: { level: 11 },
//       deleteOriginFile: false
//     }),
//     // Add VitePWA plugin
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
//       manifest: {
//         name: 'SIGA Website',
//         short_name: 'SIGA',
//         description: 'SIGA Website',
//         theme_color: '#ffffff',
//         background_color: '#ffffff',
//         display: 'standalone',
//         start_url: '/',
//         icons: [
//           {
//             src: '/siga-fav.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'siga-fav.png',
//             sizes: '512x512',
//             type: 'image/png'
//           },
//           {
//             src: 'siga-fav.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any maskable'
//           }
//         ]
//       },
//       workbox: {
//         globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
//         runtimeCaching: [
//           {
//             urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'images',
//               expiration: {
//                 maxEntries: 60,
//                 maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
//               }
//             }
//           }
//         ]
//       }
//     }),
//     // Add visualizer plugin (only in production)
//     process.env.NODE_ENV === 'production' && visualizer({
//       filename: 'dist/stats.html',
//       open: false,
//       gzipSize: true,
//       brotliSize: true
//     })
//   ].filter(Boolean),
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src')
//     }
//   },
//   build: {
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true,
//         drop_debugger: true
//       }
//     },
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//           router: ['react-router-dom'],
//           ui: ['@reduxjs/toolkit', 'react-redux'],
//           utils: ['axios', 'moment']
//         },
//         chunkFileNames: 'assets/js/[name]-[hash].js',
//         entryFileNames: 'assets/js/[name]-[hash].js',
//         assetFileNames: ({ name }) => {
//           if (/\.(css)$/.test(name ?? '')) return 'assets/css/[name]-[hash][extname]'
//           return 'assets/[name]-[hash][extname]'
//         }
//       }
//     },
//     assetsInlineLimit: 4096,
//     cssCodeSplit: true,
//     sourcemap: false
//   },
//   server: {
//     headers: {
//       'Cache-Control': 'public, max-age=31536000, immutable'
//     }
//   },
//   preview: {
//     headers: {
//       'Cache-Control': 'public, max-age=31536000, immutable'
//     }
//   }
// })