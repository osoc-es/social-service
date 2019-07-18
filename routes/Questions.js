const express = require('express')
const questions = express.Router()
const cors = require('cors')
const Question = require('../models/Question')
const Option = require('../models/Option')
const Form = require('../models/Form') 
questions.use(cors())

//adding new Question into form
questions.post('/add/:FormId/', (req, res) => {
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
                        //adding options for question
                        Option.create(optionData)
                        /*.then(function(option){
                            if(option){
                                res.status(200).json("Question added successfully.")  
                            }else{
                                res.status(400).json("Something wrong with options..")  
                            }

                        })*/
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
//Get questioner for particular problem
    questions.get('/:FormId/', (req, res) => {
        Question.findAll({ where: {FormId: req.params.FormId }, include: [Option]})
        .then(function(result){
            res.status(200).json(result);
        })
    });

//updating Question of form
questions.put('/update/:FormId/:QuestionId/', (req, res) => {
    var validateData=validateQuestion(req);
    if(validateData=="True")
    {
            Question.update(
                {
                    QustionType: req.body.QustionType,
                    Question: req.body.Question,
                    description: req.body.description,
                    isMandatory: req.body.isMandatory
                },
                {
                    returning:true,where:{QuestionId:req.params.QuestionId,FormId:req.params.FormId}
                }
            )
            .then(function(result){
                if(result){
                for (i = 0; i < req.body.Options.length; i++) {
                const optionData = {
                    OptionDescription: req.body.Options[i]
                }
                Option.update(optionData,{returning:true,where:{QuestionId:req.params.QuestionId}})
               /* .then(function(option){
                    if(option){
                        res.status(200).json("Question updated successfully.")  
                    }else{
                        res.status(400).json("Something wrong with options..")  
                    }
                })*/
                }
                res.status(200).json("Question updated successfully.")  
            }else{
                res.status(404).json("Question not found.")  
            }
              })
    }
    else
    {
        res.status(400).json(validateData);
    }
 

});
//validating question data
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
    