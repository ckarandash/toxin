import path from 'path';
import PugPlugin from 'pug-plugin';

const buildPlugins = () => {
  const plugins = [
    new PugPlugin({
      entry: {
        index: path.resolve(__dirname, '../../index.pug'),
      },
      pretty: true,
      js: { filename: '[name].[contenthash:8].js' },
      css: { filename: '[name].[contenthash:8].css' },
    }),
  ];

  return plugins;
};

export default buildPlugins;
