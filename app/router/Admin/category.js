const router = require("express").Router();

const { CategoryController } = require("../../http/controllers/Admin/category.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");
const { categoryValidator, categoryEditValidator , categoryDeleteValidator } = require("../../http/validations/category");


router.post("/addCategory",categoryValidator(),expressValidatorMapper,CategoryController.add) 
router.post("/editCategory",categoryEditValidator(),expressValidatorMapper,CategoryController.editCategory)
router.post("/deleteCategory",categoryDeleteValidator(),expressValidatorMapper,CategoryController.deleteCategory)
router.post("/addFeature",CategoryController.addFeature) 
router.post("/getFeatById",CategoryController.getFeat) 
router.post("/deleteFeatById",CategoryController.deleteFeatById) 

module.exports = {
    categoryRouter : router
}