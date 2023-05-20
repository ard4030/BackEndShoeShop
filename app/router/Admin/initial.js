const { InitialController } = require("../../http/controllers/Admin/initial.controller");

const router = require("express").Router();

router.post("/initPayment",InitialController.initialPaymentMethods)


module.exports = {
    initialRouter : router
}