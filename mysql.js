var mysql = require("mysql");
var fs=require("fs");
fs.stat("flag.txt",function(error,info){
   if(!error){
        console.log("数据库已经存在")
   }else{
       var db = mysql.createConnection({
           host: 'localhost',
           user: 'root',
           password: 'root'
       });
       db.query(`create database workApp`, function () {
           db.query("use workApp", function () {
               db.query(`create table admin (
        id int(11) primary key auto_increment,
        username varchar(255),
        password varchar(32)
        ) default charset utf8`,function(){
                   db.query(`insert into admin (username,password) values ('张三',MD5('123456'))`)
                   fs.writeFile("flag.txt","数据库不能重复创建")
               });
           })

       });
   }
})


