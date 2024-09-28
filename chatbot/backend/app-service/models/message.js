const { DataTypes } = require("sequelize")

const { sequelize } = require("../util/database")
const Conversation = require("./conversation")

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING(4000),
    allowNull: false,
  },
})

Conversation.hasMany(Message, {
  foreignKey: "conversationId",
  onDelete: "CASCADE",
})
Message.belongsTo(Conversation, { foreignKey: "conversationId" })

module.exports = Message
