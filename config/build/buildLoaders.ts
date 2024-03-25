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
    {
      test: /\.(jpg|jpeg|png)$/,
      type: 'asset/resource',
    },
  ];

  return loaders;
};

export default buildLoaders;
