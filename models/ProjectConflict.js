const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'ProjectConflict',
  {
    ProjectId: {
      type: Sequelize.INTEGER
    },
    ConflictId: {
      type: Sequelize.INTEGER
    } 
  },
  {
    timestamps: false
  }
)