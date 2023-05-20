
const { ApisModel } = require("../../../models/apis");
const { ERRORING } = require("../../../utils/constans");

class ApisController {

    async add(req,res,next){
        try {
            let {title,description,address,method,example,category} = req.body;
            const result = await ApisModel.create({title,description,address,method,example,category})
            if(!result) throw {status:400,message:"خطا در ایجاد api"}
            return res.status(200).json({
                status:200,
                success:true,
                message:" api با موفقیت ایجاد شد"
            })  
        } catch (error) {
            next(error)
        }
        
    }

    async getAll(req,res,next){
        try {
            const result = await ApisModel.find({});
            if(!result ) throw ERRORING;
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
    ApisController : new ApisController()
}