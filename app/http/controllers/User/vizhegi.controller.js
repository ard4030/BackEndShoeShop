const { VizhegiModel } = require("../../../models/vizhegi");

class VizhegiController {

    async add(req,res,next){
        try {
            const {p_name,e_name,catId} = req.body;
            const result = await VizhegiModel.create({p_name,e_name,category:catId})
            if(!result) throw {status:400,success:false,message:"خطا در ایجاد ویژگی"}
            return res.status(200).json({
                status:200,
                success:true,
                message:"ویژگی با موفقیت ایجاد شد"
            })
        } catch (error) {
            next(error)
        }
        
    }

    async edit(req,res,next){
        try {
            const {p_name,e_name,catId,id} = req.body;
            const result = await VizhegiModel.updateOne({_id:id} , {$set:{p_name,e_name,category:catId}})
            if(!result) throw {status:400,success:false,message:"خطا "}
            return res.status(200).json({
                status:200,
                success:true,
                message:"ویژگی با موفقیت ویرایش شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async delete(req,res,next){
        try {
            const {id} = req.body;
            const result = await VizhegiModel.deleteOne({_id:id})
            if(!result) throw {status:400,success:false,message:"خطا "}
            return res.status(200).json({
                status:200,
                success:true,
                message:"ویژگی با موفقیت حذف شد"
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    VizhegiController : new VizhegiController()
}