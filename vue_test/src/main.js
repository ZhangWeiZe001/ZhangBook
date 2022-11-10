/* 
该文件时整个项目的入口文件 
*/
//引入 Vue 
import Vue from 'vue'
//引入 App组件 它是所有组件的父组件
import App from './App.vue'
//关闭vue的生成提示
Vue.config.productionTip = false;

//引入路由模块 
import VueRouter from 'vue-router'
//应用路由插件
Vue.use(VueRouter);
//引入路由器
import router from './router/index';

//应用vuex插件
import Vuex from 'vuex';
//引入Vuex
import store from './store/index'
//使用vuex插件
Vue.use(Vuex);

//引入图标字体库
import '@/assets/iconfont/css/all.css'
//创建 Vue 实例对象 ---vm
new Vue({
  el:'#App',
  render: (h) => {return  h(App)},
  router:router,
  store, //配置store
  beforeCreate(){
    Vue.prototype.$bus = this; //安装全局事件总线
  }
})
