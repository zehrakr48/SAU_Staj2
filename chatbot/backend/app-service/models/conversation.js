const { DataTypes } = require("sequelize")

const { sequelize } = require("../util/database")
const User = require("./user")

const Conversation = sequelize.define("conversation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

User.hasMany(Conversation, { foreignKey: "userId", onDelete: "CASCADE" })
Conversation.belongsTo(User, { foreignKey: "userId" })

module.exports = Conversation
