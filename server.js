var express = require("express");
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var Users = require('./routes/Users')
app.use('/users', Users)

const PORT = process.env.PORT || 3000
app.listen(PORT,function(){
console.log("Server is listening at:"+PORT);
});