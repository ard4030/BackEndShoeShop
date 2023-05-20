const router = require("express").Router();

const { DiscountController } = require("../../http/controllers/Admin/discount.controller");


router.post("/addDiscount",DiscountController.addDiscount)
router.get("/getDiscounts",DiscountController.getDiscounts)


module.exports = {
    discountRouter : router
}