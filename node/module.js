const express = require('express'); //1 导入 express模块
const router = express.Router() //2 创建路由对象
const cors = require('cors');
const mssql = require('mssql');
// const { request } = require('express'); 上面如果有这个 见到就删
/* 
中间件
*/
//解析 json
router.use(express.json());
router.use(express.urlencoded({extended:false}));
//跨域
router.use(cors());

//配置服务器
const config = {
  user:'sa',
  password:'sa',
  server:'127.0.0.1',
  database:'MrZhangBook',
  encrypt: false ,
}

mssql.connect(config,(err)=>{
  if(err) console.log(err)
  else console.log('数据库链接成功');
  return request = new mssql.Request();
})

//用户注册
router.post('/zhuce',(req,res)=>{
  let body = req.body;
  //数据库指令
  let sql = `
  insert into [user]([user],password,name)
  values('${body.user}','${body.password}','${body.name}')
  `
  request.query(sql,(err,results)=>{
    if(err) res.send(false)
    else res.send(true);
  })
})

//账号名重复检测
router.post('/UserJian',(req,res)=>{
  let user = req.body.user;
  let sql = `select * from [user] where [user] = '${user}'`;
  request.query(sql,(err,results)=>{
    //如果 recordset[0] 为 undefined 则说明没有重复 返回true表示可以注册 否则相反
    if(results.recordset[0]){
      res.send(false)
    }else{res.send(true)}
  })
})

//登录url
router.post('/denglu',(req,res)=>{
  let data = req.body;
  let sql = `select * from [user] where [user] = '${data.user}'`
  request.query(sql,(err,results)=>{
    if(results.recordset[0]){
      //有账号 则开始进行密码判断 如果密码 正确则返回true 表示可以注册
      if(results.recordset[0].password === data.password){
        res.send(true);
      }
    }else res.send(false);
  })
})

//经典文学
router.get('/jingdian',(req,res)=>{
  let sql = `select * from JingDianbook`
  
  request.query(sql,(err,results)=>{
    //判断是否有错误 有则返回错误信息给 页面
    if(err) {return res.send(err)}

    //没有则将 将查询到的数据返回给 页面
    res.send(results.recordset);
  })
})

//科学文献
router.get('/kexue',(req,res)=>{
  let sql = `select * from KeXuebook`
  
  request.query(sql,(err,results)=>{
    //判断是否有错误 有则返回错误信息给 页面
    if(err) {return res.send(err)}

    //没有则将 将查询到的数据返回给 页面
    res.send(results.recordset);
  })
})

//小说杂谈
router.get('/xiaoshui',(req,res)=>{
  let sql = `select * from XiaoShuibook`
  
  request.query(sql,(err,results)=>{
    //判断是否有错误 有则返回错误信息给 页面
    if(err) {return res.send(err)}

    //没有则将 将查询到的数据返回给 页面
    res.send(results.recordset);
  })
})

