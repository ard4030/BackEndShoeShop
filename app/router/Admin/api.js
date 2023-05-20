const { ApisController } = require("../../http/controllers/Admin/apis.controller");

const router = require("express").Router();

router.post("/add",ApisController.add)
router.post("/getAll",ApisController.getAll)

module.exports = {
    apisRouter : router
}