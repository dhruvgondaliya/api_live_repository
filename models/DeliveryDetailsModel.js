const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const delivery_detail = sequelize.define('delivery_details', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            table: "carts",
            field: 'id'
        }
    },
    your_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_price: {
        type: DataTypes.INTEGER,
        allowNull: false
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

module.exports = delivery_detail;