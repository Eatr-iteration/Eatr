import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  entry: ['./Client/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: './dist',
    },
    proxy: {'/': 'http://localhost:3000/'},
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'Client/index.html'
    })
  ],
};

export default config;
