const express = require('express')
const projects = express.Router()
const cors = require('cors')
const Project = require('../models/Project') 
const ProjectConflict = require('../models/ProjectConflict') 
projects.use(cors())
const sequelize = require('sequelize')
const db = require('../database/db.js')

//creating new project for organization
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
//add Conflict to project
projects.post('/add/:ProjectId/:ConflictId/', (req, res) => {
  ProjectConflict.create(
                {
                  ProjectId:req.params.ProjectId,
                  ConflictId:req.params.ConflictId
                }
              ).then(function(pconflict){
                if(pconflict){
                  res.status(200).json("Conflict added to project..")
                }
                else{
                  res.status(400).json("Something went wrong try again..")
                }
              })
          . catch(err => {
          res.status(409).json('Foreign Key Conflict: ' + err)
        })

});
//get projects of given organization Id
projects.get('/:OrgId/', (req, res) => {
    Project.findAll({
      where:{OrgId:req.params.OrgId}
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
  //get conflicts of specific project
  projects.get('/conflicts/:OrgId/:ProjectId/', (req, res) => {
    db.sequelize.query("SELECT Projects.ProjectId,Conflicts.ConflictId,Projects.Description,Projects.name,"+
  "Projects.Description,Conflicts.title,Conflicts.description FROM Projects,Conflicts,ProjectConflicts where "+
  "ProjectConflicts.ProjectId=Projects.ProjectId AND Conflicts.ConflictId=ProjectConflicts.ConflictId "+
  "AND Projects.OrgId IN(:OrgId) AND ProjectConflicts.ProjectId IN(:ProjectId)",
  { replacements: { OrgId: req.params.OrgId,ProjectId:req.params.ProjectId}, 
  type: sequelize.QueryTypes.SELECT }
    )
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

//gets projects with conflicts
projects.get("/projectconflicts/:OrgId/",function(req,res){
  db.sequelize.query("SELECT Projects.ProjectId,Conflicts.ConflictId,Projects.Description,Projects.name,"+
  "Projects.Description,Conflicts.title,Conflicts.description FROM Projects,Conflicts,ProjectConflicts where "+
  "ProjectConflicts.ProjectId=Projects.ProjectId AND Conflicts.ConflictId=ProjectConflicts.ConflictId "+
  "AND Projects.OrgId IN(:OrgId)",
  { replacements: { OrgId: req.params.OrgId}, 
  type: sequelize.QueryTypes.SELECT }
  ).then(function(result){
     if(result){
       res.status(200).json(result)
     }else{
       res.status(404).json("no record found..")
     }
  })

})

//updating project of organization
projects.put("/update/:OrgId/:ProjectId/",function(req,res){
  Project.findOne({
    where: {
      name: req.body.name
    }
  }).then(function(project){
      if(!project){
        Project.update(
          { 
            name:req.body.name,
            Description: req.body.Description
          },
          {returning:true,where:{OrgId:req.params.OrgId,ProjectId:req.params.ProjectId}}
        ).then(result => {
          if(result==null){
           res.status(404).json("Project not found.")
          }
          else{
           res.status(200).json("Project updated sucessfuly..")
          }
        
       })
      .catch(err=>{
        res.status(400).json("error: "+err)
      })

      }else{
        res.send(409).json("Project with this name already exisit..")
      }
  });
  
});
//deleting project
projects.put("/delete/:OrgId/:ConflictId/",function(req,res){
  Project.destroy(
    {
        where:{OrgId:req.params.OrgId,ProjectId:req.params.ProjectId}
    }
    ).then(result => {
        if(result==null){
          res.status(404).json("Project not found.")
        }
      else{
         res.status(200).json("Project deleted.")
      }
    })
  .catch(err=>{
   res.status(400).json("error: "+err)
   })
});

module.exports = projects