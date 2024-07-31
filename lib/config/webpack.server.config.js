const getProxyConfig = require('./getProxyConfig');

const DEV_DIST_DIR = '/dist/';

module.exports = (paths, options = {}) => {
  const devType = options.devType;
  const appHtml = paths.appHtml.replace(/\\/g, '/').split('/');
  if (appHtml[1] === 'mnt') {
    appHtml[1] = '';
    appHtml[2] = appHtml[2].toUpperCase() + ':/';
    appHtml.splice(0, 2)
  }
  const historyApiFallbackIndex = appHtml.join('/');
  const proxyConfig = getProxyConfig();
  return {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appDirectory,
    hot: true,
    hotOnly: true,
    inline: true,
    publicPath: paths.devDistDir || DEV_DIST_DIR,
    quiet: true,
    historyApiFallback: {
      index: historyApiFallbackIndex,
    },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 600,
    },
    proxy: proxyConfig ? proxyConfig : {}, // 代理
    before(app) {
      // user.before(app);
      app.use((req, res, next) => {
        // your custom code to check for any exceptions
        if (devType === 'project') {
          if (['/', appHtml[appHtml.length - 1]].includes(req.url)) {
            req.url = DEV_DIST_DIR;
          }
        }
        next();
      });
    },
  };
};
