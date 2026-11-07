import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as esbuild from 'esbuild';

function treatJsAsJsx() {
  return {
    name: 'treat-js-files-as-jsx',
    async transform(code, id) {
      if (!id.includes('/src/') || !id.endsWith('.js')) {
        return null;
      }
      const result = await esbuild.transform(code, {
        loader: 'jsx',
        jsx: 'automatic',
        sourcemap: true,
      });
      return { code: result.code, map: result.map };
    },
  };
}

export default defineConfig({
    plugins: [treatJsAsJsx(), react()],
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
    },
});
