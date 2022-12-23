const sql = require("./db.config.js");
// constructor
const News = function(news) {
 this.title = news.title;
 this.content = news.content;
 this.img = news.img;
 this.time = news.time
};

//sql执行函数
function querySql (connection,sql,data,callback) { 
 connection.query(sql, data, function (err,result) { 
  if(err){
   console.log("Error:"+err.message);
   return;
  }
  callback(err,result);
 })
}

sql.getConnection(function (err,connection) { 
   //新增
   News.add = function (newsData, callback) { 
    const sql = "INSERT INTO news(id,title,content,img,time) VALUES(0,?,?,?,?)";
    const data = [newsData.title, newsData.content, newsData.img, newsData.time]
    querySql(connection,sql,data,callback)
   }
   //删除
   News.delete = function (id, callback) { 
    const sql = "DELETE FROM news WHERE id=?";
    const data = [id]
    querySql(connection,sql,data,callback)
  }
   //修改
  News.update = function (newsData, callback) { 
    const sql = "UPDATE news SET title=?,content=?,img=?,time=? WHERE id=?";
    const data = [newsData.title,newsData.content,newsData.img,newsData.time,newsData.id]
    querySql(connection,sql,data,callback)
  }

   //根据id查找
  News.findNews = function (id, callback) { 
    const sql = "SELECT * FROM news WHERE id=?";
    const data = [id]
    querySql(connection,sql,data,callback)
  }
 
  //查找所有
  News.findNewsAll = function (callback) { 
   const sql = "SELECT * FROM news order by time desc";
   querySql(connection,sql,null,callback)
 }
})

module.exports = News









