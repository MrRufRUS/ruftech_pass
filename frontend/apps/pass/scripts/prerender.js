import { resolve } from 'node:path';
import { prerender } from '@ruftech/ssg';

const distDir = resolve(import.meta.dirname, '..', 'dist');
const serverEntry = resolve(distDir, 'server', 'entry-server.js');

await prerender({
  routes: ['/'],
  distDir,
  serverEntry,
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
});
