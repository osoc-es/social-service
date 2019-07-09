const express = require('express')
const answers = express.Router()
const cors = require('cors')
const Answer = require('../models/Answer')
const UserAnswer = require('../models/UserAnswer')
answers.use(cors())

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

module.exports = answers