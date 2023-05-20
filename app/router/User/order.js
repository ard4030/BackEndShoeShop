const { OrderController } = require("../../http/controllers/User/order.controller");
const {VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");

const router = require("express").Router();

router.post("/newOrder",VerifyAccessToken,OrderController.newOrder) 
router.post("/createOrder",VerifyAccessToken,OrderController.createOrder) 
router.post("/checkDiscount",VerifyAccessToken,OrderController.checkDiscount) 
router.post("/checkOrder",VerifyAccessToken,OrderController.checkOrder) 





module.exports = {
    orderRouter : router
}