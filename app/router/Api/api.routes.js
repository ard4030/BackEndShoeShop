const { VerifyAccessToken, VerifyAccessToken1 } = require("../../http/middlewares/veryfyAccessToken");
const { peymentRouter } = require("./peyment");


const router = require("express").Router();

router.use("/peyment",VerifyAccessToken,peymentRouter)

module.exports = {
    ApiRoutes: router
}