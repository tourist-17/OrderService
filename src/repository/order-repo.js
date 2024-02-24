const { Order } = require("../models/index");
const { ValidationError, AppError } = require("../utils/errors/index");
const { StatusCodes } = require("http-status-code");

class OrderRepository {
  async create(data) {
    try {
      const order = await Order.create(data);
      return order;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot Create Order",
        "There was some issue creating the order, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateStatus(orderId, data) {
    try {
      const order = await Order.findByPk(orderId);
      if (data.status) {
        order.status = data.status;
      }
      await order.save();
      return order;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot update Order",
        "There was some issue updating the order, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async get(data) {
    try {
      const orderList = await Order.findAll({
        where:{
            userId:data.userId
        }
      });
      return orderList;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot Fetch Order",
        "There was some issue in fetching the order, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = OrderRepository;
