<template>
  <div>
    <h1>借阅图书</h1>
    <div id="main">
      可借阅的书籍数量: {{bookshu}}/3
      <div>请输入需借阅的书编号: <input type="text" v-model="id"></div>  
      <div>请选择需要借阅的时间: 
       <select v-model.number="day">
        <option value="3">3天</option>
        <option value="7" selected="selected">7天</option>
        <option value="14">14天</option>
        <option value="30">30天</option>
       </select> 
      </div>
      <br>  
      <button @click="jie">提交</button>
      <br><br>
      <p id="tip0">编号首字母对应 <br><br>A:经典文学<br>B:科学文献<br>C:小说奇谈</p>
      <p id="tip1">请按时归还图书!</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'JieShu',
  data() {
    return {
        id:'',
        day:7,
        bookshu:0,
    };
  },
  methods: {
    //借阅图书
    jie(){
      //判断借阅数量是否超过上线
      if(this.bookshu>=3){return alert('超过了可借阅数量 请还书')}
      //制作借书时间 与 还书时间
      //借书时间
      let date = new Date();
      let jieDate = date.getFullYear() +'/'+ (date.getMonth()+1) +'/' +date.getDate();
      //还书时间
       //获取当前时间戳
      let a = date.getTime()
       //获取借阅的毫秒数
      let mill = this.day*24*60*60*1000
       //使用时间戳转日期 计算出还书的日期
      date = new Date(a + mill).toLocaleString()
       //获取 年月日
      let huanDate = date.toString().split(' ')[0];
    
      //用户编号
      let user = localStorage.getItem('user');
      axios({
        url:'http://127.0.0.1:5000/jieshu',
        method:'post',
        data:{id:this.id,jieDate,huanDate,user},
      }).then(
        value =>{
          let data =value.data;
          if(data.padding){
            alert('借阅成功')
          }else{
            alert('无法借阅 原因:'+data.err)
          }
          //重新计算已借阅的数量
          this.maxbook();
        },
      )  
    
    },
    //判断借阅书籍的数量
    maxbook(){
      //获取当前的用户
      let user = localStorage.getItem('user');
      axios({
        url:'http://127.0.0.1:5000/maxbookpan',
        method:'post',
        data:{user}
      }).then(
        value=>{
          this.bookshu = value.data.chang
        }
      )
    }
  },
  mounted() {
    //确保用户登录
    let padding = localStorage.getItem('padding');
    console.log(padding);
    if(padding !='true') { 
      alert('请先登录');
      this.$router.push({
	    name:'shouye',
      })
    } 
    this.maxbook();
  },
}
</script>

<style scoped>
#main{
  float:left
}
h1{
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}

input,select{
    margin-top: 15px;
    border: 1px black solid;
}

#tip1{  
    margin-top: 15px;
    color: red;
    font-size: 20px;
}
</style>