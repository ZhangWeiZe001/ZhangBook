//Vuex

//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {

}
//准备mutations对象——修改state中的数据
const mutations = {
  //登录使用
  DENGLU(state,value){
	state.padding= true;
	state.user = value;
  },
  TUICHU(state,value){
    state.padding= false;
	state.user = '未登录';
  }
}
//准备state对象——保存具体的数据
const state = {
  //用户的登录状态 与 账号
  padding:false,
  user:'未登录',  
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})