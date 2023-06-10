const { OptionController } = require("../../http/controllers/Admin/option.controller");

const router = require("express").Router();

router.post("/addSliderTop",OptionController.addSliderTop)
router.get("/getSliderTop",OptionController.getSliderTop)
router.post("/updateSliderTop",OptionController.updateSliderTop)
router.post("/deleteItem",OptionController.deleteItem)
router.post("/initSettingsWebsite",OptionController.initSettingsWebsite)
router.post("/initSettingsWebsite1",OptionController.initSettingsWebsite1)
router.post("/initSettingsWebsite2",OptionController.initSettingsWebsite2)
router.post("/initSettingsWebsite3",OptionController.initSettingsWebsite3)
router.post("/initSettingsWebsite4",OptionController.initSettingsWebsite4)

router.post("/getOptionByname",OptionController.getOptionByname)
router.post("/addArticle",OptionController.addArticle)
router.post("/getArticles",OptionController.getArticles)



module.exports = {
    optionRouter : router
}