//借阅图书
router.post('/jieshu',(req,res)=>{
  let body = req.body;

  let lei='';
  //判断是哪个类型的书
  if(body.id[0]=='A'){lei = 'JingDianbook'}
  else if(body.id[0]=='B'){lei ='KeXuebook'}
  else if(body.id[0]=='C'){lei ='XiaoShuibook'}
  else {return res.send({padding:false,err:'请输入正确的书名编码'})}

  //查询书籍状态 
  let sql = `select * from ${lei} where BianHao = '${body.id}'`
  //向数据库发送查询信息
  new Promise((resolve,reject)=>{
    request.query(sql,(err,results)=>{
      //如果查询失败发送 信息给页面
      if(err) {return res.send({padding:false,err:'数据库查询失败'})}
      else if(results.recordset[0]==undefined) {return res.send({padding:false,err:'馆内没有这本书'})} 
      //赋值 书名 和当前书籍数量
      body.bookName = results.recordset[0].ShuMing;
      body.DangShu = results.recordset[0].DangShu;
      resolve('成功');
    })
   }
  ).then(
  value=>{
    //如果书库存不足 直接退出
    if(body.DangShu-1<0) {res.send({padding:false,err:`图书馆内《${body.bookName}》不足`}); return Promise.reject(`图书馆内《${body.bookName}》不足`) }
    //向数据库增添借书数据
    sql = `insert into borrowBook(id,[user],bookName,jieDate,huanDate) 
    values ('${body.id}','${body.user}','${body.bookName}','${body.jieDate}','${body.huanDate}')`;
    //执行代码
    new Promise((resolve,reject)=>{
      request.query(sql,(err)=>{
        //添加失败报错
        if(err) {res.send({padding:false,err:'数据库添加信息失败'});return reject('数据库添加信息失败')} 
        else{return resolve('成功')};
      })
    }).then(value =>{
      //修改 书籍的库存数据
      sql = `update ${lei} set       
      DangShu = ${Number(body.DangShu)-1}
      where BianHao='${body.id}'     
      `
      //执行修改数据代码
      request.query(sql,(err)=>{
        //添加失败报错
        if(err) {return res.send({padding:false,err:'数据库修改信息失败'})}
        else {return res.send({padding:true,err:'借阅成功~'})}
      })
    }).catch(//错误穿透 兜底
    reason=>{console.log('promise回调链出现了问题\n错误原因:',reason)}
  )
  }).catch( //错误穿透 
    reason=>{console.log('promise回调链出现了问题\n错误原因:',reason)}
  )
})

//返回书籍借阅数量
router.post('/maxbookpan',(req,res)=>{
  let sql = `select * from borrowBook where [user] = '${req.body.user}'`
  request.query(sql,(err,results)=>{
    return res.send({chang:results.recordset.length});
  })
  
})

//返回借书的信息
router.post('/huanshuxin',(req,res)=>{
  let user = req.body.user;
  let sql = `select * from borrowBook
  where [user] = '${user}'`;
  request.query(sql,(err,results)=>{
    res.send(results.recordset);
  }) 
})

//还书
router.post('/huanshu',(req,res)=>{
  //准备数据
  let hao =req.body.hao;
  //书籍类别
  let lei ='';
  //借书信息
  let xinxi={};
  let sql = `select * from borrowBook
  where JieShuHao = '${hao}'`;
  new Promise((reslove,reject)=>{
    request.query(sql,(err,results)=>{
      if(err) {return reject('请不要输入非数字 字符')}
      if(results.recordset[0] == undefined) {return reject('未找到该书')}
      xinxi = results.recordset[0];
      res.send({
        padding:true,
        xinxi,
      })
      reslove('成功');
    })
  }).then(value=>{
    //判断是哪个类型的书
    if(xinxi.id[0]=='A'){lei = 'JingDianbook'}
    else if(xinxi.id[0]=='B'){lei ='KeXuebook'}
    else if(xinxi.id[0]=='C'){lei ='XiaoShuibook'}
    sql = `
    delete borrowBook 
    where JieShuHao = '${xinxi.JieShuHao}'`
    //将 对应的借书信息删除
    request.query(sql,(err,results)=>{})
    //补库存
    new Promise((reslove,reject)=>{
      //先找当前的库存 
      sql =`select * from ${lei}
      where BianHao = '${xinxi.id}'`
      request.query(sql,(err,results)=>{
        xinxi.DangShu = results.recordset[0].DangShu;
        reslove('成功')
      })
    }).then(value=>{
      //添加 一本 库存书
      sql = `update ${lei} set       
      DangShu = ${Number(xinxi.DangShu)+1}
      where BianHao='${xinxi.id}'`
      //执行数据语句
      request.query(sql,(err,results)=>{})
    })

  }).catch(reason=>{res.send({
    padding:false,
    err:reason,
  })})
   
})
//向外共享路由
module.exports = router;


