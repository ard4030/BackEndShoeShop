const { UploadController } = require("../../http/controllers/Admin/upload.controller");

const router = require("express").Router();


router.post("/getAllImages",UploadController.getAllImages)
router.post("/deleteManyImages",UploadController.deleteManyImages)

module.exports = {
    uploadRouter : router
}