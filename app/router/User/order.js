const { OrderController } = require("../../http/controllers/User/order.controller");
const {VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");

const router = require("express").Router();

router.get("/getOrder",VerifyAccessToken,OrderController.getOrder) 
router.post("/createOrder",VerifyAccessToken,OrderController.createOrder) 
router.post("/checkDiscount",VerifyAccessToken,OrderController.checkDiscount) 
router.post("/checkOrder",VerifyAccessToken,OrderController.checkOrder) 
router.post("/getPostPrice",VerifyAccessToken,OrderController.getPostPrice) 


module.exports = {
    orderRouter : router
}