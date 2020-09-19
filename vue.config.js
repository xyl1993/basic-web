// vue.config.js
var path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  
  configureWebpack: {
    module: {
      // noParse: /(element-ui\.js)/,
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到//cheap-module-eval-source-map
    // devtool: 'eval', //开发环境cheap-module-eval-source-map
    externals: {
      jquery: "jQuery", //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
      // vue: "Vue",
      // "element-ui": "ELEMENT",
    },
    resolve: {
      extensions: [".js", ".css", ".vue", ".json"],
      // 别名，可以直接使用别名来代表设定的路径以及其他
      alias: {
        "@": resolve("src"),
      },
    },
    devServer: {
      proxy: {
        '/api/*': {
          target: 'http://localhost:18080/',
          pathRewrite: {
            '^/api': '/'
          }
        },
        '/hopApi/*': {
          target: 'http://101.132.146.9/',
          pathRewrite: {
            '^/hopApi': '/hopApi'
          }
        }
      }
    },
  },
};
