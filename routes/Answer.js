const express = require('express')
const answers = express.Router()
const cors = require('cors')
const Answer = require('../models/Answer')
const User = require('../models/User')
const UserAnswer = require('../models/UserAnswer')
const Report = require('../models/Report')
const Question = require('../models/Question')
const Conflict = require('../models/Conflict')
const Form = require('../models/Form')
answers.use(cors())
var async = require("async");
const Sequelize = require('sequelize')
const db = require('../database/db.js')
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

answers.post('/submit/', (req, res) => { 
    if(req.body.data!=null){
        formData=req.body.data[0];
        //console.log(formData.Email+","+formData.QuestionId);
        UserAnswer.findOne({
            where: {
              Email: formData.Email,
              QuestionId:formData.QuestionId
            }
          }).then(found => {
            if (!found) {
                for(i in req.body.data){
                    var formData=req.body.data;
                    var data={
                        Answer:formData[i].Answer,
                        AnswerType:formData[i].AnswerType
                    }
                    Answer.create(data);  
                  }
                  db.sequelize.query("SELECT * FROM Answers ORDER BY AnswerId DESC LIMIT 1",
                    {
                     type: db.sequelize.QueryTypes.SELECT
                   }) 
                 .then(function(result){
                 //console.log(result);
                 var id;
                 try {
                    id=result[0].AnswerId+1;
                 } catch (e) {
                    id=1;
                 }
                 try {
                    for(i in req.body.data){
                     var formData=req.body.data;
                     UserAnswer.create({
                       Email:formData[i].Email,
                       QuestionId:formData[i].QuestionId,
                       AnswerId:id
                     });
                     id=id+1;
                    } 
                 } catch (error) {
                  res.status(400).send("Some thing went wromg.")
                }
                //add data to report
                Question.findOne({
                    where: {
                      QuestionId:req.body.data[0].QuestionId
                    }
                  }).then(function(found){
                     if(found){
                         var formId=found.FormId;
                         Form.findOne({
                            where: {
                              FormId:formId
                            }
                          }).then(function(found){
                              var ConflictId=found.ConflictId;
                              Conflict.findOne({
                                where: {
                                    ConflictId:ConflictId
                                }
                              }).then(function(found){
                                var currentDate = new Date();
                                var pType=found.title;
                                for(i in req.body.data){
                                    var formData=req.body.data;
                                     Report.create({
                                        Email:formData[i].Email,
                                        ProblemType:pType,
                                        QuestionId:formData[i].QuestionId,
                                        Question:formData[i].Question,
                                        Options:formData[i].Options,
                                        Answer:formData[i].Answer,
                                        time:currentDate
                                     })
                                }
                              })

                          })
                     }
                  })
                }); 
            res.status(200).json("Answer Submitted Sucessfully..!!") 
            }else{
                res.status(409).json("You have Submitted this form already..!!") 
            }
        });           
    }else{
        res.status(400).send("Invlaid data.");
    }
  
});
//get submitted answers
answers.get('/:Email/', (req, res) => {
    Report.findAll({
        where:{Email:req.params.Email}
      })
        .then(report => {
          if (report) {
            res.status(200).json(report)
          } else {
            res.status(404).json('User have not filled anything yet..')
          }
        })
        .catch(err => {
          res.status(400).json('error: ' + err)
        })
 
});

function isFormSubmited(req){
    formData=req[0];
    //console.log(formData.Email+","+formData.QuestionId);
    UserAnswer.findOne({
        where: {
          Email: formData.Email,
          QuestionId:formData.QuestionId
        }
      }).then(found => {
        if (!found) {
            for(i in req){
                var formData=req;
                var data={
                    Answer:formData[i].Answer,
                    AnswerType:formData[i].AnswerType
                }
                Answer.create(data);  
              }
          return "False";
        }else{
           return "True";
        }
    })
}

module.exports = answers