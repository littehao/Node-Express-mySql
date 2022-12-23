var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutnRouter = require('./routes/logout');
var signupRouter = require('./routes/signup');
var newsRouter = require('./routes/news');

var app = express();

app.listen(8100, function () { 
  console.log('启动成功:http://localhost:8100')
})

// view engine setup
// 指定模版目录
app.set('views', path.join(__dirname, 'views'));
// 设置模版引擎，'view engine' 为固定属性
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("huhao"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'huhao',
  resave:true,
	saveUninitialized:false
}))

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutnRouter);
app.use('/signup', signupRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
