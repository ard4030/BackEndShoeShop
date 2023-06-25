const router = require("express").Router();

const { AuthController } = require("../http/controllers/User/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { VerifyAccessToken } = require("../http/middlewares/veryfyAccessToken");
const { numberValidator } = require("../http/validations/auth");

router.post("/getOtp",numberValidator(),expressValidatorMapper,AuthController.getOtp) 
router.post("/checkOtp",numberValidator(),expressValidatorMapper,AuthController.checkOtp)
router.get("/isLogin",VerifyAccessToken,AuthController.isLogin)
router.get("/logOut",VerifyAccessToken,AuthController.logOut)
router.get("/david",AuthController.david)
router.post("/updateDetail",VerifyAccessToken,AuthController.updateDetail)



module.exports = {
    authRouter : router
}