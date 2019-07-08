const express = require('express')
const forms = express.Router()
const cors = require('cors')
const Form = require('../models/Form')
conflicts.use(cors())

//creating new form
forms.post('/add', (req, res) => {
    if(req.body.description!=null && req.body.description!=""){
                Form.create({ConflictId:req.body.ConflictId,description:req.body.description})
                 .then(function(result){
                     if(result){
                        res.status(200).send("Form Created..!!")
                     }
                     else{
                         res.status(409).send("something went wrong");
                     }
                 })
                 . catch(err => {
                  res.status(400).send('error: ' + err)
                     })
    }else{
        res.status(400).send("Title can not be empty.");
    }

});
/*
//get conflicts
conflicts.get('/', (req, res) => {
    Conflict.findAll({
    })
      .then(conflict => {
        if (conflict) {
          res.status(200).json(conflict)
        } else {
          res.status(404).send('No conflict found,you can add them on /add..')
        }
      })
      .catch(err => {
        res.status(400).send('error: ' + err)
      })
  })
//update conflict
conflicts.put("/update",function(req,res){
  Conflict.update(
    {title:req.body.title},
    {returning:true,where:{ConflictID:req.body.ConflictID}}
  ).then(result => {
    if(result==null){
     res.status(404).send("Conflict not foound.")
    }
    else{
     res.status(200).send(result)
    }
  
 })
.catch(err=>{
  res.status(400).send("error: "+err)
})
});
//deleting conflict
conflicts.put("/delete",function(req,res){
  Conflict.destroy(
 {where:{ConflictId:req.body.ConflictId}}
).then(result => {
 if(result==null){
  res.status(404).send("Conflict not found.")
 }
 else{
  res.status(200).send(result)
 }

})
.catch(err=>{
res.status(400).send("error: "+err)
})
});*/
module.exports = forms