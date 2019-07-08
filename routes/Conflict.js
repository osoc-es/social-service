const express = require('express')
const conflicts = express.Router()
const cors = require('cors')
const Conflict = require('../models/Conflict')
conflicts.use(cors())

//creating new conflict
conflicts.post('/add', (req, res) => {
    if(req.body.title!=null && req.body.title!=""){
        Conflict.findOne({
            where: {
              title: req.body.title
            }
          }).then(conlict => {
            if (!conlict) {
                Conflict.create({title:req.body.title})
                res.status(201).send("Conflict Created..!!")
            }else{
               res.status(409).send("Conflict already exists..!!")
            }
        }). catch(err => {
            res.send('error: ' + err)
          })

    }else{
        res.status(400).send("Title can not be empty.");
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
          res.status(404).send('No conflict found..')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

module.exports = conflicts