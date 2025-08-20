import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, 
      deleteOriginFile: false, 
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://southindiagarmentsassociation.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
   resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  build: {
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
})
