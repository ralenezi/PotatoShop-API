const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer",
    },
  },
  {
    sequelize: db,
  }
);

User.beforeCreate(async (user) => {
  console.log("salty salt");
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

module.exports = User;
