const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'Project',
  {
    ProjectId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    OrgId: {
      type: Sequelize.INTEGER
    },
    Description: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
