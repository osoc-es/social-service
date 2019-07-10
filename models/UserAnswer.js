const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'UserAnswer',
  {
    Email: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    QuestionId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    AnswerId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    } 
  },
  {
    timestamps: false
  }
)