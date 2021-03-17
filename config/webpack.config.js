const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = '../../wwwroot';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  const deploymentTarget = process.env.deploymentTarget || (env && env.deploymentTarget);

  return [{
    stats: { modules: false },
    context: __dirname,
    resolve: { extensions: ['.js'] },
    entry: {
      'topbar': '../src/build-entries/topbar.js',
      'literature': '../src/build-entries/literature.js',
      'widgets-signout': '../src/build-entries/widgets-signout.js',
      'week-calendar': '../src/build-entries/calendar-week.js',
      'month-calendar': '../src/build-entries/calendar-month.js',
      'newsfeed': '../src/build-entries/newsfeed.js',
      'tvguide': '../src/build-entries/tvguide.js',
      'private-ical': '../src/build-entries/private-ical.js',
      'search': '../src/build-entries/search.js',
      'birthday': '../src/build-entries/birthday.js',
      'ssf': '../src/build-entries/ssf.js',
    },
    module: {
      rules: [
        { test: /\.vue$/, include: path.join(__dirname, '../'), loader: 'vue-loader' },
        {
          test: /\.(js)$/,
          include: path.join(__dirname, '../'),
          loader: 'babel-loader'
        },
        { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({ use: 'css-loader?minimize' }) },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, include: path.join(__dirname, '../'), use: 'url-loader?limit=25000' }
      ]
    },
    output: {
      path: path.join(__dirname, bundleOutputDir),
      publicPath: '/scripts/',
      filename: './scripts/[name].js',
    },
    plugins: [
      new CheckerPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production'),
          deploymentTarget: JSON.stringify(deploymentTarget)
        }
      }),
      new CopyWebpackPlugin([
        { from: '../src/assets/', to: 'assets' }
      ])
    ].concat(isDevBuild ? [
      // Plugins that apply in development builds only
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map', // Remove this line if you prefer inline source maps
        moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
      })
    ] : [
      // Plugins that apply in production builds only
      new UglifyJSPlugin(),
      new ExtractTextPlugin('./styles/widgets.css')
    ])
  }];
};