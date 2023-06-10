const { CommentController } = require("../../http/controllers/User/comment.controller");
const {VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");

const router = require("express").Router();

router.post("/addComment",VerifyAccessToken,CommentController.addComment) 


module.exports = {
    commentRouter : router
}