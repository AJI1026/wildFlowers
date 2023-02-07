const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验
  lintOnSave: false,

  // 解决跨域问题
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 8080, // 用来修改打开后的端口号
  //   open: true,
  //   proxy: {
  //     '/api' : {
  //       target: 'http://wildflowers.ltd:3000/admin', // 跨域请求的公共地址
  //       ws:false,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api':''
  //       }
  //     }
  //   }
  // }
})
