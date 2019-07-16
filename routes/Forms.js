const express = require('express')
const forms = express.Router()
const cors = require('cors')
const Form = require('../models/Form')
const Conflict = require('../models/Conflict')
forms.use(cors())

//creating new form
forms.post('/add/:ConflictId/', (req, res) => {
    if(req.body.description!=null && req.body.description!=""){
                var data={
                    ConflictId:req.params.ConflictId,
                    description:req.body.description
                }
                Form.create(data)
                 .then(function(result){
                     if(result){
                        res.status(200).json("Form Created..!!")
                     }
                     else{
                         res.status(409).json("something went wrong");
                     }
                 })
    }else{
        res.status(400).json("Description and ConflictId can not be empty.");
    }

});

//get all forms
forms.get('/:ConflictId/', (req, res) => {
  Form.findAll({ where: {ConflictId: req.params.ConflictId }})
      .then(form => {
        if (form) {
          res.status(200).json(form)
        } else {
          res.status(404).json('Form not found,you can add them on forms/add/ConflictId..')
        }
      })
      .catch(err => {
        res.status(400).json('error: ' + err)
      })
  })
//update conflict
forms.put("/update/:FormId/",function(req,res){
  Form.update(
    {description:req.body.description},
    {returning:true,where:{FormId:req.params.FormId}}
  ).then(result => {
    if(result==null){
     res.status(404).json("Form not found.")
    }
    else{
     res.status(200).json(result)
    }
  
 })
.catch(err=>{
  res.status(400).json("error: "+err)
})
});
//deleting conflict
forms.put("/delete/:FormId",function(req,res){
  Form.destroy(
 {where:{FormId:req.params.FormId}}
).then(result => {
 if(result==null){
  res.status(404).json("Form not found.")
 }
 else{
  res.status(200).json("Form Deleted.")
 }

})
.catch(err=>{
res.status(400).json("error: "+err)
})
});
Conflict.hasMany(Form,{foreignKey: 'ConflictId'});
Form.belongsTo(Conflict,{foreignKey: 'ConflictId'});
module.exports = forms