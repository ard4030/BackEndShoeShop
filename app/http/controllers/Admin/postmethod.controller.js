const { PostMethodModel } = require("../../../models/postmethod");
const { ERRORING } = require("../../../utils/constans");

class PostMethodController {

    async addMethod(req,res,next){
        try {
            const {name,price,status} = req.body;
            const result = await PostMethodModel.create({name,price,status});
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:'با موفقیت ایجاد شد'
            })
        } catch (error) {
            next(error)
        }
    }

    async getMethods(req,res,next){
        const result = await PostMethodModel.find({});
        if(!result) throw ERRORING;
        return res.status(200).json({
           status:200,
           success:true,
           data:result
        })
    }

}

module.exports = {
    PostMethodController : new PostMethodController()
}