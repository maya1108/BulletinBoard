// require and instantiate express
var dotenv = require('dotenv').config();
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database  : 'bulletinboard'
})
connection.connect(function(error){
  if(!!error){
    console.log("Error");
  }else {
    console.log("Connected");
  }
});
app.get('/message',function(req,res){
  connection.query("SELECT * from messages", function(error,result){
    if(!!error){
      console.log("Error in the query");
    }else {
      // console.log("Successful query");
    }
      res.render('message',{result:result.reverse()});
  });
})
app.get('/post/:id',function (req,res) {
  var id = req.params.id;
    connection.query("SELECT * from messages where id=?",id, function(error,result){
      if(!!error){
        console.log("Error with post");
      }else {
        console.log("post Successful");
      }
      res.render('post',{postResult:result[0]});;
    });
})

app.post("/",function(req,res){
connection.query("INSERT INTO messages (title,body) values ('"+req.body.title+"','"+req.body.article+"')", function(error,result){
  if (!!error) {
  console.log(error);
}else {
  res.redirect('/message');
}
})

})
app.listen(3030);
