import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  format: ['esm', 'cjs'], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: 'terser',
});
