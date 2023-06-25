const { default: mongoose } = require("mongoose");
const { CartModel } = require("../../../models/cart");
const { DiscountModel } = require("../../../models/discount");
const { OrderModel } = require("../../../models/order");
const { PostMethodModel } = require("../../../models/postmethod");
const { ERRORING } = require("../../../utils/constans");
const moment = require('moment');
const { AddressModel } = require("../../../models/address");

class OrderController {

    async getOrder(req,res,next){
        try {

            const deviceid = req.cookies['deviceId'];
            const userId = req.user._id;

            const result  = await CartModel.aggregate([
                {
                    $match:{deviceId:mongoose.Types.ObjectId(deviceid)}
                }, 
                {
                    $group: {
                      _id: '$deviceId',
                      total: {
                        $sum: "$totalPrice"
                      }
                    }
                },
                {
                    $lookup: {
                       from: "carts",
                       localField: "_id",
                       foreignField: "deviceId",
                       as: "userDetails"
                    }
                },
                {
                    $addFields: {
                       userDetails: "$userDetails",
                    }
                },
            ]);

            const order = await OrderModel.aggregate([
                {
                    $match :{userId,success:false}
                },
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
                }     
            ])



            if(result.length > 0){
                let totalAllPrice = result[0].total + order[0].pestDet[0].price;
                if(order[0].discount){
                    if(order[0].discount.type === 'naghdi'){
                        totalAllPrice = parseInt(totalAllPrice) - parseInt(order[0].discount.price);
                    }else{
                        totalAllPrice = parseInt(totalAllPrice) - ((parseInt(totalAllPrice)*30) / 100);
                    }
                }

                const data = {
                    orderId:order[0]._id,
                    userDetails:result[0].userDetails,
                    total:result[0].total,
                    address:order[0].addRessDet,
                    postMethod:order[0].pestDet,
                    status:order[0].status,
                    success:order[0].success,
                    step:order[0].step,
                    discount:order[0].discount,
                    totalAllPrice
                }

                res.status(200).json({
                    status:200,
                    success:true,
                    data:data
                })


            }else{
                res.status(200).json({
                    status:200,
                    success:false,
                    data:null
                })
            }

            
            
        } catch (error) {
            next(error)
        }
    }

    async createOrder(req,res,next){
        try {
            const {addressId,postMethod} = req.body;
            const saveOrder = await OrderModel.findOne({userId:req.user._id,success:false});

            if(saveOrder){
                await OrderModel.updateOne({userId:req.user._id,success:false} , {
                    $set:{addressId,postMethod}
                })

            }else{
                await OrderModel.create({
                    userId:req.user._id,
                    addressId,
                    postMethod
                })
            }

            res.status(200).json({
                status:200,
                success:true,
            })


        } catch (error) {
            next(error)
        }
    }

    async checkDiscount(req,res,next){
        try {
            const {code} = req.body;
            const result = await DiscountModel.findOne({code});

            if(result){
                if(result.status !== 'publish') throw {status:200,success:false,message:'کد وارد شده غیر فعال است'}

                // مقایسه تاریخ انقضا با تاریخ حال حاضر
                const expirationDate = moment(result.end_date);
                const currentDate = moment();
                if (expirationDate.isBefore(currentDate)) {
                    // کد تخفیف منقضی شده است
                    throw {status:200,success:false,message:'کد تخفیف وارد شده منقضی شده'}
                } else {
                    // const upd =  await OrderModel.updateOne({userId:req.user._id,success:false},{
                    //     $set:{
                    //         discount:{price:parseInt(result.value),type:result.type},
                    //     }
                    // })
                    // کد تخفیف هنوز معتبر است
                    return res.status(200).json({
                        status:200,
                        success:true,
                        message:'تخفیف با موفقیت لحاظ شد',
                        data:result
                    })
                }
            }else{
                throw res.status(200).json({status:200,success:false,message:'کد وارد شده صحیح نیست'})
            }

        } catch (error) {
            next(error)
        }
    }

    async checkOrder(req,res,next){
        try {
            const {amount , np_status , order_id , trans_id} = req.body;
            const userId = req.user._id;

            if(np_status && np_status === 'Unsuccessful'){
                const order = await OrderModel.findOne({userId,order_id,trans_id})
                return res.status(200).json({
                    status:200,
                    success:true,
                    data:order
                })
            }else if (np_status && np_status === 'OK'){
                const order = await OrderModel.findOne({userId,order_id,trans_id})
                return res.status(200).json({
                    status:200,
                    success:true,
                    data:order
                })
            }else{
                return res.status(200).json({
                    status:200,
                    success:true,
                    data:req.body
                })
            }
            
            
        } catch (error) {
            next(error)
        }
    }

    async getPostPrice(req,res,next){
        try {
            const postPrice = 10;
            return res.status(200).json({
                success:true,
                status:200,
                data:postPrice
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllOrders(req,res,next){
        try { 
            let { page, size, sort,name } = req.body;
            if (!page) {page = 1}
            if (!size) {size = 10;}
            const limit = parseInt(size);
            if (!page) {page = 1}
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit


            const count = await OrderModel.count({userId:req.user._id})
            const result = await OrderModel.aggregate([
                {
                    $match: {
                      userId:req.user._id
                    }
                },
                {
                    $lookup:{
                        from:"addresses",
                        localField:"addressId",
                        foreignField:"_id",
                        as:"addres"
                    }
                },
                {
                    $lookup:{
                        from:"paymentmethods",
                        localField:"paymentMethod",
                        foreignField:"_id",
                        as:"payMethod"
                    }
                },
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
    


}

module.exports = {
    OrderController : new OrderController()
}