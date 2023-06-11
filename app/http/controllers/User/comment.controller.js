const { default: mongoose } = require("mongoose");
const { CommentModel } = require("../../../models/comment");
const { QuestionModel } = require("../../../models/question");
const { ERRORING } = require("../../../utils/constans");

class CommentController {
    
    async addComment(req,res,next){
        try {
            const {
                productId,
                rating,keyfiat,arzesh,noavari,emkanat,sohoolat,ghovat,zaf,
                message,mofid,
            } = req.body;
 
            const result = await CommentModel.findOneAndUpdate({userId:req.user._id,productId},{$set:{
                rate:rating,keyfiat,arzesh,noavari,emkanat,sohoolat,ghovat,zaf,
                message,mofid,userId:req.user._id,productId
            }},{ upsert: true, new: true })

            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:"نظر شما با موفقیت ثبت شد !"
            })
        } catch (error) {
            next(error)
        }
    }

    async addQuestion(req,res,next){
        try {
            const {message,productId} = req.body;
            const result = await QuestionModel.create({
                userId:req.user._id,
                message,productId
            });
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:"سوال شما با موفقیت ثبت شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async getQuestionsById(req,res,next){
        try {
            const {productId} = req.body;
            const result = await QuestionModel.aggregate([
                {
                    $match:{productId:mongoose.Types.ObjectId(productId),status:"publish"}
                },
                {
                    $lookup:{
                        from:"users",
                        localField:"userId",
                        foreignField:"_id",
                        as:"user"
                    }
                },
                {
                    $lookup:{
                        from:"users",
                        localField:"userResponseId",
                        foreignField:"_id",
                        as:"userRes"
                    }
                },
                {
                    $addFields: {
                        "name": { $arrayElemAt: ["$user.firts_name", 0] },
                        "nameRes": { $arrayElemAt: ["$userRes.firts_name", 0] },
                    }
                },
                {
                    $project: {
                        "user": 0,
                        "userId": 0,
                        "userRes":0,
                        "userResponseId":0
                    }
                }
            ])
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                data:result
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    CommentController : new CommentController()
}