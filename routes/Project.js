const express = require('express')
const projects = express.Router()
const cors = require('cors')
const Project = require('../models/Project') 
projects.use(cors())

//creating new organization
projects.post('/add/:OrgId/', (req, res) => {
    if(req.body.name!=null && req.body.name!=""){
        Project.findOne({
            where: {
                name: req.body.name
            }
          }).then(project => {
            if (!project) {
                Project.create(
                  {
                    OrgId:req.params.OrgId,
                    name: req.body.name,
                    Description: req.body.Description
                  }
                )
                res.status(200).json("Project Created..!!")
            }else{
               res.status(409).json("Project with this name already exists..!!")
            }
        }). catch(err => {
            res.status(400).json('error: ' + err)
          })

    }else{
        res.status(400).json("Name can not be empty.");
    }

});
//get organization
projects.get('/', (req, res) => {
    Project.findAll({
    })
      .then(project => {
        if (project) {
          res.status(200).json(project)
        } else {
          res.status(404).json('No project found,you can add them on projects/add..')
        }
      })
      .catch(err => {
        res.status(400).json('error: ' + err)
      })
  })
module.exports = projects