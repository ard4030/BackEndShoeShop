const router = require("express").Router();

const { ProductController } = require("../../http/controllers/User/product.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");

router.post("/getProductById",ProductController.getProductById) 
router.post("/getAllProducts",ProductController.getAllProducts)
router.get("/getMostSaleProduct",ProductController.getMostSaleProduct)





module.exports = {
    productRouter : router
}