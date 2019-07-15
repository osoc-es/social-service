const express = require('express')
const users = express.Router()
const cors = require('cors')
const User = require('../models/User')
const UserType = require('../models/UserType')
users.use(cors())
const Sequelize = require('sequelize')
const db = require('../database/db.js')

//creating new user
users.post('/register', (req, res) => {
//var schemaResult=registerValidator.validate(req.body, registerSchema);
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
      const userData = {
        Email: req.body.Email,
        id: result.id,
        Password: req.body.Password,
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
users.post('/login', (req, res) => {
if(req.body.Email!=null || req.body.Password!=null){
  User.findOne({
    where: {
      Email: req.body.Email,
      Password: req.body.Password
    }
  })
    .then(user => {
      if (user) {
        res.status(200).json(user.FirstName+""+user.LastName);
      } else {
        res.status(404).json("Email|Passowrd does not match.")
      }
    })
    .catch(err => {
      res.status(400).json('error: ' + err)
    })
}
else{
  res.status(400).json("Please Email and Passord both..");
}
})

//get profile
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
            res.status(200).json(result);
        })
      }
      else{
        res.status(404).json("user not found..")
      }
    });
  /*User.findOne({
    where: {
      Email:req.params.Email
    }
    //,attributes: { exclude: ['Password'] }
  })
    .then(user => {
      if (user) {
        db.sequelize.query("SELECT * FROM users,usertypes"
        +" WHERE usertypes.id IN(:id) AND "+
        "users.Email IN(:Email)",{
        replacements: {Email: req.params.Email,id:user.id},
        type: db.sequelize.QueryTypes.SELECT
        })
        .then(function(result){
          res.status(200).json(
            {
              Email:result.Email,UserType:result.title,FirstName:result.FirstName,LastName:result.LastName,
              Address:result.Address,Gender:result.Gender,DOB:result.DOB
            }
            )
        })

      } else {
        res.status(404).json('User does not exist');
      }
    })
    .catch(err => {
      res.status(400).json('error: ' + err)
    })*/
});

//get list of users who have filled form of that problem 
users.get('/:title', (req, res) => {
  db.sequelize.query("SELECT DISTINCT  users.FirstName,users.LastName,users.Email,Conflicts.title "
  +"FROM Forms,Questions,users,UserAnswers,Conflicts WHERE Questions.QuestionId=UserAnswers.QuestionId "+
  "AND UserAnswers.Email=users.Email AND Forms.FormId=Questions.FormId "+
  "AND Conflicts.title IN(:title)",{
  replacements: {title: req.params.title},
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
users.put("/profile/:Email",function(req,res){
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
users.put("/delete/:Email",function(req,res){
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
UserType.hasMany(User,{foreignKey: 'id'});
User.belongsTo(UserType,{foreignKey: 'id'});
module.exports = users
