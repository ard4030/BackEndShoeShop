const router = require("express").Router();
const { AuthController } = require("../../http/controllers/User/auth.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");



// router.post("/setAccess",AuthController.setAccess)
// router.post("/deleteAccess",AuthController.deleteAccess)



module.exports = {
    userRouter : router
}