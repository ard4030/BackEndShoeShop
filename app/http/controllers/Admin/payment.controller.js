
const { PaymentMethodModel } = require("../../../models/paymentmethod");
const { ERRORING } = require("../../../utils/constans");

class PaymentController {

    async getPayments(req,res,next){
        try {
            const result = await PaymentMethodModel.find({});
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

    async updateMethod(req,res,next){
        try {
            const {id,value} = req.body;
            const update = await PaymentMethodModel.updateOne({_id:id},{$set:{
                enable:value
            }})    
            if(!update) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:'با موفقیت ویرایش شد'
            })
        } catch (error) {
            next(error)
        }
    }

    
}

module.exports = {
    PaymentController : new PaymentController()
}