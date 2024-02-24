const { OrderService } = require("../services/index");
const orderService = new OrderService();
const { StatusCodes } = require("http-status-codes");
// const { createChannel, publishMessage } = require("../utils/messageQueue");
// const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
class OrderController {
  constructor() {}
  //   async sendMessageToQueue(req, res) {
  //     const channel = await createChannel();
  //     const payload = {
  //       data: {
  //         subject: "This is noti from queue",
  //         content: "Some queue will subscribe this",
  //         recepientEmail: "yadsak00@gmail.com",
  //         notificationTime: "2024-02-15T11:02:48",
  //       },
  //       service: "CREATE_TICKET",
  //     };
  //     publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
  //     return res.status(200).json({
  //       message: "Successfully published the event",
  //     });
  //   }

  async create(req, res) {
    try {
      const response = await orderService.createOrder(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Successfully Placed Order",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }

  async cancelOrder(req, res) {
    try {
      const response = await orderService.cancelOrder(req);
      return res.status(StatusCodes.OK).json({
        message: "Successfully Cancel Order",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }

  async deliverOrder(req, res) {
    try {
      const response = await orderService.deliverOrder(req);
      return res.status(StatusCodes.OK).json({
        message: "Successfully Delivered Order",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }

  async get(req, res) {
    try {
      const response = await orderService.get(req.query);
      return res.status(StatusCodes.OK).json({
        message: "Successfully Fetched Order",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

module.exports = OrderController;
