const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'Question',
  {
    QuestionId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    FormId: {
      type: Sequelize.INTEGER
    },
    QustionType: {
      type: Sequelize.STRING
    },
    Question: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    isMandatory: {
      type: Sequelize.TINYINT
    }
  },
  {
    timestamps: false
  }
)
