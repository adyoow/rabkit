import path from 'path'
import { fileURLToPath } from 'url'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import filesize from 'rollup-plugin-filesize'
import alias from 'rollup-plugin-alias'
import pkg from './package.json'

// __filename包含当前模块文件的绝对路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathResolve = (p) => path.resolve(__dirname, p)

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
    alias({
      resolve: ['.jsx', '.js', 'json'], // 可选，默认情况下这只会查找 .js 文件或文件夹
      entries: {
        '@packages': pathResolve('packages'),
        _: __dirname
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    ...envPlugins
  ]
}
