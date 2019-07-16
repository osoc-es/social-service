const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'Report',
  {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    Email: {
      type: Sequelize.STRING
    },
    ProblemType: {
      type: Sequelize.STRING
    },
    QuestionId: {
      type: Sequelize.INTEGER
    },
    Question: {
      type: Sequelize.STRING
    },
    Options: {
      type: Sequelize.STRING
    },
    Answer: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: false
  }
)
