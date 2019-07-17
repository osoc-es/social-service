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
    if(req.body.data!=null & req.body.data.length!=0){
        formData=req.body.data[0];
        //console.log(formData.Email+","+formData.QuestionId);
        Answer.findOne({
            where: {
              Email: formData.Email,
              QuestionId:formData.QuestionId
            }
          }).then(found => {
            if (!found) {
                for(i in req.body.data){
                    var formData=req.body.data;
                    var data={
                        QuestionId:formData[i].QuestionId,
                        Email:formData[i].Email,
                        Answer:formData[i].Answer,
                        AnswerType:formData[i].AnswerType
                    }
                    Answer.create(data) 
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
                 res.status(200).json("Answer Submitted Sucessfully..!!") 
                }
              else{
                res.status(409).json("You have Submitted this form already..!!") 
            }
        });           
    }else{
        res.status(400).send("Invlaid data.");
    }
  
});
//get submitted answers
answers.get('/:title/:Email/', (req, res) => {
    Report.findAll({
        where:{ProblemType:req.params.title,Email:req.params.Email}
      })
        .then(report => {
          if (report) {
                  //--> Convert JSON to CSV data
            const reportData = JSON.parse(JSON.stringify(report));
		        const csvFields = ["Id","Email","ProblemType","QuestionId","Question","Options","Answer","time"];
		        const json2csvParser = new Json2csvParser({ csvFields });
                const csv = json2csvParser.parse(reportData);
                //var currentDate=new Date();
                //saving file
                fs.writeFile("Report-1.csv", csv, function(err) {
                    if (err) throw err;
                    console.log('file saved');
                });
                res.status(200).json("Check Report-1.csv file in root project folder. ")
          } else {
            res.status(404).json('User have not filled anything yet..')
          }
        })
        .catch(err => {
          res.status(400).json('error: ' + err)
        })
 
});


module.exports = answers