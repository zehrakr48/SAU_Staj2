const { DataTypes } = require("sequelize")

const { sequelize } = require("../util/database")

const Prompt = sequelize.define("prompt", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
})

module.exports = Prompt
