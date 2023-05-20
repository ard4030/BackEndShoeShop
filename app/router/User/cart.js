const router = require("express").Router();
const { CartController } = require("../../http/controllers/User/cart.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");
const { VerifyAccessToken1 , VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");
const { addToCartValidator, deleteItemCartValidator, addAndRemoveQValidator } = require("../../http/validations/cart");


router.post("/addToCart",addToCartValidator(),CartController.addToCart) 
router.post("/getCart",CartController.getCart) 
router.post("/getCart1",VerifyAccessToken,CartController.getCart1) 
router.post("/deleteItemCart",deleteItemCartValidator(),CartController.deleteItemCart) 
router.post("/deleteAllItems",CartController.deleteAllItems) 
// router.post("/editItem",CartController.editItem) 
router.post("/addQuantity",addAndRemoveQValidator(),CartController.addQuantity) 
router.post("/deleteQuantity",addAndRemoveQValidator(),CartController.deleteQuantity) 


module.exports = {
    cartRouter : router
}