<template>
<div>
  <h1 v-if="!xinxi[0]">您目前没有借阅图书快去借阅一本吧~</h1>
  <div v-else>
   <h1>借书信息</h1> 
   <table>
    <!-- 头部 -->
     <tr>
       <td>借书号</td>
       <td>书籍编号</td>
       <td>账号</td>
       <td>书名</td>
       <td>借书日期</td>
       <td>还书日期</td>
     </tr>
     <!-- 内容区-->
     <tr v-for="xinxi in xinxi" :key="xinxi.JieShuHao" @click="dian(xinxi.JieShuHao)">
       <td>{{xinxi.JieShuHao}}</td>
       <td>{{xinxi.id}}</td>
       <td>{{xinxi.user}}</td>
       <td>《{{xinxi.bookName}}》</td>
       <td>{{xinxi.jieDate}}</td>
       <td>{{xinxi.huanDate}}</td>
     </tr>
   </table>
   <div id="huan">   
    请输入借书号:<input type="text" v-model="hao"> <button @click="huan">确认归还</button>
   </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name:'HuanShu',
  data() {
    return {
      xinxi:[],
      hao:'',  
    };
  },
  methods: {
    //获取用户借书信息
    borrowBook(){
      let user = localStorage.getItem('user');;
      axios({
        url:'http://127.0.0.1:5000/huanshuxin',
        method:'post',
        data:{user},
      }).then(value=>{
        this.xinxi = value.data;
      })
    },
    //点击表格 将该行对应的 借书号打印到下面的 输入框中
    dian(hao){
      this.hao = hao;
    },
    //还书
    huan(){
       axios({
        url:'http://127.0.0.1:5000/huanshu',
        method:'post',
        data:{hao:this.hao},
      }).then(value=>{
        if(value.data.padding){
            let xinxi =value.data.xinxi;
            //获取当前时间戳
            let date =new Date();
            let xian = date.getTime()
            //获取还书日期的时间戳
            let huan = new Date(xinxi.huanDate).getTime();
            if(xian<huan){
             alert(`${xinxi.bookName} 归还成功`);
            }else{
             alert(`还书超时了\n${xinxi.bookName} 归还成功`)
            }
            //刷新表格信息
            this.borrowBook()
        }else{
            alert(`归还失败 原因:${value.data.err}`)
        }
      })
    }
  },
  mounted() {
    //确保用户登录
    let padding = localStorage.getItem('padding');
    if(padding !='true') { 
      alert('请先登录')
      this.$router.push({
	    name:'shouye',
      })
    } 

    this.borrowBook();
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

  #huan{
    font-size:16px;
    margin-top: 15px;
    text-align: center;
  }
  input[type='text']{
    border: 1px black solid;
  }
</style>