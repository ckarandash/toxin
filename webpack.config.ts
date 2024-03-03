import path from 'path';
import webpack from 'webpack';
import type { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import PugPlugin from 'pug-plugin';

const buildConfig = () => {
  const config: webpack.Configuration = {
    mode: 'development',
    entry: {
      index: './index.pug',
    },

    output: {
      path: path.resolve('build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
        },
      ],
    },

    plugins: [
      new PugPlugin({
        pretty: true,
        js: { filename: '[name].[contenthash:8].js' },
      }),
    ],

    devServer: {
      port: 8000,
      open: true,
      hot: true,
    } as WebpackDevServerConfig,

    resolve: {
      extensions: ['.ts', '.js'],
    },
  };

  return config;
};

export default buildConfig;
