const { PostMethodModel } = require("../../../models/postmethod");
const { ERRORING } = require("../../../utils/constans");

class PostMethodController {

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