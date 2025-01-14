// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

const __dirname = import.meta.dirname;

export default defineConfig({
  root: 'server/views',
  resolve: {
    alias: {
      '@tailwind.config': resolve(__dirname, './tailwind.config.js'),
      '@': resolve(__dirname, './server/views'),
    }
  },
  build: {
    // Output directory for built files
    outDir: resolve(__dirname, 'server/public'),
    
    // Generate manifest.json for server-side import
    manifest: true,
    
    rollupOptions: {
      input: {
        ...Object.fromEntries(
          fs.readdirSync(resolve(__dirname, 'server/views/js'))
          .filter(file => file.endsWith('.js'))
          .map(file => [file.replace('.js', ''), resolve(__dirname, 'server/views/js', file)])
        ),
        ...Object.fromEntries(
          fs.readdirSync(resolve(__dirname, 'server/views/js/custom'))
          .filter(file => file.endsWith('.js'))
          .map(file => [file.replace('.js', ''), resolve(__dirname, 'server/views/js/custom', file)])
        ),
        ...Object.fromEntries(
          fs.readdirSync(resolve(__dirname, 'server/views/js/pages'))
          .filter(file => file.endsWith('.js'))
          .map(file => [file.replace('.js', ''), resolve(__dirname, 'server/views/js/pages', file)])
        ),
        style: resolve(__dirname, 'server/views/css/app.css')
      },
      output: {
        // // Ensure clean asset file names
        // entryFileNames: 'js/[name]-[hash].js',
        // chunkFileNames: 'js/[name]-[hash].js',
        // assetFileNames: '[ext]/[name]-[hash].[ext]',

        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (chunkInfo) => {
          let outDir = '';

          // Fonts
          if (/(ttf|woff|woff2|eot)$/.test(chunkInfo.name)) {
            outDir = 'fonts';
          }

          // SVG
          if (/svg$/.test(chunkInfo.name)) {
            outDir = 'svg';
          }

          // Images
          if (/(png|jpg|jpeg|gif|webp)$/.test(chunkInfo.name)) {
            outDir = 'images';
          }

          // Media
          if (/(mp3|mp4|webm|ogg|wav|flac|aac)$/.test(chunkInfo.name)) {
            outDir += 'media';
          }

          // JSON
          if (/json$/.test(chunkInfo.name)) {
            outDir = 'json';
          }

          // JS
          if (/js$/.test(chunkInfo.name)) {
            outDir = 'js';
          }

          // CSS
          if (/css$/.test(chunkInfo.name)) {
            outDir = 'css';
          }

          return `${outDir}/[name][extname]`;
        },
      }
    }
  },
  
  // Development server configuration
  server: {
    // Ensure Vite's dev server doesn't conflict with Express
    cors: true,
    port: 5173,
    strictPort: true,
    
    // Configure HMR to work with Express
    hmr: {
      protocol: 'ws',
      port: 5173,
    }
  }
});