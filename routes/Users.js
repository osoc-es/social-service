const express = require('express')
const users = express.Router()
const cors = require('cors')
var payloadCheck = require('payload-validator');
var expectedSignupData = {
    "email" : "", // represent string
    "first_name" : "", // 
    "last_name" : "",
    "password"  : "",
    "created"   : ""
};
const User = require('../models/User')
users.use(cors())

//creating new user
users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }
  //will update extra stuff
  const userData1 = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  }
  //validating data
  var result = payloadCheck.validator(expectedSignupData, userData1, 
    ["first_name","last_name","email","password"], true);

  if(result.success)
  {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          User.create(userData);
          res.status(200).send("User added successfully")
        } else {
          res.status(409).send("User already exists");
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
  else{
    res.send("Invalid Data:"+ result.response.errorMessage)
  }
})

//login
users.post('/login', (req, res) => {
 

 if(req.body.email!=null || req.body.password!=null){
    User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
      .then(user => {
        if (user) {
          res.status(200).send(user.dataValues.first_name+" "+user.dataValues.last_name);
          //res.json(user.dataValues);
        } else {
          res.status(400).send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
  else{
    res.send("Invalid Data:"+ result.response.errorMessage+" Email: "+req.body.email);
  }
  
 
})

//get profile
users.get('/profile', (req, res) => {
  User.findOne({
    where: {
      id:req.body.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

//update profile
users.put("/profile",function(req,res){
     User.update(
       {first_name:req.body.first_name,last_name:req.body.last_name},
       {returning:true,where:{id:req.params.id,email:req.body.email}}
     ).then(result => {
       if(result==null){
        res.status(404).send("User not foound.")
       }
       else{
        res.json(result)
       }
     
    })
   .catch(err=>{
     res.send("error: "+err)
   })
});
//removing user
users.put("/delete",function(req,res){
  User.destroy(
    {where:{id:req.params.id,email:req.body.email}}
  ).then(result => {
    if(result==null){
     res.status(404).send("User not found.")
    }
    else{
     res.json(result)
    }
  
 })
.catch(err=>{
  res.send("error: "+err)
})
});


//function validateRegister(){}

module.exports = users
