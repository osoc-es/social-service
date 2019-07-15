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
    ProjectId:{
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    } 
  },
  {
    timestamps: false
  }
)