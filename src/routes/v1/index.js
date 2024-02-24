const express = require("express");
const  OrderController  = require("../../controllers/order-controllers");
// const { createChannel } = require("../../utils/messageQueue");

// const channel = await createChannel();
const orderController = new OrderController();

const router = express.Router();

router.post("/order", orderController.create);
router.patch("/cancelOrder/:id", orderController.cancelOrder);
router.patch("/deliverorder/:id", orderController.deliverOrder);
router.get("/order", orderController.get);

// router.post("/publish", orderController.sendMessageToQueue);
router.get("/info", (req, res) => {
  return res.json({ message: "hitting routes of Orderservice" });
});

module.exports = router;
