
const {body} = require("express-validator");  

function categoryValidator() {
    return [
        body("title").isLength({min:2,max:25}).withMessage("دسته بندی حداقل 4 و حداکثر 10 کاراکتر"),
    ]
}

function categoryEditValidator() {
    return [
        body("title").isLength({min:2,max:25}).withMessage("دسته بندی حداقل 4 و حداکثر 10 کاراکتر"),
        body("id").isLength({min:5}).withMessage("شناسه دسته بندی معتبر نیست"),
        
    ]
}

function categoryDeleteValidator() {
    return [
        body("id").isLength({min:5}).withMessage("شناسه دسته بندی معتبر نیست"),  
    ]
}

module.exports = {
    categoryValidator,
    categoryEditValidator,
    categoryDeleteValidator
}