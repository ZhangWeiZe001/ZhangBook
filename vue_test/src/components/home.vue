<template>
  <div>
    <top></top>
    <!-- 左侧导航栏 -->
    <left-menu></left-menu>
    <!-- 背景 -->
    <div id="bei">
      <router-view></router-view>
    </div>
    
    
  </div>
</template>

<script>
import top from './top.vue';
import leftMenu from './leftMenu.vue';
//引入组件
export default {
  name:'Home',
  components:{top,leftMenu}
}
</script>

<style>
 #bei{
  float: left;
  width: 90%;
  height: 651px;
  background: rgb(219, 219, 219);
 }
</style>