const { PeymentController } = require("../../http/controllers/Api/peyment.controller");

const router = require("express").Router();


router.post("/peyCartNextPay",PeymentController.peyCartNextPay) 
router.post("/verifyNextPay",PeymentController.verifyNextPay) 


module.exports = {
    peymentRouter : router
}