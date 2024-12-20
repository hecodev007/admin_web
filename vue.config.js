const getIp = () => {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
};
module.exports = {
  // 选项...
  outputDir: "build",

  assetsDir: "static",

  productionSourceMap: false,

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

   // 配置axios的代理请求
   devServer: {
       open: true, // 自动启动浏览器
       host: 'localhost',
       // port: 8081,
       hot: true, // hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
       https: false,
       hotOnly: false,
       // proxy: null,
       proxy: process.env.NODE_ENV === 'development' ? {
           '/api': {
               target: 'http://172.20.4.100:40706/', // 目标接口域名
               // target: 'http://127.0.0.1:40706/', // 目标接口域名
               ws: true,
               changeOrigin: true,
               cookieDomainRewrite: "127.0.0.1",
               secure: false,
               headers: {
                 "x-forwarded-host": "127.0.0.1"
               },
               pathRewrite: {
                   '^/api': '/api' // 重写,
               }
           }
       } : null,
       before: app => {}
   },

  lintOnSave: undefined
};
