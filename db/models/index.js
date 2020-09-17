const Cookie = require("./Cookie");
const Bakery = require("./Bakery");
const User = require("./User");

Bakery.hasMany(Cookie, {
  foreignKey: { fieldName: "bakeryId", allowNull: false },
  as: "cookies",
});

Cookie.belongsTo(Bakery, { as: "bakery" });

User.hasOne(Bakery, { as: "bakery", foreignKey: "userId" });

Bakery.belongsTo(User, { as: "user" });

module.exports = {
  Cookie,
  Bakery,
  User,
};
