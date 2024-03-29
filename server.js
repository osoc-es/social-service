var express = require("express");
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();

var Users = require('./routes/Users')
var Conflicts = require('./routes/Conflict')
var Forms = require('./routes/Forms')
var Questions = require('./routes/Questions')
var Answers = require('./routes/Answer')
//var FeedBacks = require('./routes/FeedBack')
var Organizations = require('./routes/Organization')
var Projects = require('./routes/Project')
// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s url:%s  path:%s', req.method, req.url, req.path);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use('/users', Users)
router.use("/conflicts",Conflicts)
router.use("/forms",Forms)
router.use("/questions",Questions)
router.use("/answers",Answers)
//router.use("/answers",FeedBacks)
router.use("/organizations",Organizations)
router.use("/projects",Projects)
// always invoked
//router.use(function(req, res, next) {
//  res.send('Hello World');
//});

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use('/social-service', router);

const PORT = process.env.PORT || 3000
app.listen(PORT,function(){
console.log("Server is listening at:"+PORT);
});
