declare module 'pug-plugin' {
  import type { WebpackPluginInstance } from 'webpack';

  type PugPluginOptions = Partial<{
    pretty: boolean,
    js: { filename: string },
    css: { filename: string }
  }>;

  const PugPlugin: {
    new(options?: PugPluginOptions): WebpackPluginInstance,
    loader: string,
  };

  export default PugPlugin;
}
