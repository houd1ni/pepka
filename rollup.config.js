import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'

export default {
  input: process.env.NODE_ENV=='development' ? 'test/in-browser.ts' : 'src/index.ts',
  output: {
    file: process.env.BUILD == 'cjs' ? 'dist/bundle.js' : 'dist/bundle.dev.js',
    format: process.env.BUILD == 'cjs' ? 'cjs' : 'es',
    exports: 'named',
    name: 'pepka'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      typescript: require("typescript"),
      tsconfig: "./tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: false,
          inlineSourceMap: process.env.NODE_ENV=='development',
          module: 'esnext'
        }
      }
    }),
    process.env.NODE_ENV!='development' && terser(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}