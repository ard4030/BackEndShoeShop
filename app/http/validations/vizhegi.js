
const {body} = require("express-validator");  

function vizhegiValidator() {
    return [
        body("p_name").isLength({min:2,max:100}).withMessage("نام ویژگی را وارد کنید"),
        body("catId").isLength({min:5,max:40}).withMessage("شناسه دسته بندی ویژگی نادرست"),
    ]
}

function editVizhegiValidator() {
    return [
        body("p_name").isLength({min:2,max:100}).withMessage("نام ویژگی را وارد کنید"),
        body("catId").isLength({min:5,max:40}).withMessage("شناسه دسته بندی ویژگی نادرست"),
        body("id").isLength({min:5,max:40}).withMessage("شناسه ویژگی نادرست"),
    ]
}

function deleteVizhegiValidator() {
    return [
        body("id").isLength({min:5,max:40}).withMessage("شناسه ویژگی نادرست"),
    ]
}


module.exports = {
    vizhegiValidator,
    editVizhegiValidator,
    deleteVizhegiValidator
}