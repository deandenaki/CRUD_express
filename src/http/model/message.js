const { Model, DataTypes } = require('sequelize')
const connection = require('../../connection')

class Message extends Model { }

Message.init(
    {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: connection,
        timestamps: false
    }
)

module.exports = Message;