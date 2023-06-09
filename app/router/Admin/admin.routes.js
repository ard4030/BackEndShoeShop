const { requireRole } = require("../../http/middlewares/accessRole");
const { VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");
const { ADMIN, SUPERADMIN, ORDER } = require("../../utils/cdcdv");
const { apisRouter } = require("./api");
const { categoryRouter } = require("./category");
const { commentRouter } = require("./comment");
const { discountRouter } = require("./discount");
const { initialRouter } = require("./initial");
const { optionRouter } = require("./option");
const { orderRouter } = require("./order");
const { paymentRouter } = require("./payment");
const { postMethodRouter } = require("./postmethod");
const { productRouter } = require("./product");
const { uploadRouter } = require("./upload");
const { userRouter } = require("./users");

const router = require("express").Router();

router.use("/category",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),categoryRouter)
router.use("/product",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),productRouter)
router.use("/user",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),userRouter)
router.use("/postmethod",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),postMethodRouter)
router.use("/discount",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),discountRouter)
router.use("/init",VerifyAccessToken,requireRole([SUPERADMIN]),initialRouter)
router.use("/payment",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),paymentRouter)
router.use("/order",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN,ORDER]),orderRouter)
router.use("/upload",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),uploadRouter)
router.use("/apis",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),apisRouter)
router.use("/option",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),optionRouter)
router.use("/comment",VerifyAccessToken,requireRole([SUPERADMIN,ADMIN]),commentRouter)


module.exports = {
    AdminRoutes: router
}