const express = require('express')
const forms = express.Router()
const cors = require('cors')
const Form = require('../models/Form')
forms.use(cors())

//creating new form
forms.post('/add/:ConflictId/', (req, res) => {
    if(req.body.description!=null && req.body.description!="" 
                           &&req.body.ConflictId!=null&&req.body.ConflictId!=""){
                var data={
                    ConflictId:req.params.ConflictId,
                    description:req.body.description
                }
                Form.create(data)
                 .then(function(result){
                     if(result){
                        res.status(200).send("Form Created..!!")
                     }
                     else{
                         res.status(409).send("something went wrong");
                     }
                 })
    }else{
        res.status(400).send("Description and ConflictId can not be empty.");
    }

});

//get forms
forms.get('/', (req, res) => {
    Form.findAll({
    })
      .then(form => {
        if (form) {
          res.status(200).json(conflict)
        } else {
          res.status(404).send('No Form found,you can add them on /add..')
        }
      })
      .catch(err => {
        res.status(400).send('error: ' + err)
      })
  })
//update conflict
forms.put("/update",function(req,res){
  Form.update(
    {description:req.body.description},
    {returning:true,where:{FormId:req.body.FormId}}
  ).then(result => {
    if(result==null){
     res.status(404).send("Form not foound.")
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
forms.put("/delete",function(req,res){
  Form.destroy(
 {where:{FormId:req.body.FormId}}
).then(result => {
 if(result==null){
  res.status(404).send("Form not found.")
 }
 else{
  res.status(200).send(result)
 }

})
.catch(err=>{
res.status(400).send("error: "+err)
})
});
module.exports = forms