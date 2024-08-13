import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  format: ['cjs'], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: true,
});
