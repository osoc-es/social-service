const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('ALJ1CcyGFk', 'ALJ1CcyGFk', 'vHt6eSaTeP', {
  host: 'remotemysql.com',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
/*sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })*/
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
