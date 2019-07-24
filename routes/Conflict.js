const express = require('express')
const conflicts = express.Router()
const cors = require('cors')
const Conflict = require('../models/Conflict')
conflicts.use(cors())

//creating new conflict
conflicts.post('/add/', (req, res) => {
    if(req.body.title!=null && req.body.title!=""){
        Conflict.findOne({
            where: {
              title: req.body.title
            }
          }).then(conlict => {
            if (!conlict) {
                Conflict.create(
                  {
                  title:req.body.title,
                  description: req.body.description
                  }
                ).then(function(conflict){
                  res.status(200).json(conflict);
                })
                
            }else{
               res.status(409).json("Conflict already exists..!!")
            }
        }). catch(err => {
            res.status(400).json('error: ' + err)
          })

    }else{
        res.status(400).json("Title can not be empty.");
    }

});
//get conflicts
conflicts.get('/', (req, res) => {
    Conflict.findAll({
    })
      .then(conflict => {
        if (conflict) {
          res.status(200).json(conflict)
        } else {
          res.status(404).json('No conflict found,you can add them on conflicts/add..')
        }
      })
      .catch(err => {
        res.status(400).json('error: ' + err)
      })
  })
//updating conflict of project
conflicts.put("/update/:ConflictId/",function(req,res){
  Conflict.findOne({
    where: {
      title: req.body.title
    }
  }).then(function(conflict){
      if(!conflict){
        Conflict.update(
          { 
            title:req.body.title,
            description: req.body.description
          },
          {returning:true,where:{ConflictId:req.params.ConflictId}}
        ).then(result => {
          if(result==null){
           res.status(404).json("Conflict not found.")
          }
          else{
           res.status(200).json("Conflict updated sucessfuly..")
          }
        
       })
      .catch(err=>{
        res.status(400).json("error: "+err)
      })

      }else{
        res.send(409).json("CONFLICT with this title already exisit..")
      }
  });
  
});

//deleting conflict
conflicts.delete("/delete/:ConflictId/",function(req,res){
  Conflict.destroy(
    {
        where:{ConflictId:req.params.ConflictId}
    }
    ).then(result => {
        if(result==null){
          res.status(404).json("Conflict not found.")
        }
      else{
         res.status(200).json("Conflict deleted.")
      }
    })
  .catch(err=>{
   res.status(400).json("error: "+err)
   })
});

module.exports = conflicts