const { CommentController } = require("../../http/controllers/Admin/comment.controller");

const router = require("express").Router();

router.post("/getAllQuestions",CommentController.getAllQuestions)
router.post("/updateQuestion",CommentController.updateQuestion)
router.post("/deleteItem",CommentController.deleteItem)

router.post("/getAllComments",CommentController.getAllComments)
router.post("/updateComment",CommentController.updateComment)
router.post("/deleteComment",CommentController.deleteComment)



module.exports = {
    commentRouter : router
}