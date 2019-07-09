const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'UserAnswer',
  {
    Email: {
      type: Sequelize.STRING
    },
    QuestionId: {
      type: Sequelize.INTEGER
    },
    AnswerId: {
      type: Sequelize.INTEGER
    } 
  },
  {
    timestamps: false
  }
)