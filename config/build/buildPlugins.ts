import PugPlugin from 'pug-plugin';

const buildPlugins = () => {
  const plugins = [
    new PugPlugin({
      pretty: true,
      js: { filename: '[name].[contenthash:8].js' },
      css: { filename: '[name].[contenthash:8].css' },
    }),
  ];

  return plugins;
};

export default buildPlugins;
