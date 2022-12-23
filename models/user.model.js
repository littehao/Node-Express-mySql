const sql = require("./db.config.js");
// constructor
const User = function(user) {
 this.username = user.username;
 this.password = user.password;
};

sql.on('connection', function () { 
 console.log('数据库连接成功')
})

sql.getConnection(function (err,connection) {
 //注册用户
 User.signup = function (newUser,callback) {  
  const sql = "INSERT INTO userinfo(id,username,password) VALUES(0,?,?)";
   connection.query(sql,[newUser.username,newUser.password],function(err,result){
    if(err){
     console.log("USE Error:"+err.message);
     return;
    }
    console.log("注册用户");
    callback(err,result);
   });
 }

 //根据用户名查找用户
 User.findByUser = function (username,callback) { 
  const sql = "SELECT * FROM userinfo WHERE username =?"
  connection.query(sql, [username], function (err,result) { 
      if(err){
				console.log("findByUser Error:"+err.message);
				return;
			}
			console.log("根据用户名查找用户");
			callback(err,result);
  })
 }

})

module.exports = User















