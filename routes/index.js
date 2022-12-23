var express = require('express');
var router = express.Router();
var moment = require('moment')
var News = require('../models/news.model')
var TITLE_INDEX = '新闻'

/* GET home page. */
router.get('/', function (req, res) {
  if(req.cookies.islogin){
    console.log('cookie:'+req.cookies.islogin);
    req.session.username = req.cookies.islogin;
  }
  if(req.session.username){
    console.log('session:'+req.session.username);
    res.locals.username = req.session.username;
  }else{
    res.redirect('/login');
    return;
  }
  //查询新闻列表
  News.findNewsAll(function (err, result) { 
    if (err) {
      res.locals.error = err
      res.render('index', { title: TITLE_INDEX, newList:[] });
      return;
    }
    res.render('index', { title: TITLE_INDEX, newList:result });
  })
});

// 添加新闻
router.post('/add', function (req, res) {
  const newsData = new News({
    title: req.body.title,
    content: req.body.content,
    img: 'http://n.sinaimg.cn/news/1_img/upload/73a76861/105/w1023h682/20221218/c75c-b2d14d7c81670c1601b5f657ddac3542.jpg',
    time:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  })
  console.log(newsData)
  News.add(newsData, function (err, result) { 
    if (err) {
      res.send({
          status:400,
          msg:err
      })
     return;
    }
    res.send({
        status:200,
        msg:'success',
        data:result.insertId > 0
    })
  })
})

//删除
router.delete('/delete', function (req, res) { 
  News.delete(req.body.id, function (err, result) { 
    if (err) {
      res.send({
          status:400,
          msg:err
      })
     return;
    }
    res.send({
        status:200,
        msg:'success',
        data:true
    })
  })
})

// 根据id查询新闻
router.get('/findnews', function (req, res) { 
  News.findNews(req.query.id, function (err, result) { 
    if (err) {
      res.send({
          status:400,
          msg:err
      })
     return;
    }
    res.send({
      status:200,
      msg:'success',
      data:result[0] || null
    })
    
  })
})

//修改
router.put('/update', function (req, res) { 
  const data = {
    id:req.body.id,
    title: req.body.title,
    content: req.body.content,
    img: 'http://n.sinaimg.cn/default/1_img/upload/3933d981/72/w1024h648/20221217/17f5-813de74b361d5679f078f0167faa6696.jpg',
    time:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }
  News.update(data, function (err,result) { 
    if (err) {
      res.send({
        status:400,
        msg:err
      })
     return;
    }
    res.send({
      status:200,
      msg:'success',
      data:true
  })
  })
})


module.exports = router;
