import path from 'path';
import webpack from 'webpack';
import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';

const buildConfig = () => {
  const config: webpack.Configuration = {
    entry: './index.js',
    mode: 'development',
    output: {
      path: path.resolve('build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: 'ts-loader',
        },
      ],
    },
    devServer: {
      port: 8000,
      open: true,
      hot: true,
    },
  };

  return config;
};

export default buildConfig;
