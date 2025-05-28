const { Sequelize } = require('sequelize')
require('dotenv').config();

const connection = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASSWORD, {
    host: process.env.HOST_NAME,
    dialect: process.env.DATABASE_TYPE
})

function testConnection() {
    try{
        connection.authenticate()
        console.log('success connected to database')
    } catch (err) {
        console.error('database error: ' + err)
    }
}

testConnection()

module.exports = connection;