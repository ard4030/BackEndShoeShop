const { VerifyAccessToken, VerifyAccessToken1 } = require("../../http/middlewares/veryfyAccessToken");
const { addressRouter } = require("./address");
const { cartRouter } = require("./cart");
const { categoryRouter } = require("./category");
const { commentRouter } = require("./comments");
const { optionRouter } = require("./option");
const { orderRouter } = require("./order");
const { paymentRouter } = require("./payment");
const { postRouter } = require("./post");
const { productRouter } = require("./product");
const { vizhegiRouter } = require("./vizhegi");


const router = require("express").Router();

router.use("/category",categoryRouter)
router.use("/product",productRouter)
// router.use("/vizhegi",vizhegiRouter)
router.use("/cart",cartRouter)
router.use("/address",addressRouter)
router.use("/order",orderRouter)
router.use("/payment",paymentRouter)
router.use("/post",postRouter)
router.use("/option",optionRouter)
router.use("/comment",commentRouter)




module.exports = {
    UserRoutes: router
}