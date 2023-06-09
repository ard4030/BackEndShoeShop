const { CommentController } = require("../../http/controllers/User/comment.controller");
const {VerifyAccessToken } = require("../../http/middlewares/veryfyAccessToken");

const router = require("express").Router();

router.post("/addComment",VerifyAccessToken,CommentController.addComment) 
router.post("/addQuestion",VerifyAccessToken,CommentController.addQuestion) 
router.post("/getQuestionsById",CommentController.getQuestionsById) 
router.get("/getCommentsUser",VerifyAccessToken,CommentController.getCommentsUser) 




module.exports = {
    commentRouter : router
}