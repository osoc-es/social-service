const express = require('express')
const questions = express.Router()
const cors = require('cors')
const Question = require('../models/Question')
const Option = require('../models/Option')
const Form = require('../models/Form') 
questions.use(cors())

//creating new Question
questions.post('/add/:FormId', (req, res) => {
        var validateData=validateQuestion(req);
        if(validateData=="True")
        {
            Form.findOne({
            where: {
            FormId: req.params.FormId
             }
          }).then(function(form){
              if(form){
                const questionData = {
                    FormId: req.params.FormId,
                    QustionType: req.body.QustionType,
                    Question: req.body.Question,
                    description: req.body.description,
                    isMandatory: req.body.isMandatory
                    };
                    Question.create(questionData)
                    .then(function(result){
                        for (i = 0; i < req.body.Options.length; i++) {
                        const optionData = {
                            QuestionId: result.QuestionId,
                            OptionDescription: req.body.Options[i]
                        };
                        Option.create(optionData)
                        }
                        res.status(200).json("Question added successfully.")  
                      })
              }
              else{
                res.status(404).json("Form Not found.");
              }
          })
          .catch(err => {
            res.status(400).json('error: ' + err)
          })
        }
        else
        {
            res.status(400).json(validateData);
        }
     
    });
//Get questioner for form
    questions.get('/:FormId', (req, res) => {
        Question.findAll({ where: {FormId: req.params.FormId }, include: [Option]})
        .then(function(result){
            res.status(200).json(result);
        })
    });
    function validateQuestion(req){
        if(req.params.FormId==""||req.params.FormId==null){
            return "FormId can not empty."
        }
        else if(req.body.QustionType==""||req.body.QustionType==null){
            return "QustionType can not empty."
        }
        else if(req.body.Question==""||req.body.Question==null){
            return "Question can not empty."
        }
        else if(req.body.isMandatory==""||req.body.isMandatory==null){
            return "Mandatory field can not empty."
        }
        else if(req.body.Options.length==0||req.body.Options==null){
            return "Provide Option for Question"
        }
        else{
            return "True";
        }
    }
    Question.hasMany(Option,{foreignKey: 'QuestionId'});
    Option.belongsTo(Question,{foreignKey: 'QuestionId'});
    module.exports = questions
    