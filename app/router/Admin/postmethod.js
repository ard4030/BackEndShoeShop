const router = require("express").Router();

const { PostMethodController } = require("../../http/controllers/Admin/postmethod.controller");
const { ProductController } = require("../../http/controllers/Admin/product.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");
const { productValidator } = require("../../http/validations/product");


router.post("/addMethod",PostMethodController.addMethod)
router.get("/getMethods",PostMethodController.getMethods)




module.exports = {
    postMethodRouter : router
}