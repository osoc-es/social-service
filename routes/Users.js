const express = require('express')
const users = express.Router()
const cors = require('cors')
const User = require('../models/User')
const UserType = require('../models/UserType')
var Validator = require('jsonschema').Validator;
/*var registerValidator = new Validator();
var registerSchema = {
  "id": "SignUp",
  "type": "object",
  "properties": {
    "Email": {"type": "string"},
    "Password": {"type": "string"},
    "FirstName": {"type": "string"},
    "LastName": {"type": "string"},
    "ContactNumber":{"type":"string", optional: true },
    "Address":{"type":"string", optional: true },
    "Gender":{"type":"string", optional: true },
    "DOB":{"type":"date", optional: true }
    
  },
  "required": ["Email","Password","FirstName","LastName"]
};
*/
users.use(cors())
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
        res.status(200).send("User added successfully")
      })
    });
  } else {
    res.status(409).send("User already exists");
  }
})
.catch(err => {
  res.status(400).send('error: ' + err)
})
}
else{
  res.status(400).send(validateData);
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
        //res.json(user.dataValues);
      } else {
        res.status(404).send('User does not exist')
      }
    })
    .catch(err => {
      res.status(400).send('error: ' + err)
    })
}
else{
  res.status(400).send("Invalid Data:"+ result.response.errorMessage);
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
        UserType.findOne({
          id:user.id
        })
        .then(function(result){
          res.status(200).send(
            {
              Email:user.Email,UserType:result.title,FirstName:user.FirstName,LastName:user.LastName,
              Address:user.Address,Gender:user.Gender,DOB:user.DOB
            }
            )
        })

      } else {
        res.status(404).send('User does not exist');
      }
    })
    .catch(err => {
      res.status(400).send('error: ' + err)
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
     res.status(400).send("error: "+err)
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
  res.status(400).send("error: "+err)
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
module.exports = users
