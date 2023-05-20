const router = require("express").Router();

const { PostMethodController } = require("../../http/controllers/Admin/postmethod.controller");

router.get("/getMethods",PostMethodController.getMethods)




module.exports = {
    postRouter : router
}