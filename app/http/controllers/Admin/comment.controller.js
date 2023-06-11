const { CommentModel } = require("../../../models/comment");
const { QuestionModel } = require("../../../models/question");
const { ERRORING } = require("../../../utils/constans");

class CommentController {
    
    async getAllQuestions(req,res,next){
        try { 
            let { page, size, sort } = req.body;
            if (!page) {page = 1}
            if (!size) {size = 10;}
            const limit = parseInt(size);
            if (!page) {page = 1}
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit


            const count = await QuestionModel.count()
            const result = await QuestionModel.aggregate([
                
                { $sort : {_id: -1 } },
                { $limit : endIndex },
                { $skip : startIndex }

            ])
            if(!result) throw ERRORING
            res.status(200).json({
                status:200,
                success:true,
                data:result,
                page,
                size,
                count
            })
        } catch (error) {
            next(error)
        }
    }

    async updateQuestion(req,res,next){
        try {
            const {id,message,responseMessage,status} = req.body;
            const result = await QuestionModel.updateOne({_id:id},{$set:{
                message,responseMessage,status,userResponseId:req.user._id
            }})
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:"سوال با موفقیت ویرایش شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteItem(req,res,next){
        try {
            const {id} = req.body;
            const result = await QuestionModel.deleteOne({_id:id});
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:"سوال با موفقیت حذف شد"
            })
        } catch (error) {
            next(error)
        }
    }

    // Comments
    async getAllComments(req,res,next){
        try { 
            let { page, size, sort } = req.body;
            if (!page) {page = 1}
            if (!size) {size = 10;}
            const limit = parseInt(size);
            if (!page) {page = 1}
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit


            const count = await CommentModel.count()
            const result = await CommentModel.aggregate([
                
                { $sort : {_id: -1 } },
                { $limit : endIndex },
                { $skip : startIndex }

            ])
            if(!result) throw ERRORING
            res.status(200).json({
                status:200,
                success:true,
                data:result,
                page,
                size,
                count
            })
        } catch (error) {
            next(error)
        }
    }

    async updateComment(req,res,next){
        try {
            const {id,message,rate,status,noavari,keyfiat,emkanat,sohoolat,arzesh} = req.body;
            const result = await CommentModel.updateOne({_id:id},{$set:{
                message,rate,status,noavari,keyfiat,emkanat,sohoolat,arzesh
            }})
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:"سوال با موفقیت ویرایش شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req,res,next){
        try {
            const {id} = req.body;
            const result = await CommentModel.deleteOne({_id:id});
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:"سوال با موفقیت حذف شد"
            })
        } catch (error) {
            next(error)
        }
    }


    
}

module.exports = {
    CommentController : new CommentController()
}