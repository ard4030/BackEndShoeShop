
const { ERRORING } = require("../../../utils/constans");
var mongoose = require('mongoose');
const { OrderModel } = require("../../../models/order");

class OrderController {

    async getAllOrders(req,res,next){
        try { 
            let { page, size, sort } = req.body;
            if (!page) {page = 1}
            if (!size) {size = 10;}
            const limit = parseInt(size);
            if (!page) {page = 1}
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit


            const count = await OrderModel.count()
            const result = await OrderModel.aggregate([
                {
                    $lookup: {
                       from: "addresses",
                       localField: "addressId",
                       foreignField: "_id",
                       as: "addRessDet"
                    }
                },
                {
                    $lookup: {
                    from: "postmethods",
                    localField: "postMethod",
                    foreignField: "_id",
                    as: "pestDet"
                    }
                } ,
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

    async deleteOrderOne(req,res,next){
        try {
            const {id} = req.body;
            const result = await OrderModel.deleteOne({_id:id})
            if(result.deletedCount == 0) throw ERRORING
            res.status(200).json({
                status:200,
                success:true,
                message:"سفارش با موفقیت حذف شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async updateStatus(req,res,next){
        try {
            const {tracking_code , status , id} = req.body;
            const result = await OrderModel.updateOne({_id:id},{
                $set:{tracking_code,status}
            })
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:'ویرایش با موفقیت انجام شد'
            })
        } catch (error) {
            next(error)
        }
    }


}

module.exports = {
    OrderController : new OrderController()
}