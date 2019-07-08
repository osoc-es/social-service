const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'Conflict',
  {
    ConflictId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    title: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)