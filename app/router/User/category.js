const { CategoryController } = require("../../http/controllers/User/category.controller");

const router = require("express").Router();


router.get("/getAllCategory",CategoryController.getAllCategory) 
router.get("/getAllCategory1",CategoryController.getAllCategory1) 
router.post("/getCategoryById",CategoryController.getCategoryById) 
router.get("/getCategoryWithCount",CategoryController.getCategoryWithCount) 



// router.post("/getParentsById",CategoryController.getParentsById) 


module.exports = {
    categoryRouter : router
}