const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'UserAnswer',
  {
    Email: {
      type: Sequelize.INTEGER
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