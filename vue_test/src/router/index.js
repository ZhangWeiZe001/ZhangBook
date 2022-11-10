//该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router';

//馆内信息路由组件
import bookJieShao from '../pages/guanneixinxi/bookjieshao.vue'
import ShouZe from '../pages/guanneixinxi/shouze.vue'
import WuoMen from '../pages/guanneixinxi/wuomen.vue'
//引入路由组件
import Register from '../pages/dengzhu/register.vue';
import ZhuCe from '../pages/dengzhu/zhuce.vue';

//书籍浏览路由组件
import JingDian from '../pages/bookLook/jingdian.vue';
import KeXue from '../pages/bookLook/kexue.vue';
import XiaoShui from '../pages/bookLook/xiaoshui.vue';

//借还图书路由组件
import JieShu from '../pages/jiehuanbook/jieBook.vue';
import HuanShu from '../pages/jiehuanbook/huanBook.vue';

//个人信息路由组件
import GeRen from '../pages/geren/geren.vue'

//创建并暴露一个路由器
const router = new VueRouter({
  // mode:'history',
  routes:[
    {
      name:'home',
      path:'',
 
    },
    //登录路由
    {
      name:'register',
      path:'/register',
      component:Register,
    },
    //注册路由组件
    {
      path:'/zhuce',
      component:ZhuCe
    },
    //书籍浏览>经典文学
    {
      path:'/jingdian',
      component:JingDian,
    },
    //书籍浏览>科学文献
    {
      path:'/kexue',
      component:KeXue,
    },
    //书籍浏览>小说奇谈
    {
      path:'/xiaoshui',
      component:XiaoShui
    },
    //借还图书>借阅图书
    {
      path:'/jieshu',
      component:JieShu
    },
    //借还图书>归还图书
    {
      path:'/huanshu',
      component:HuanShu
    },
    //馆内信息>图书馆介绍
    {
      name:'shouye',
      path:'/jieshao',
      component:bookJieShao
    },
    //馆内信息>图书馆守则
    {
      path:'/shouze',
      component:ShouZe,
    },
    //馆内信息>关于我们
    {
      path:'/wuomen',
      component:WuoMen
    },
    //个人信息>个人信息
    {
      path:'/geren',
      component:GeRen
    }
  ]
})

export default router;