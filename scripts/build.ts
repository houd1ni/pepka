import esbuild from 'esbuild'

const mode = (process.argv[2] ?? 'esm') as 'dev' | 'esm' | 'cjs'
const is_dev = mode === 'dev'
const outfile = is_dev ? 'dist/bundle.dev.js' : mode === 'cjs' ? 'dist/bundle.cjs' : 'dist/bundle.mjs'

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: is_dev || mode === 'esm' ? 'esm' : 'cjs',
  target: 'esnext',
  sourcemap: is_dev,
  outfile
})