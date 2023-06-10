const { CommentModel } = require("../../../models/comment");
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
}

module.exports = {
    CommentController : new CommentController()
}