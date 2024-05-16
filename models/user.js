const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  is_premium_user: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
});

module.exports = User;
