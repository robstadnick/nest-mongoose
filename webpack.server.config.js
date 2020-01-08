const webpack = require('webpack');
const WebpackConfigFactory = require('@nestjs/ng-universal')
  .WebpackConfigFactory;
const nodeExternals = require('webpack-node-externals');

/**
 * In fact, passing following configuration to the WebpackConfigFactory is not required
 * default options object returned from this method has equivalent entries defined by default.
 *
 * Example: WebpackConfigFactory.create(webpack);
 */
const webpackOptions = WebpackConfigFactory.create(webpack, {
  // This is our Nest server for Dynamic universal
  server: './server/main.ts',
});

const whitelistedPackages = /^(?!(livereload|concurrently|mongoose)).*/;
webpackOptions.externals[1] = nodeExternals({
  whitelist: whitelistedPackages,
});

webpackOptions.plugins.push(
  new webpack.IgnorePlugin({
    checkResource(resource) {
      const lazyImports = [
        '@nestjs/microservices',
        'cache-manager',
        'class-validator',
        'class-transformer',
      ];
      if (!lazyImports.includes(resource)) {
        return false;
      }
      try {
        require.resolve(resource);
      } catch (err) {
        return true;
      }
      return false;
    },
  }),
);

module.exports = webpackOptions;