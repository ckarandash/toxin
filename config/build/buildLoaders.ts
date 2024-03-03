import type { ModuleOptions } from 'webpack';
import PugPlugin from 'pug-plugin';

const buildLoaders = (): ModuleOptions['rules'] => {
  const loaders = [
    {
      test: /\.ts$/,
      use: 'ts-loader',
    },
    {
      test: /\.pug$/,
      loader: PugPlugin.loader,
    },
    {
      test: /\.(css|sass|scss)$/,
      use: ['css-loader', 'sass-loader'],
    },
  ];

  return loaders;
};

export default buildLoaders;
