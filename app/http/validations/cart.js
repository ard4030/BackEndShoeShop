
const {body} = require("express-validator");  
const mongoose = require('mongoose');

function addToCartValidator() {
    return [
        body("p_name").isLength({min:2,max:25}).withMessage("نام فارسی حداقل 2 و حداکثر 50 کاراکتر"),
        body("e_name").isLength({min:2,max:25}).withMessage("نام انگلیسی حداقل 2 و حداکثر 50 کاراکتر"),
        body("productId").custom((value, ctx) => {
            if(!value) throw "شناسه محصول ارسال نشده";
            ObjectId = mongoose.Types.ObjectId;
            if(!ObjectId.isValid(value)) throw "شناسه محصول صحیح نیست"
            return true
        }),
        body("addonItem").isArray().withMessage("نوع آیتم های اضافی باید آرایه باشد")
    ]
}

function deleteItemCartValidator() {
    return [
        body("productId").custom((value, ctx) => {
            if(!value) throw "شناسه ارسال نشده";
            ObjectId = mongoose.Types.ObjectId;
            if(!ObjectId.isValid(value)) throw "شناسه صحیح نیست"
            return true
        }),
    ]
}

function addAndRemoveQValidator() {
    return [
        body("productId").custom((value, ctx) => {
            if(!value) throw "شناسه محصول ارسال نشده";
            ObjectId = mongoose.Types.ObjectId;
            if(!ObjectId.isValid(value)) throw "شناسه محصول صحیح نیست"
            return true
        }),
        body("addonItem").isArray().withMessage("نوع آیتم های اضافی باید آرایه باشد")
    ]
}

module.exports = {
    addToCartValidator,
    deleteItemCartValidator,
    addAndRemoveQValidator
}