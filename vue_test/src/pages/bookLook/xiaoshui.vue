<template>
  <div>
   <h1>小说奇谈</h1> 
   <table>
    <!-- 头部 -->
     <tr>
       <td>书籍编号</td>
       <td>书籍名称</td>
       <td>书籍价格</td>
       <td>出版社名</td>
       <td>最大数量</td>
       <td>当前数量</td>
     </tr>
     <!-- 内容区-->
     <tr v-for="book in book[ye-1]" :key="book.BianHao">
       <td>{{book.BianHao}}</td>
       <td>《{{book.ShuMing}}》</td>
       <td>{{book.JiaGe}}元</td>
       <td>{{book.ChuBanShe}}</td>
       <td>{{book.maxShu}}本</td>
       <td>{{book.DangShu}}本</td>
     </tr>
   </table>

   <div id="yeshu">
     <button @click="up">上一页</button>
     当前页{{ye}} /最大页 {{book.length}}
     <button @click="dwon">下一页</button>
   </div>
  </div>
</template>

<script>
import axios from 'axios';
//数组数据
let book = [];

axios({
  url:'http://127.0.0.1:5000/xiaoshui',
  method:'get',
}).then(
  value =>{
    for(var i=0;i<=value.data.length/10;i++){
      //每次当多10个书籍信息的时候多在元素最后创建一个新的 二维数组
      book.push([]);   
      for(var j=0;j<=9;j++){
        //当 数据不为未定义时 再赋值给book
        if(value.data[i*10+j] != undefined){    
        book[i][j] = value.data[i*10+j]
      }
    }
  }
  },
  reason =>{
    console.log('出错了',reason.message);
  }
)

export default {
  name:'XiaoShui',
  data() {
    return {
      book:book,
      ye:1,
    };
  },
  
  methods:{
    up(){
      if(this.ye > 1){
        this.ye--
      }
    },
    dwon(){
       if(this.ye < this.book.length){
        this.ye++
      }
    }
  },
 
}
</script>

<style scoped>
  h1{
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  table{
    width: 70%;
    border: 1px solid black;
    border-collapse: collapse;
    margin :0 auto;
     box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3)
  }

  td{
    border: 1px solid black;
    height: 40px;
    vertical-align: middle; /*将 td 中的元素放置在正下*/
    text-align: center; /*将 字置于中间*/
  }

  tr:nth-child(odd){
    background-color: #bfc;
  }
  
  tr:nth-child(2n){
    background: bisque;
  }

  #yeshu{
    margin-top: 15px;
    text-align: center;
  }
</style>