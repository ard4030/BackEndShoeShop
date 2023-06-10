const router = require("express").Router();

const { DiscountController } = require("../../http/controllers/Admin/discount.controller");


router.post("/addDiscount",DiscountController.addDiscount)
router.get("/getDiscounts",DiscountController.getDiscounts)
router.post("/addProductDiscount",DiscountController.addProductDiscount)
router.get("/getDiscountProducts",DiscountController.getDiscountProducts)
router.post("/deleteDiscountProduct",DiscountController.deleteDiscountProduct)

module.exports = {
    discountRouter : router
}