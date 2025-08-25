import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import legacy from '@vitejs/plugin-legacy'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ['babel-plugin-react-compiler'],
            ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]
          ]
        }
      }),
      
      // Compression plugins
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        compressionOptions: { level: 11 },
        deleteOriginFile: false
      }),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024
      }),
      
      // PWA for caching and offline support
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                }
              }
            }
          ]
        }
      }),
      
      // Code splitting optimization
      chunkSplitPlugin({
        strategy: 'default',
        customSplitting: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'state-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'ui-vendor': [
            '@radix-ui/react-dialog', '@radix-ui/react-label', 
            '@radix-ui/react-radio-group', '@radix-ui/react-select',
            '@radix-ui/react-separator', '@radix-ui/react-slot',
            '@radix-ui/react-tabs', '@radix-ui/react-toggle-group'
          ],
          'animation-vendor': ['framer-motion', 'gsap', '@gsap/react'],
          'utils-vendor': ['axios', 'moment', 'crypto-js'],
          'carousel-vendor': ['embla-carousel-react', 'swiper'],
          'styles-vendor': ['tailwind-merge', 'class-variance-authority', 'clsx']
        }
      }),
      
      // Legacy browser support
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      
      // HTML optimization
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: 'SIGA Website',
            description: 'Professional SIGA Website',
            keywords: 'siga, industry, services'
          }
        }
      }),
      
      // Bundle analyzer (only in analysis mode)
      mode === 'analyze' && visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ].filter(Boolean),
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@redux': path.resolve(__dirname, './src/redux')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
          passes: 3
        },
        mangle: {
          properties: {
            regex: /^_/ // mangle private properties
          }
        },
        format: {
          comments: false
        }
      },
      
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-react'
              if (id.includes('redux')) return 'vendor-redux'
              if (id.includes('axios') || id.includes('moment')) return 'vendor-utils'
              if (id.includes('framer-motion') || id.includes('gsap')) return 'vendor-animation'
              if (id.includes('radix-ui')) return 'vendor-ui'
              return 'vendor-other'
            }
            
            // Split by pages for better caching
            if (id.includes('src/pages/')) {
              const pageName = id.split('src/pages/')[1].split('/')[0]
              return `page-${pageName}`
            }
          },
          
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(css)$/.test(name ?? '')) return 'assets/css/[name]-[hash][extname]'
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(name ?? '')) return 'assets/images/[name]-[hash][extname]'
            if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) return 'assets/fonts/[name]-[hash][extname]'
            return 'assets/[name]-[hash][extname]'
          }
        }
      },
      
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: mode === 'development',
      target: 'es2020',
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false,
      
      // Tree shaking optimization
      rollupOptions: {
        treeshake: {
          preset: 'recommended',
          moduleSideEffects: 'no-external'
        }
      }
    },
    
    optimizeDeps: {
      include: [
        'react', 'react-dom', 'react-router-dom', 
        '@reduxjs/toolkit', 'react-redux', 'axios'
      ],
      exclude: ['@gsap/react', 'framer-motion', 'swiper']
    },
    
    server: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    },
    
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  }
})















// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import viteCompression from 'vite-plugin-compression'
// import path from 'path'

// export default defineConfig({
//   plugins: [
//     react(),
//     viteCompression({
//       algorithm: 'brotliCompress',
//       ext: '.br',
//       threshold: 1024,
//       compressionOptions: { level: 11 },
//       deleteOriginFile: false
//     })
//   ],
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
