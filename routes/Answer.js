const express = require('express')
const answers = express.Router()
const cors = require('cors')
const Answer = require('../models/Answer')
const User = require('../models/User')
const UserAnswer = require('../models/UserAnswer')
answers.use(cors())
const Sequelize = require('sequelize')
const db = require('../database/db.js')
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

answers.post('/submit/', (req, res) => {
    var data;
    for(i in req.body.data){
        var formData=req.body.data;
        var data={
            Answer:formData[i].Answer,
            AnswerType:formData[i].AnswerType,
            Email:formData[i].Email,
            QuestionId:formData[i].QuestionId
        }
     }   
     res.status(200).send(data);
    /* if(req.body.Answer!="" & req.body.Answer!=null & req.body.AnswerType!="" & req.body.AnswerType!=null){
        var data={
            Answer:req.body.Answer,
            AnswerType:req.body.AnswerType
        }
        Answer.create(data)
         .then(function(result){
             if(result){
                UserAnswer.create({
                 Email:req.params.Email,
                 QuestionId:req.params.QuestionId,
                 AnswerId:result.AnswerId
                }).then(function(result){
                    res.status(200).json("Answer Submitted Sucessfully..!!")
                })
             }
             else{
                 res.status(409).json("something went wrong");
             }
         })
         .catch(err => {
            res.status(400).json('error: ' + err)
          })
    }else{
        res.status(400).send("Invlaid data.")
    }
  */
});
//get submitted answers
answers.get('/:Email/:title', (req, res) => {
    db.sequelize.query("SELECT DISTINCT Questions.Question,Answers.Answer FROM Forms,"
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
module.exports = answers