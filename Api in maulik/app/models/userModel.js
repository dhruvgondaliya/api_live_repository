const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            table: "admin",
            field: 'id'
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
}, {
    timestamps: false,
});

module.exports = User;