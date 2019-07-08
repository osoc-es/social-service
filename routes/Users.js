const express = require('express')
const users = express.Router()
const cors = require('cors')
const User = require('../models/User')
const UserType = require('../models/UserType')
users.use(cors())
//creating new user
users.post('/register', (req, res) => {
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
        Gender:(req.body.Gender=="Male") ? 1 : 0,
        DOB: req.body.DOB
        };
    User.create(userData)
      .then(function(result){
        res.status(200).send("User added successfully")
      })
    });
  } else {
    res.status(409).send("User already exists");
  }
})
.catch(err => {
  res.send('error: ' + err)
})
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
        res.status(200).send(user.dataValues.FirstName+" "+user.dataValues.LastName);
        //res.json(user.dataValues);
      } else {
        res.status(404).send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
else{
  res.send("Invalid Data:"+ result.response.errorMessage);
}
})

//get profile
users.get('/profile', (req, res) => {
  User.findOne({
    where: {
      Email:req.body.Email
    }
  })
    .then(user => {
      if (user) {
        res.status(200).send(user)
      } else {
        res.status(404).send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

//update profile
users.put("/profile",function(req,res){
     User.update(
       {FirstName:req.body.FirstName,LastName:req.body.LastName},
       {returning:true,where:{Email:req.body.Email}}
     ).then(result => {
       if(result==null){
        res.status(404).send("User not foound.")
       }
       else{
        res.status(200).send(result)
       }
     
    })
   .catch(err=>{
     res.send("error: "+err)
   })
});
//removing user
users.put("/delete",function(req,res){
  User.destroy(
    {where:{Email:req.body.Email}}
  ).then(result => {
    if(result==null){
     res.status(404).send("User not found.")
    }
    else{
     res.status(200).send(result)
    }
  
 })
.catch(err=>{
  res.send("error: "+err)
})
});
function validateRegister(req){
  
}
module.exports = users
