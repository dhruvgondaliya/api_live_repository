const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const cart = sequelize.define('carts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            table: "details",
            field: 'id'
        }
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_discount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
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

module.exports = cart;