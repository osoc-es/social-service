const express = require('express')
const users = express.Router()
const cors = require('cors')
const User = require('../models/User')
const UserType = require('../models/UserType')
users.use(cors())
var crypto = require('crypto');
const Sequelize = require('sequelize')
const db = require('../database/db.js')

//creating a new user
users.post('/register', (req, res) => {
try {
var validateData=validateRegister(req);
if(validateData=="True"){
var type="end_user";
User.findOne({
  where: {
    Email: req.body.Email
  }
}).then(user => {
  if (!user) {
    UserType.create({title:type})
    .then(function(result) {
      var getPassword=req.body.Password+"";
      var hashPassword = crypto.createHash('sha256').update(getPassword).digest('hex');
      const userData = {
        Email: req.body.Email,
        id: result.id,
        OrgId:1,
        Password: hashPassword,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        ContactNumber: req.body.ContactNumber,
        Address: req.body.Address,
        Gender:req.body.Gender,
        DOB: req.body.DOB
        };
    User.create(userData)
      .then(function(result){
        res.status(200).json("User added successfully")
      })
    });
  } else {
    res.status(409).json("User already exists");
  }
})
.catch(err => {
  res.status(400).json('error: ' + err)
})
}
else{
  res.status(400).json(validateData);
}
} 
catch (error ) {
  console.log(error.errorMessage)
}
})
//login 
users.post('/login/', (req, res) => {
if(req.body.Email!=null & req.body.Password!=null){
  var getPassword=req.body.Password+"";
  var hashPassword = crypto.createHash('sha256').update(getPassword).digest('hex');
  console.log(hashPassword);
  User.findOne({
    where: {
      Email: req.body.Email,
      Password: hashPassword
    }
  })
    .then(user => {
      if (user) {
        res.status(200).json(user.FirstName+" "+user.LastName);
      } else {
        res.status(404).json("Email|Password does not match.")
      }
    })
    .catch(err => {
      res.status(400).json('error: ' + err)
    })
}
else{
  res.status(400).json("Please Enter Email and Password both.");
}
})
//get user profile
users.get('/profile/:Email/', (req, res) => {
   User.findOne({
    where: {
      Email:req.params.Email
    }
    //,attributes: { exclude: ['Password'] }
  })
    .then(user => {
      if (user) {
        UserType.findAll({ where: {id: user.id }, include: [User]})
        .then(function(result){
          var data={
            title:result[0].title,
            Email:result[0].user.Email,
            FirstName:result[0].user.FirstName,
            LastName:result[0].user.LastName,
            Gender:result[0].user.Gender,
            Address:result[0].user.Address,
            DOB:result[0].user.DOB
          }
            res.status(200).json(data);
        })
      }
      else{
        res.status(404).json("user not found..")
      }
    });
});

//get list of users who have filled form of that problem category
users.get('/:ProblemType/', (req, res) => {
  db.sequelize.query("SELECT DISTINCT users.FirstName,users.LastName,users.Email,users.Gender,Reports.ProblemType "
  +"FROM Reports,users where Reports.Email=users.Email "+
  "AND Reports.ProblemType IN(:ProblemType)",{
  replacements: {ProblemType: req.params.ProblemType},
  type: db.sequelize.QueryTypes.SELECT
  })
  .then(function(result){
    if(result){
      res.status(200).json(result);
    }
    else{
      res.status(404).json("No form filled by that user still..")
    }
  
  })
});

//update profile
users.put("/profile/:Email/",function(req,res){
     User.update(
       {FirstName:req.body.FirstName,LastName:req.body.LastName},
       {returning:true,where:{Email:req.params.Email}}
     ).then(result => {
       if(result==null){
        res.status(404).json("User not found.")
       }
       else{
        res.status(200).json("Profile updated.")
       }
     
    })
   .catch(err=>{
     res.status(400).json("error: "+err)
   })
});
//removing user
users.put("/delete/:Email/",function(req,res){
  User.destroy(
    {where:{Email:req.params.Email}}
  ).then(result => {
    if(result==null){
     res.status(404).json("User not found.")
    }
    else{
     res.status(200).json("User removed.")
    }
 })
.catch(err=>{
  res.status(400).json("error: "+err)
})
});
//function to validate json data for creating new user
function validateRegister(req){
  if(req.body.Email==""||req.body.Email==null){
    return "Email Can not be Empty.!"
  }
  else if(req.body.Password==""||req.body.Password==null){
    return "Password Can not be Empty.!"
  }
  else if(req.body.FirstName==""||req.body.FirstName==null){
    return "FirstName Can not be Empty.!"
  }
  else if(req.body.LastName==""||req.body.LastName==null){
    return "LastName Can not be Empty.!"
  }
  else{
    return "True";
  }
}
UserType.hasOne(User,{foreignKey: 'id'});
User.belongsTo(UserType,{foreignKey: 'id'});
module.exports = users
