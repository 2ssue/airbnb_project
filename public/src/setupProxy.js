const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/users', {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
  app.use(
    proxy('/resorts', {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
};
