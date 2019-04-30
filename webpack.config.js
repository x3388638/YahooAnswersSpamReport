module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'YahooAnswersSpamReport.user.js',
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 'minify'],
            comments: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
};
