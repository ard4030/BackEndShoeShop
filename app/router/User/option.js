const {VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");
const { OptionController } = require("../../http/controllers/User/option.controller");
const router = require("express").Router();

router.get("/getSliderTop",OptionController.getSliderTop) 
router.get("/getHome",OptionController.getHome) 
router.post("/getArticleById",OptionController.getArticleById) 
router.post("/addBookmark",VerifyAccessToken,OptionController.addBookmark) 




module.exports = {
    optionRouter : router
}