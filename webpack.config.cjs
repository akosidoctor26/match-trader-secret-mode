const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const path = require('path');
const manifest = require('./manifest.cjs');

module.exports = {
  target: 'web',
  entry: {
    contentScript: './src/app/content/index.ts',
    background: './src/app/background/index.ts',
    popup: './src/app/popup/PopupIndex.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/popup/popup.html',
      filename: 'popup.html',
      chunks: ['popup', 'contentScript', 'background'],
    }),
    new GenerateJsonPlugin('manifest.json', manifest),
  ],
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
  },
};
