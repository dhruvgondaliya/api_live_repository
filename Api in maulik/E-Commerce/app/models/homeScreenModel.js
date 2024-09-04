const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const home_screen = sequelize.define('home_screens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            table: "add_products",
            field: 'id'
        }
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_discription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_colour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_discount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    return_policy: {
        type: DataTypes.STRING,
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

module.exports = home_screen;