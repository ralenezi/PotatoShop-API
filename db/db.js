const { Sequelize } = require('sequelize')

const db = new Sequelize({
  username: 'rahaf',
  password: '',
  database: 'my_db',
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
})

module.exports = db
