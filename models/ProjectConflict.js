const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'ProjectConflict',
  {
    ProjectId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ConflictId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    } 
  },
  {
    timestamps: false
  }
)