const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'ProblemFeeback',
  {
    FeedbackId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ConflictId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Email: {
      type: Sequelize.STRING,
      primaryKey: true
    } 
  },
  {
    timestamps: false
  }
)