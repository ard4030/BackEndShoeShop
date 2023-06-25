const router = require("express").Router();

const { ProductController } = require("../../http/controllers/User/product.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");
const { VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");

router.post("/getProductById",ProductController.getProductById) 
router.post("/getAllProducts",ProductController.getAllProducts)
router.get("/getMostSaleProduct",ProductController.getMostSaleProduct)
router.get("/getBooksProduct",VerifyAccessToken,ProductController.getBooksProduct)






module.exports = {
    productRouter : router
}