const express = require('express')
const organizations = express.Router()
const cors = require('cors')
const Organization = require('../models/Organization') 
organizations.use(cors())

//creating new organization
organizations.post('/add/', (req, res) => {
    if(req.body.Name!=null && req.body.Name!=""){
        Organization.findOne({
            where: {
              Name: req.body.Name
            }
          }).then(org => {
            if (!org) {
                Organization.create(
                  {
                  Name:req.body.Name,
                  LogoUrl: req.body.LogoUrl,
                  OrgUrl: req.body.OrgUrl,
                  Description: req.body.Description
                  }
                )
                res.status(200).json("Organization Created..!!")
            }else{
               res.status(409).json("Organization with this name already exists..!!")
            }
        }). catch(err => {
            res.status(400).json('error: ' + err)
          })

    }else{
        res.status(400).json("Name can not be empty.");
    }

});
//get organization
organizations.get('/', (req, res) => {
    Organization.findAll({
    })
      .then(org => {
        if (org) {
          res.status(200).json(org)
        } else {
          res.status(404).json('No Organization found,you can add them on organizations/add..')
        }
      })
      .catch(err => {
        res.status(400).json('error: ' + err)
      })
  })
module.exports = organizations