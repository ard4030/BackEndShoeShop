const { VerifyAccessToken } = require("../http/middlewares/veryfyAccessToken")
const { authRouter } = require("./auth")
const { AdminRoutes } = require("./Admin/admin.routes")
const { UserRoutes } = require("./User/user.routes")
const { ApiRoutes } = require("./Api/api.routes")

const router = require("express").Router()

router.use("/auth",authRouter)
router.use("/admin",/*VerifyAccessToken*/ AdminRoutes)
router.use("/user", UserRoutes)
router.use("/api",VerifyAccessToken, ApiRoutes)


module.exports = {
    AllRoutes : router
}