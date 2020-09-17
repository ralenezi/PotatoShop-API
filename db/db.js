const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "",
  database: "my_db",
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;
