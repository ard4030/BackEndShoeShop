
const {body} = require("express-validator");  
const mongoose = require('mongoose');

function productValidator() {
    return [
        body("p_name").isLength({min:2,max:100}).withMessage("نام فارسی حداقل 2 و حداکثر 50 کاراکتر"),
        body("e_name").isLength({min:2,max:100}).withMessage("نام انگلیسی حداقل 2 و حداکثر 50 کاراکتر"),
        body("category").custom((value, ctx) => {
            if(!value) throw "دسته بندی نمی تواند خالی باشد";
            ObjectId = mongoose.Types.ObjectId;
            if(!ObjectId.isValid(value)) throw "دسته بندی صحیح نیست"
            return true
        }),
        body("quantity").custom((value, ctx) => {
            if(value < 1) throw "حداقل تعداد محصول یک عدد . اگر محصول شامل آیتم های اضافی هست مقدار را 1 وارد کنید"
            return true
        }),
        // body("modes").isArray().withMessage("حتما باید آرایه باشه")
        

    ]
}


module.exports = {
    productValidator
}