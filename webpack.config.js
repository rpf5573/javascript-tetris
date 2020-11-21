const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const join = require('path').join;

module.exports = {
  entry: join(__dirname, '/src/main.ts'),
  devtool: 'source-map',
  output: {
    filename: "main.js",
    path: join(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ 
          loader: 'file-loader',
          options: {
            context: join(__dirname, "src/"),
            outputPath: '/assets',
            // publicPath: '/dist',
            // useRelativePaths: true
          }
        }]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: join(__dirname, '/src/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.json', 'scss']
  }
};