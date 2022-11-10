<!-- 上部菜单 -->
<template>
  <div class="top">
      <div class="top-left">
        
        <span>张氏图书</span> 
      </div>

      <div class="top-right">
        <span v-if="true" id="hi">账号:{{user}}</span>
        <router-link to="/register" title="登录">
          <img src="./igm/wei.png" alt="">
        </router-link>
        <a href="javascript:;" id="tui" v-if="padding" @click="tui">退出登录</a>
      </div>
  </div>
</template>

<script>
export default {
  name:'top',
  computed:{
    user(){
      return this.$store.state.user;
    },
    padding(){
      return this.$store.state.padding;
    }
  },
  data() {
    return {
      a:0,
    }
  },
  methods: {
    tui(){
      localStorage.clear();//清除信息
      //调用Vuex 的退出方法
      this.$store.commit('TUICHU');
      //跳转至首页
      this.$router.push({
	    name:'shouye',
      })
    }
  },
}
</script>

<style scoped>
 .top{
    width: 90%;
    height: 60px;
    background-color:#55AA00 ;
    float:right;
    border-bottom: 3px black solid;
 }
 .top-left{
    float:left;
 }
 .top-left span{
  line-height: 60px;
  font-size: 30px;
  color: white;
  margin-left: 15px;
  text-shadow:1px 1px 0px #0396FF;
 }
 .top-right{
    float:right;
 }
 .top img{
    width: 50px;
    height: 50px;
    background-color:silver;
    float:right;
    margin: 5px 30px 0px 0px;
    border-radius:50%
 }
 
 #hi{
   line-height: 80px;
   margin-right: 20px;
   color:blue;
 }

 #tui{
  margin-right: 10px;
  color: rgb(103, 69, 5);
 }
</style>