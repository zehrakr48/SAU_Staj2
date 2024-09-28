const { DataTypes } = require("sequelize")

const { sequelize } = require("../util/database")

const Info = sequelize.define("info", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text: {
    type: DataTypes.STRING(4000),
    allowNull: false,
  },
})

module.exports = Info
