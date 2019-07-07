const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    Email: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    id: {
      type: Sequelize.INTEGER
    },
    Password: {
      type: Sequelize.STRING
    },
    FirstName: {
      type: Sequelize.STRING
    },
    LastName: {
      type: Sequelize.STRING
    },
    ContactNumber: {
      type: Sequelize.STRING,
    }
    ,
    Address: {
      type: Sequelize.STRING,
    }
    ,
    Gender: {
      type: Sequelize.TINYINT,
    }
    ,
    DOB: {
      type: Sequelize.DATE,
    }
  },
  {
    timestamps: false
  }
)
