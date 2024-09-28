const Sequelize = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize("test", "test", process.env.DATABASE_PASSWORD, {
  dialect: "mssql",
  host: process.env.DATABASE_HOST,
})

async function syncDatabase() {
  try {
    await sequelize.sync({}) // `force: true` will drop the table if it already exists
    console.log("Database & tables created!")
  } catch (error) {
    console.error("Error syncing database:", error)
    throw error // re-throw the error to be caught by the outer catch block
  }
}

module.exports = { sequelize, syncDatabase }
