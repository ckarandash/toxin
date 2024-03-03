import type { Configuration } from 'webpack-dev-server';

const buildDevServer = (): Configuration => ({
  port: 8000,
  open: true,
  hot: true,
});

export default buildDevServer;
