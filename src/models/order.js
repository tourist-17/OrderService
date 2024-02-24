"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: "InProcess",
        values: ["InProcess", "Booked", "Cancelled", "Delivered"],
      },
      totalCost: { type: DataTypes.INTEGER, allowNull: false },
      productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      deliveryCharge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
