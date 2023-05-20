const router = require("express").Router();

const { OrderController } = require("../../http/controllers/Admin/order.controller");


router.post("/getAllOrders",OrderController.getAllOrders)
router.post("/deleteOrderOne",OrderController.deleteOrderOne)
router.post("/updateStatus",OrderController.updateStatus)

// router.get("/getDiscounts",DiscountController.getDiscounts)


module.exports = {
    orderRouter : router
}