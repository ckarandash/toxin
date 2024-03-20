import path from 'path';
import webpack from 'webpack';
import buildLoaders from './config/build/buildLoaders';
import buildPlugins from './config/build/buildPlugins';
import buildDevServer from './config/build/buildDevServer';

const buildConfig = () => {
  const config: webpack.Configuration = {
    mode: 'development',
    // entry: {
    //   index: './index.pug',
    // },

    output: {
      path: path.resolve('build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },

    module: {
      rules: buildLoaders(),
    },

    plugins: buildPlugins(),

    devServer: buildDevServer(),

    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@sass': path.resolve('src', 'sass'),
        '@components': path.resolve('src', 'components'),
      },
    },
  };

  return config;
};

export default buildConfig;
