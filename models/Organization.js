const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'Organization',
  {
    OrgId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    Name: {
      type: Sequelize.STRING
    },
    LogoUrl: {
      type: Sequelize.STRING
    },
    OrgUrl: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
