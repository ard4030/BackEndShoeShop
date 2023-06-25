const { PaymentController } = require("../../http/controllers/User/payment.controller");
const { VerifyAccessToken, VerifyAccessToken1 } = require("../../http/middlewares/veryfyAccessToken");

const router = require("express").Router();

router.get("/getPayments",PaymentController.getPayments)
router.post("/peyOrder",VerifyAccessToken,PaymentController.peyOrder)
router.post("/verifyNextPay",VerifyAccessToken,PaymentController.verifyNextPay)
router.get("/getStatusOrders",VerifyAccessToken,PaymentController.getStatusOrders)


module.exports = {
    paymentRouter : router
}