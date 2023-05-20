const { PaymentController } = require("../../http/controllers/Admin/payment.controller");

const router = require("express").Router();

router.get("/getPayments",PaymentController.getPayments)
router.post("/updateMethod",PaymentController.updateMethod)

module.exports = {
    paymentRouter : router
}