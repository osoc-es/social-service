const express = require('express')
const answers = express.Router()
const cors = require('cors')
const Answer = require('../models/Answer')
const User = require('../models/User')
const UserAnswer = require('../models/UserAnswer')
answers.use(cors())
const Sequelize = require('sequelize')
const db = require('../database/db.js')

answers.post('/:Email/:QuestionId/', (req, res) => {
    if(req.body.Answer!="" & req.body.Answer!=null & req.body.AnswerType!="" & req.body.AnswerType!=null){
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
        User.findOne({ where: {Email: req.params.Email }})
        .then(function(result){
            var userInfo={
                FirstName:result.FirstName,
                LastName:result.LastName,
                Gender:result.Gender,
                Email:req.params.Email,
                ProblemType:req.params.title
            }
            //console.log(userInfo.Gender);
            //console.log(qForm[0].Question);
            res.status(200).json({userInfo,qForm});
        })

    })
});


module.exports = answers