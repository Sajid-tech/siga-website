// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import viteCompression from 'vite-plugin-compression'
// import { VitePWA } from 'vite-plugin-pwa'
// import { visualizer } from 'rollup-plugin-visualizer'
// import legacy from '@vitejs/plugin-legacy'
// import { createHtmlPlugin } from 'vite-plugin-html'
// import path from 'path'
// import { fileURLToPath } from 'url'

// // 🔧 Fix __dirname in ESM
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')
//   const isDev = mode === 'development'
  
//   return {
//     plugins: [
//       react({
//         babel: {
//           plugins: [
//             ['babel-plugin-react-compiler'],
//             ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]
//           ]
//         }
//       }),
      
//       // Compression plugins - only in production
//       !isDev && viteCompression({
//         algorithm: 'brotliCompress',
//         ext: '.br',
//         threshold: 1024,
//         compressionOptions: { level: 11 },
//         deleteOriginFile: false
//       }),
//       !isDev && viteCompression({
//         algorithm: 'gzip',
//         ext: '.gz',
//         threshold: 1024,
//         deleteOriginFile: false
//       }),
      
//       // PWA for caching and offline support
//       !isDev && VitePWA({
//         registerType: 'autoUpdate',
//         includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
//         manifest: {
//           name: 'SIGA Website',
//           short_name: 'SIGA',
//           description: ' SIGA Website',
//           theme_color: '#ffffff',
//           background_color: '#ffffff',
//           display: 'standalone',
//           start_url: '/',
//           icons: [
//             {
//               src: '/siga-fav.png',
//               sizes: '192x192',
//               type: 'image/png'
//             },
//             {
//               src: 'siga-fav.png',
//               sizes: '512x512',
//               type: 'image/png'
//             },
//             {
//               src: 'siga-fav.png',
//               sizes: '512x512',
//               type: 'image/png',
//               purpose: 'any maskable'
//             }
//           ]
//         },
//         workbox: {
//           globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
//           runtimeCaching: [
//             {
//               urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
//               handler: 'CacheFirst',
//               options: {
//                 cacheName: 'images',
//                 expiration: {
//                   maxEntries: 60,
//                   maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
//                 }
//               }
//             }
//           ]
//         }
//       }),
      
      
//       // Legacy browser support - only in production
//       !isDev && legacy({
//         targets: ['defaults', 'not IE 11']
//       }),
      
//       // HTML optimization
//       createHtmlPlugin({
//         minify: !isDev, // Only minify in production
//         inject: {
//           data: {
//             title: 'SIGA Website',
//             description: 'Professional SIGA Website',
//             keywords: 'siga, industry, services'
//           }
//         }
//       }),
      
//       // Bundle analyzer (only in analysis mode)
//       mode === 'analyze' && visualizer({
//         filename: 'dist/stats.html',
//         open: true,
//         gzipSize: true,
//         brotliSize: true
//       })
//     ].filter(Boolean),
    
//     resolve: {
//       alias: {
//         '@': path.resolve(__dirname, './src'),
//         '@components': path.resolve(__dirname, './src/components'),
//         '@pages': path.resolve(__dirname, './src/pages'),
//         '@utils': path.resolve(__dirname, './src/utils'),
//         '@hooks': path.resolve(__dirname, './src/hooks'),
//         '@redux': path.resolve(__dirname, './src/redux')
//       },
//       extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
//     },
    
//     build: {
//       minify: isDev ? false : 'terser',
//       terserOptions: isDev ? {} : {
//         compress: {
//           drop_console: true,
//           drop_debugger: true,
//           pure_funcs: ['console.log', 'console.info'],
//           passes: 2
//         },
//         mangle: {
//           properties: {
//             regex: /^_/ // mangle private properties
//           }
//         },
//         format: {
//           comments: false
//         }
//       },
      
//       rollupOptions: {
//         output: {
//           // Let Rollup handle automatic chunk splitting - this is the key fix
//           manualChunks: undefined,
          
//           chunkFileNames: 'assets/js/[name]-[hash].js',
//           entryFileNames: 'assets/js/[name]-[hash].js',
//           assetFileNames: ({ name }) => {
//             if (/\.(css)$/.test(name ?? '')) return 'assets/css/[name]-[hash][extname]'
//             if (/\.(png|jpe?g|gif|svg|webp)$/.test(name ?? '')) return 'assets/images/[name]-[hash][extname]'
//             if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) return 'assets/fonts/[name]-[hash][extname]'
//             return 'assets/[name]-[hash][extname]'
//           }
//         },
        
//         treeshake: isDev ? false : {
//           preset: 'recommended',
//           moduleSideEffects: 'no-external'
//         }
//       },
      
//       assetsInlineLimit: 4096,
//       cssCodeSplit: !isDev,
//       sourcemap: isDev,
//       target: 'es2020',
//       chunkSizeWarningLimit: 800,
//       reportCompressedSize: false
//     },
    
//     optimizeDeps: {
//       include: [
//         'react', 'react-dom', 'react-router-dom', 
//         '@reduxjs/toolkit', 'react-redux', 'axios'
//       ],
//       exclude: ['@gsap/react', 'framer-motion', 'swiper']
//     },
    
//     server: {
//       headers: {
//         'Cache-Control': 'public, max-age=31536000, immutable'
//       }
//     },
    
//     preview: {
//       headers: {
//         'Cache-Control': 'public, max-age=31536000, immutable'
//       }
//     }
//   }
// })

// "dev": "vite",
// "build": "vite build",
// "lint": "eslint .",
// "preview": "vite preview"


// "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "build:analyze": "vite build --mode analyze",
//     "build:preview": "vite build && vite preview",
//     "build:prod": "vite build --mode production",
//     "lint": "eslint . --ext .js,.jsx --fix",
//     "lint:css": "stylelint \"src/**/*.css\" \"src/**/*.jsx\"",
//     "preview": "vite preview",
//     "type-check": "tsc --noEmit || exit 0",
//     "bundle-analyze": "npm run build:analyze && npx serve dist",
//     "optimize-images": "node scripts/optimize-images.js",
//     "prebuild": "npm run optimize-images && npm run lint",
//     "postbuild": "npm run bundle-analyze"
//   },


// advanced build 