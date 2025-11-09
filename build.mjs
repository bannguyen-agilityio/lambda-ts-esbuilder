/**
 * Lambda build script using esbuild.
 *
 * This script:
 * - Bundles all TypeScript files in src/handlers/ as individual Lambda functions
 * - Excludes dependencies in node_modules (using node-externals)
 * - Produces optimized output for AWS Lambda Node.js 20
 * - Toggles behavior based on NODE_ENV (production vs development)
 */

import { build } from 'esbuild';
import glob from 'fast-glob';
import nodeExternals from 'esbuild-plugin-node-externals';

/**
 * Check if the current build is running in production mode.
 * This determines whether minification and sourcemaps are enabled.
 */
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Log the current environment mode to the console.
 */
console.log('Building in production mode:', isProduction);

/**
 * Find all TypeScript Lambda handler entry points inside src/handlers/.
 * Each file that matches the pattern becomes a separate Lambda function entry.
 */
const entryPoints = await glob('src/handlers/*.ts');

/**
 * Execute the esbuild process with configuration optimized for AWS Lambda.
 */
await build({
  // List of all input files to be bundled (one per Lambda handler)
  entryPoints,

  // Output directory where bundled files will be written
  outdir: 'dist',

  // Bundle all imports into a single output file per handler
  bundle: true,

  // Optimize the bundle for Node.js environment
  platform: 'node',

  // Target AWS Lambda Node.js 20 runtime for output compatibility
  target: 'node20',

  // Use CommonJS module format for Lambda compatibility
  format: 'cjs',

  // Generate source maps only in development mode
  sourcemap: !isProduction,

  // Minify output only in production builds to reduce file size
  minify: isProduction,

  // Automatically exclude node_modules dependencies (e.g., aws-sdk) from bundles
  plugins: [nodeExternals()],

  // Output naming pattern — each handler gets its own folder with an index.js file
  // Example: src/handlers/foo.ts → dist/handlers/foo/index.js
  entryNames: '[dir]/[name]/index',

  // Maintain directory structure relative to src/
  outbase: 'src',

  // Enable tree-shaking to remove unused code
  treeShaking: true,

  // Set logging level to 'info' to show build details and summaries
  logLevel: 'info',
});

/**
 * Notify that the build process has completed successfully.
 */
console.log('Build complete!');
