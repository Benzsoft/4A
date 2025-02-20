import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@mistralai/mistralai'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
          auth: ['@supabase/auth-ui-react', '@supabase/auth-ui-shared', '@supabase/supabase-js'],
        },
      },
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});