var express = require('express');
var router = express.Router();
var moment = require('moment')
var News = require('../models/news.model')
var TITLE_NEWS = '新闻详情'


 // 根据id查询新闻
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
  //新闻详情
 News.findNews(req.query.id, function (err, result) { 
     const newsData = {
      ...result[0]
     }
     newsData.time = moment(result[0]['time']).format('YYYY-MM-DD HH:mm:ss')
     res.render('news', { title: TITLE_NEWS,news:newsData })
  })
})
module.exports = router



