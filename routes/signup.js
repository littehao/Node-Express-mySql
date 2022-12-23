var express = require('express')
var router = express.Router()
var crypto = require('crypto')
var User = require('../models/user.model')
var TITLE_REG = '注册';

router.get('/', function (req, res) { 
 res.render('signup', { title: TITLE_REG })
})

router.post('/', function (req, res) {
 var password = req.body.password,
     username = req.body.username
 //密码加密
 var md5 = crypto.createHash('md5')
 var userPwd = md5.update(password).digest('hex')
 //创建一个数据库操作对象（User）
 console.log(userPwd,userPwd.length)
 const user = new User({
     username: username,
     password: userPwd
 });
 User.findByUser(username, (err, data) => { 
  if (err) {
    res.locals.error = err;
    res.render('signup', { title: TITLE_REG });
   return;
  }
  if (data != null && data.length > 0) {
   res.locals.error =  "用户名已存在"
   res.render('signup', { title: TITLE_REG });
   return;
  }
  //注册
  User.signup(user, (err, data) => { 
   if (err) { 
     res.locals.error = err;
     res.render('signup', { title: TITLE_REG });
      return
   }
    res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>' ;
    res.render('signup', { title: TITLE_REG });
  })
 })
 
})

module.exports = router
