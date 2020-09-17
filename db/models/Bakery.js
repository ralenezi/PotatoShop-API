const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Bakery extends Model {}

Bakery.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Bakery;
