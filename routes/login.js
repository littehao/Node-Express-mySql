var express = require('express')
var router = express.Router()
var crypto = require('crypto')
var User = require('../models/user.model')
var TITLE_LOGIN = '登录';

router.get('/', function (req, res) { 
  res.render('login', { title: TITLE_LOGIN })
})

//用户登录
router.post('/', function (req, res) { 
  var password = req.body.password,
    username = req.body.username,
    isRem = req.body.remember,
    md5 = crypto.createHash('md5');
  User.findByUser(username, function (err,result) { 
    if (err) {
      res.locals.error = err;
      res.render('login', { title: TITLE_LOGIN });
     return;
    }
    password = md5.update(password).digest('hex');
    if (result.length == 0) { 
      res.locals.error = '用户不存在';
      res.render('login',{title:TITLE_LOGIN});
      return;
    }
    if (result[0]['username'] != username || result[0]['password'] != password) {
      res.locals.error = '用户名或密码有误';
      res.render('login', { title: TITLE_LOGIN });
      return;
    } else { 
      if(isRem){
         res.cookie('islogin', username, { maxAge: 360000 });                 
      }
      res.locals.username = username;
      req.session.username = res.locals.username;  
      console.log(req.session.username);                        
      res.redirect('/');
    }
  })
})

module.exports = router
