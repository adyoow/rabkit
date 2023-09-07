const path  = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const outputType = process.env.OUTPUT_TYPE // 读取当前的输出格式（UMD/ESM）

const getEntry = () => {
  // 打包输出 ESM 格式文件，最终要输出多个文件，便于实现按需加载，因此设置为多入口。
  return './src/index.js'
}
const getOutput = () => {
  return {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      name: 'calc',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'globalThis',
    clean: true
  }
}

const config = {
  mode: isProduction ? 'production' : 'development',

  entry: getEntry(),

  // 针对不同的环境变量，执行不同的打包动作。
  output: getOutput(),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']]
            }
          },
          { loader: 'ts-loader' }
        ]
      }
    ]
  },
  plugins: []
}

module.exports = config
