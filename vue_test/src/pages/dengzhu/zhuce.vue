<template>
  <div id="background">
    <p>注册系统</p>

    <div class="xinxi">
      <span>账号: </span>
      <input type="text" v-model="user" @keyup="jiance">  
    </div> 
      <p id="usertop" v-show="userJian"><span>该账号已被注册</span></p>
    <div class="xinxi">
      <span>密码: </span>
      <input type="password" v-model="password">
    </div>

    <div class="xinxi">
      <span>姓名: </span>
      <input type="text" v-model="name">
    </div>
    <button @click="zhuce">确认注册</button>
    <router-link id="zhuce" to="/register">返回登录</router-link>
    <br><br>
    密码需大于等于六位数<br>
    账号和姓名不做限制 但不能为空
  </div>
</template>

<script>
import axios from 'axios'
export default {
 name:'Register',
 data() {
  return {
    user:'',
    password:'',
    name:'',
    userJian:false,
  };
 },
 methods:{
  //注册事件
  zhuce(){
    if(this.password.length<6) return alert('密码请大于六位');
    if(this.userJian||this.user=="") return alert('该用户名已经被注册或用户名为空');
    if(this.name=="") return alert('姓名不能为空')
    //发送axios请求
    axios({
      url:'http://127.0.0.1:5000/zhuce',
      method:'post',
      data:{user:this.user,password:this.password,name:this.name}
    }).then(
        response =>{
          if(response.data)
            alert('注册成功')
          else{
            alert('注册失败')
          }
        },
    )

  },
  //账号重复检测
  jiance(event){
    axios({
      url:'http://127.0.0.1:5000/UserJian',
      method:'post',
      data:{user:event.target.value}
    }).then(
      response=>{
        this.userJian=!response.data
      }
    )
  },

 }
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
    margin-top: 70px;
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

  #usertop>span{
    top: 160px;
    left: 400px;
    position:absolute;
    color: red;
    font-size: 12px;
  }
</style>