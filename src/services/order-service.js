const { OrderRepository } = require("../repository/index");
const axios = require("axios");
const { PRODUCT_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors/index");

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  async createOrder(data) {
    try {
      const productId = data.productId;
      let fetchProductRequestURL = `${PRODUCT_SERVICE_PATH}/api/v1/product/${productId}`;
      const response = await axios.get(fetchProductRequestURL);
      const productData = response.data.data;
      let priceOfTheOrder = productData.price;
      if (data.productQuantity > productData.quantity) {
        throw new ServiceError(
          "Something went wrong in the order process",
          "Insufficient quantity of the Product"
        );
      }
      const totalCost = priceOfTheOrder * data.productQuantity;
      const orderPayload = { ...data, totalCost }; // adding new object(totalCost) to existinig (data) object
      const order = await this.orderRepository.create(orderPayload);
      const updateProductRequestURL = `${PRODUCT_SERVICE_PATH}/api/v1/product/${productId}`;
      await axios.patch(updateProductRequestURL, {
        quantity: productData.quantity - order.productQuantity,
      });
      const finalOrder = await this.orderRepository.updateStatus(order.id, {
        status: "Booked",
      });
      return finalOrder;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
  async cancelOrder(data) {
    try {
      const finalOrder = await this.orderRepository.updateStatus(
        data.params.id,
        {
          status: "Cancelled",
        }
      );
      return finalOrder;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
  async deliverOrder(data) {
    try {
      const finalOrder = await this.orderRepository.updateStatus(
        data.params.id,
        {
          status: "Delivered",
        }
      );
      return finalOrder;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async get(data) {
    try {
      const orderList = await this.orderRepository.get(data);
      return orderList;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = OrderService;
