const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'ProblemFeeback',
  {
    FeedbackId: {
      type: Sequelize.INTEGER
    },
    ConflictId: {
      type: Sequelize.INTEGER
    },
    Email: {
      type: Sequelize.STRING
    } 
  },
  {
    timestamps: false
  }
)