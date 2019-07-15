const express = require('express')
const answers = express.Router()
const cors = require('cors')
const Answer = require('../models/Answer')
const User = require('../models/User')
const UserAnswer = require('../models/UserAnswer')
answers.use(cors())
var async = require("async");
const Sequelize = require('sequelize')
const db = require('../database/db.js')
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

answers.post('/submit/', (req, res) => { 
    if(req.body.data!=null){
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
                 for(i in req.body.data){
                    var formData=req.body.data;
                    UserAnswer.create({
                       Email:formData[i].Email,
                       QuestionId:formData[i].QuestionId,
                       AnswerId:id
                    });
                    id=id+1;
                }
                return "Ok";
            });
               res.status(200).json("Answer Submitted Sucessfully..!!")     
    }else{
        res.status(400).send("Invlaid data.")
    }
  
});
//get submitted answers
answers.get('/:Email/:title', (req, res) => {
    db.sequelize.query("SELECT Questions.Question,Answers.Answer FROM Forms,"
    +"Questions,users,UserAnswers,Answers WHERE Questions.QuestionId=UserAnswers.QuestionId AND "+
    "UserAnswers.Email=users.Email AND Forms.FormId=Questions.FormId "+
    "AND UserAnswers.Email IN(:Email)",{
    replacements: {Email: req.params.Email},
    type: db.sequelize.QueryTypes.SELECT
    })
    .then(function(result){
        var qForm=result;
        if(result!=null){
        User.findOne({ where: {Email: req.params.Email }})
        .then(function(result){
            if(result){
            var userInfo={
                FirstName:result.FirstName,
                LastName:result.LastName,
                Gender:result.Gender,
                Email:req.params.Email,
                ProblemType:req.params.title
            }
            //console.log(userInfo.Gender);
            //console.log(qForm[0].Question);
            //JSON.stringify(userInfo);
            res.status(200).json({userInfo,qForm});
        }
        else{
            res.status(404).json("not found..")
        }
        })
       }else{
           res.status(404).json("not found..")
       }

    })

});

function addAnswers(req){
    db.sequelize.query("SELECT * FROM Answers ORDER BY AnswerId DESC LIMIT 1",
        {
          type: db.sequelize.QueryTypes.SELECT
        }) 
          .then(function(result){
                 //console.log(result[0].AnswerId);
                 if(result==null){id=1}
                 var id=result[0].AnswerId+1;
                 for(i in req){
                    var formData=req;
                    UserAnswer.create({
                       Email:formData[i].Email,
                       QuestionId:formData[i].QuestionId,
                       AnswerId:id
                    });
                    id=id+1;
                }
                return "Ok";
            });
}

module.exports = answers