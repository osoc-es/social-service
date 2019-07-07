const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'usertype',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    title: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)
