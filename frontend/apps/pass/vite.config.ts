/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  test: {
    passWithNoTests: true,
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
  },
});
