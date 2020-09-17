const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Cookie extends Model {}

Cookie.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Cookie;
