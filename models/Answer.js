const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'Answer',
  {
    AnswerId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    Answer: {
      type: Sequelize.STRING
    },
    AnswerType: {
      type: Sequelize.STRING
    } 
  },
  {
    timestamps: false
  }
)