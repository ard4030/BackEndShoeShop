const router = require("express").Router();

const { ProductController } = require("../../http/controllers/Admin/product.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");
const { productValidator } = require("../../http/validations/product");
const { uploader, convertToWebp } = require("../../modules/sharp");


router.post("/addProduct",productValidator(),expressValidatorMapper,ProductController.add)
router.post("/getAllProducts",ProductController.getAllProducts)
router.post("/deleteProductOne",ProductController.deleteProductOne)
router.post("/deleteManyProducts",ProductController.deleteManyProducts)
router.post("/getProductByFilter",ProductController.getProductByFilter)
router.post("/uploadImages",uploader.array('images'),ProductController.uploadImages)


module.exports = {
    productRouter : router
}