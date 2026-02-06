/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({
    target: 'react',
    autoCodeSplitting: true
  }), react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/routeTree.gen.ts',
        'src/main.tsx',
        'src/entry-server.tsx',
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.test.{ts,tsx}',
      ],
      reporter: ['text', 'html', 'lcov', 'json'],
      reportsDirectory: './coverage',
      
    },
  }
});