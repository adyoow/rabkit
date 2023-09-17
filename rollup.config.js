import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'

let envPlugins = []
if (isProd) {
  envPlugins = [terser(), filesize()]
} else {
  envPlugins = [
    livereload(),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: './'
    })
  ]
}

export default {
  input: './packages/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'rabkit'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    ...envPlugins
  ]
}
