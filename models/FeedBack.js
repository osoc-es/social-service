const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'FeedBack',
  {
    FeedbackId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    feedback: {
      type: Sequelize.STRING
    },
    sequenceNumber: {
      type: Sequelize.INTEGER
    } 
  },
  {
    timestamps: false
  }
)