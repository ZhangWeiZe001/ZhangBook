<template>
  <div id="background">
    <p>登录系统</p>

    <div class="xinxi">
      <span>账号: </span>
      <input type="text" v-model="user">  
    </div> 

    <div class="xinxi">
      <span>密码: </span>
      <input type="password" v-model="password">
    </div>
    <button @click="denglu">登录</button>
    <router-link id="zhuce" to="/zhuce">注册</router-link>
    <router-link id="tuichu" to="/">退出</router-link>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
 name:'Register',
 data() {
  return {
    user:'',
    password:'',
  };
 },
 methods: {
  denglu(){
    axios({
      url:'http://127.0.0.1:5000/denglu',
      method:'post',
      data:{user:this.user,password:this.password}
    }).then(
      (response)=>{
        if(response.data){
          //修改登录状态
          this.$store.commit('DENGLU',this.user);
          //将信息存入本地浏览器
          localStorage.setItem('user',this.user);
          localStorage.setItem('padding',true);
          alert('登录成功');
          //编程式路由 切换至主页面
          this.$router.push({
            name:'shouye',
          })
        }else alert('登录失败 账号或密码错误')
      }
    )
  }
 },
}
</script>

<style scoped>
 #background{
   position:absolute;
   left: 450px;
   top: 130px;
   height: 500px;
   width: 700px;
   background-color:rgba(85, 193, 255, 0.4);
   border: 3px rgba(255, 255, 255, 0.3) solid;
 }
 #background>p{
   text-align: center;
   font-size: 40px;
 }

 .xinxi{
    text-align: center;
    margin-top: 90px;
 }
 .xinxi>span{
    font-size: 20px;
 }
 .xinxi>input{
    font-size: 20px;
    border:2px black solid;
     box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3)
 }

 #background>button{
   display: block;
   margin: 0 auto;
   margin-top: 50px;
   width: 200px;
   background-color:rgba(48, 111, 199, 0.8) ;
    /* 设置一个圆角按钮 */
    border-radius:10px 10px ;   
 }

  #zhuce{
    margin-right:250px ;
    margin-top: 15px;
    float: right;
    color:blue;
  }
  #tuichu{
    margin-right:130px ;
    margin-top: 15px;
    float: right;
    color:blue;
  }
</style>