const { DataTypes } = require("sequelize")

const { sequelize } = require("../util/database")

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    values: ["user", "admin"],
    defaultValue: "user",
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = User
