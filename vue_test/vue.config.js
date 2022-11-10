module.exports = {
  pages: {
    index: {
      //设置入口
      entry: 'src/main.js',
    },
  },
  //关闭语法检查
  lintOnSave:false,
  //开启代理服务器 (方式一)
  // devServer: {
  //   proxy: 'http://localhost:8000'
  // }

  // //开启服务器代理 (方式二)
  // devServer: {
  //   proxy: {
      
  //     '/abc': { //请求前缀
  //       target: 'http://localhost:8000', //请求地址
  //       pathRewrite:{'^/abc':''}, //重写路径 '^/abc':'' 表示将/abc开头 变为空字符串 
  //       ws: true,  //用于支持 websocket 
  //       changeOrigin: true //用于控制请求头中的 host值(请求的来源)
  //     },
  //     '/xxx': { //请求前缀
  //       target: 'http://localhost:8001', //请求地址
  //       pathRewrite:{'^/xxx':''}, 
  //     },
  //   }
  // }
}