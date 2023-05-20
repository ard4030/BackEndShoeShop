const router = require("express").Router();
const { VizhegiController } = require("../../http/controllers/User/vizhegi.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");
const { vizhegiValidator, editVizhegiValidator, deleteVizhegiValidator } = require("../../http/validations/vizhegi");

router.post("/add",vizhegiValidator(),expressValidatorMapper,VizhegiController.add)
router.post("/edit",editVizhegiValidator(),expressValidatorMapper,VizhegiController.edit) 
router.post("/delete",deleteVizhegiValidator(),expressValidatorMapper,VizhegiController.delete) 

module.exports = {
    vizhegiRouter : router
}