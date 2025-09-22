import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Ensure environment variables are available
      'import.meta.env.DEV': mode === 'development',
      'import.meta.env.PROD': mode === 'production',
      'import.meta.env.MODE': JSON.stringify(mode),
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    build: {
      target: 'es2020',
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['lucide-react'],
            query: ['@tanstack/react-query'],
            utils: ['axios'],
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      sourcemap: mode === 'development',
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=31536000',
      },
    },
  };
});
