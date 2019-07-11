const express = require('express')
const feedbacks = express.Router()
const cors = require('cors')
const FeedBack = require('../models/FeedBack')
const ProblemFeedback = require('../models/ProblemFeedback')
feedbacks.use(cors())

feedbacks.post('/:Email/:ConflictId/', (req, res) => {
    if(req.body.feedback!="" & req.body.feedback!=null ){
        var data={
            feedback:req.body.feedback,
            sequenceNumber:req.body.sequenceNumber
        }
        FeedBack.create(data)
         .then(function(result){
             if(result){
                ProblemFeedback.create({
                 FeedbackId:result.FeedbackId,
                 ConflictId:req.params.ConflictId,
                 Email:req.params.Email
                }).then(function(result){
                    if(result){
                        res.status(200).json("FeedBack Submitted Sucessfully..!!")
                    }
                    else{
                        res.status(400).json("Something wen wrong..!!")
                    }
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

module.exports = feedbacks

