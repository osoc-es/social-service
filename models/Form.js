const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'Form',
  {
    FormId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    ConflictId: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)