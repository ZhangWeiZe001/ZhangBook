<!-- 左侧导航条 -->
<template>
  <div class="leftMenu">
    <div class="top">
        <i class="fas fa-bell"></i>
        图书系统
    </div>

    <!-- 馆内信息 -->
    <template>
      <a class="bookMessage" href="javascript:;" @click="bookMessage">
      <i :class="arrows.xinxi"></i>
      馆内信息
      </a>
      <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__slideInLeft"
      leave-active-class="animate__slideOutLeft"
      >
       <div
       class="pullDown" v-show="pullDown.xinxi">
        <router-link to="/jieshao">图书馆介绍</router-link>
        <router-link to="/shouze">图书馆守则</router-link>
        <router-link to="/wuomen">关于我们</router-link>
       </div> 
      </transition> 
    </template>

    <!-- 书籍浏览 -->
    <template>
      <a class="bookMessage" href="javascript:;" @click="lookBook">
      <i :class="arrows.kanshu"></i>
      书籍浏览
      </a>
      <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__slideInLeft"
      leave-active-class="animate__slideOutLeft"
      >
       <div
       class="pullDown" v-show="pullDown.kanshu">
        <router-link to="/jingdian">经典文学</router-link>
        <router-link to="/kexue">科学文献</router-link>
        <router-link to="/xiaoshui">小说奇谈</router-link>
       </div> 
      </transition> 
    </template>
    
    <!-- 借还图书 -->
    <template>
      <a class="bookMessage" href="javascript:;" @click="jiehuan">
      <i :class="arrows.jiehuan"></i>
      借还图书
      </a>
      <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__slideInLeft"
      leave-active-class="animate__slideOutLeft"
      >
       <div
       class="pullDown" v-show="pullDown.jiehuan">
        <router-link to="/jieshu">借阅图书</router-link>
        <router-link to="/huanshu">归还图书</router-link>
       </div> 
      </transition> 
    </template>

    <!-- 个人信息 -->
    <template>
      <a class="bookMessage" href="javascript:;" @click="geren">
      <i :class="arrows.geren"></i>
      个人信息
      </a>
      <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__slideInLeft"
      leave-active-class="animate__slideOutLeft"
      >
       <div
       class="pullDown" v-show="pullDown.geren">
          <router-link to="/geren">我的信息</router-link>
       </div> 
      </transition> 
    </template>
  </div>

  
</template>

<script>
import 'animate.css'
export default {
 name:'leftMenu',
 data() {
  return {
    pullDown:{
      xinxi:false,
      kanshu:false,
      jiehuan:false,
      geren:false,
    },
    arrows:{
      xinxi:'fas fa-angle-down',
      kanshu:'fas fa-angle-down',
      jiehuan:'fas fa-angle-down',
      geren:'fas fa-angle-down',
    }
  };
 },
 methods:{
  //点击馆内信息触发
  bookMessage(){
    //点击时 将下拉列表唤出
    this.pullDown.xinxi=!this.pullDown.xinxi

    //点击时 修改箭头朝向
    if(this.arrows.xinxi ==='fas fa-angle-down'){
      this.arrows.xinxi = 'fas fa-angle-up'
    }else{
       this.arrows.xinxi = 'fas fa-angle-down'
    }
  },
  //点击书籍浏览时触发
  lookBook(){
    //点击时 将下拉列表唤出
    this.pullDown.kanshu=!this.pullDown.kanshu

    //点击时 修改箭头朝向
    if(this.arrows.kanshu ==='fas fa-angle-down'){
      this.arrows.kanshu = 'fas fa-angle-up'
    }else{
       this.arrows.kanshu = 'fas fa-angle-down'
    }
  },
  //点击借还图书时触发
  jiehuan(){
    //点击时 将下拉列表唤出
    this.pullDown.jiehuan=!this.pullDown.jiehuan

    //点击时 修改箭头朝向
    if(this.arrows.jiehuan ==='fas fa-angle-down'){
      this.arrows.jiehuan = 'fas fa-angle-up'
    }else{
       this.arrows.jiehuan = 'fas fa-angle-down'
    }
  },
  //点击个人信息时触发
  geren(){
    //点击时 将下拉列表唤出
    this.pullDown.geren=!this.pullDown.geren

    //点击时 修改箭头朝向
    if(this.arrows.geren ==='fas fa-angle-down'){
      this.arrows.geren = 'fas fa-angle-up'
    }else{
       this.arrows.geren = 'fas fa-angle-down'
    }
  },
 }
}
</script>

<style scoped>
.leftMenu{
  width: 10%;
  height: 711px;
  float: left;
  background-color: rgb(50, 50, 50);
  text-align: center;
  color: white;
}
.top{
  line-height: 60px;
  font-size: 20px;
}
.leftMenu>a{
  line-height: 60px;
  font-size: 20px;
  color:white;
  display: block;
}
.pullDown>a{
  display: block;
 color:white;
 line-height: 40px;
 background-color: rgb(130, 130, 130);
}

</style>