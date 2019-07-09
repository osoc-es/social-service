const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'Option',
  {
    OptionId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    QuestionId: {
      type: Sequelize.INTEGER
    },
    OptionDescription: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)