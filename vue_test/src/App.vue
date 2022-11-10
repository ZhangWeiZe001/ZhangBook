<template>
  <div>
    <home></home>
  </div> 
</template>

<script>
 import home from './components/home.vue'
 export default {
    name:'App', 
    components:{home},
    mounted() {
      //当浏览器本地储存了用户信息时自动登录 
      //读取用户登录状态
      let padding = localStorage.getItem('padding');
      if(padding =='true'){
        let user = localStorage.getItem('user');
        this.$store.commit('DENGLU',user); //调用 vuex 的登录方法
      }
    },  
 }
 
</script>
 

<style scoped>
 
</style>