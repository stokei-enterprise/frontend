import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import styles from 'rollup-plugin-styles'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

// Array of extensions to be handled by babel
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx']

// Excluded dependencies - dev dependencies
const EXTERNAL = Object.keys(pkg.devDependencies)

export default {
  input: ['src/index.tsx'], // What files we build?
  output: [
    {
      dir: 'dist', // Directory where rollup.js will put the built files
      format: 'esm', // ES Modules
      sourcemap: true,
      preserveModules: true, // This one is important for treeshaking features of our library
      preserveModulesRoot: 'src',
      assetFileNames: '[name]-[hash][extname]'
    }
  ],
  plugins: [
    peerDepsExternal(), // https://rollupjs.org/guide/en/#peer-dependencies
    resolve(), // Resolves node modules
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: ['**/*.stories.*']
      }
    }),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true
    }),
    babel({
      extensions: EXTENSIONS, // Compile our TypeScript files
      babelHelpers: 'inline', // Place babel helper functions in the same file they were used
      include: EXTENSIONS.map((ext) => `src/**/*${ext}`)
    }),
    styles({
      modules: true,
      autoModules: true
    }),
    terser()
  ],
  external: EXTERNAL // https://rollupjs.org/guide/en/#peer-dependencies
}
