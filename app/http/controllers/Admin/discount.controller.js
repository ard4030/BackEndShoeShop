const { DiscountModel } = require("../../../models/discount");
const { OptionModel } = require("../../../models/option");
const { ProductModel } = require("../../../models/product");
const { ERRORING } = require("../../../utils/constans");

class DiscountController {

 async addDiscount(req,res,next){
    try {
        const {name,code,type,datec,datee,status,value} = req.body;
        
        const Here = await DiscountModel.findOne({name,code});
        if(Here) throw {status:200,success:false,message:'این کد تخفیف قبلا با این نام و کد ایجاد شده'}

        const result = await DiscountModel.create({
            name,code,type,value,start_date:datec,end_date:datee,status,userId:req.user._id
        })
        if(!result) throw ERRORING;
        return res.status(200).json({
            status:200,
            success:true,
            message:'با موفیت ایجاد شد'
        })
    } catch (error) {
        next(error)
    }
 }

 async getDiscounts(req,res,next){
    try {
        const result  = await DiscountModel.find({});
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

 async addProductDiscount(req,res,next){
    try {
        const {type,datec,datee,value,productId,shegeft} = req.body;
        const productUpdate = await ProductModel.updateOne(
            {_id:productId},
            {$set:{discount:{type,value:parseInt(value),start_date:datec,end_date:datee,shegeft:shegeft}}}
        )

        return res.status(200).json({
            status:200,
            success:true,
            message:"تخفیف با موفقیت لحاظ شد"
        })

    } catch (error) {
        next(error)
    }
 }

 async getDiscountProducts(req,res,next){
    try {
        const result = await ProductModel.find({ "discount.value": { $gt: 0 } })
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

 async deleteDiscountProduct(req,res,next){
    try {
        const {id} = req.body;
        const productUpdate = await ProductModel.updateOne(
            {_id:id},
            {$set:{discount:{type:"naghdi",value:parseInt(0),start_date:"",end_date:"",shegeft:false}}}
        )

        return res.status(200).json({
            status:200,
            success:true,
            message:"تخفیف محصول با موفقیت حذف شد"
        })

    } catch (error) {
        next(error)
    }
 }
    
}

module.exports = {
    DiscountController : new DiscountController()
}