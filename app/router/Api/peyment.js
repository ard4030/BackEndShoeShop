const { PeymentController } = require("../../http/controllers/Api/peyment.controller");
const { VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");
const { PayValidator } = require("../../http/validations/payment");


const router = require("express").Router();


router.post("/peyCartNextPay",PeymentController.peyCartNextPay) 
router.post("/verifyNextPay",PeymentController.verifyNextPay) 
router.post("/newCartNextPay",PayValidator(),PeymentController.newCartNextPay) 
router.post("/newVerifyNextPay",PeymentController.newVerifyNextPay) 



module.exports = {
    peymentRouter : router
}