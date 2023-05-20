
const { default: mongoose } = require("mongoose");
const { CartModel } = require("../../../models/cart");
const { OrderModel } = require("../../../models/order");
const { PaymentMethodModel } = require("../../../models/paymentmethod");
const { ERRORING } = require("../../../utils/constans");
var qs = require('qs');
var axios = require('axios');
const { ProductModel } = require("../../../models/product");

class PaymentController {

    async getPayments(req,res,next){
        try {
            const result = await PaymentMethodModel.find({enable:true});
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

    async peyOrder(req,res,next){
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

            if(!result || result.length < 1) throw ERRORING;

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

            return res.status(200).json({
                status:200,
                success:true,
                data:data
            })
        } catch (error) {
            next(error)
        }
    }

    async verifyNextPay(req,res,next){
        try {
            const {amount , np_status , order_id , trans_id} = req.body;
            const deviceId = req.cookies['deviceId']; 
            var data = qs.stringify({
                api_key: 'd167de99-cc29-4fdf-8955-830cf5ca67bd',
                amount: amount,
                trans_id: trans_id
            });
            var config = {
                method: 'post',
                url: 'https://nextpay.org/nx/gateway/verify',
                data : data
            };

            await axios(config)
            .then(async function (response) {
                if(parseInt(JSON.stringify(response.data.code)) === 0){
                    
                    const result = await OrderModel.findOneAndUpdate({order_id:response.data.order_id},{
                        $set:{
                            card: response.data.card_holder,
                            shaparakref:response.data.Shaparak_Ref_Id,
                            success:true,
                            status:'pay_complate'
                        }
                    });

                    for (const item of result.cartDetail.product) {
                        if (JSON.parse(item.addonItem).length > 0) {
                          for (const item1 of JSON.parse(item.addonItem)) {
                            const query = {
                              'addonItem.specs._id': item1._id
                            };
                            
                            const update = {
                              $inc: { 'addonItem.$[outer].specs.$[inner].quantity': -item.count }
                            };
                            
                            const options = {
                              arrayFilters: [
                                { 'outer.specs._id': item1._id },
                                { 'inner._id': item1._id }
                              ]
                            };
                            
                            try {
                              const updateResult = await ProductModel.updateOne(query, update, options);
                            //   console.log(updateResult);
                            } catch (err) {
                              console.log(err);
                            }
                          }
                        } else {
                          const updateQuan = await ProductModel.updateOne(
                            { "_id": item.productId },
                            { "$inc": { "quantity": -item.count } }
                          );
                        }
                    }

                    const clearBasket = await CartModel.deleteMany({deviceId:mongoose.Types.ObjectId(deviceId)})

                    if(!result) throw ERRORING;
                    return res.status(200).json({
                        status:200,
                        success:true,
                        message:'پرداخت موفق',
                        data:result
                    })
                }else{
                    const result = await OrderModel.findOneAndUpdate({order_id:response.data.order_id},{
                        $set:{
                            card: response.data.card_holder,
                            shaparakref:response.data.Shaparak_Ref_Id,
                            success:false
                        }
                    })


                    if(!result) throw ERRORING
                    return res.status(200).json({
                        status:200,
                        success:false,
                        message:'پرداخت ناموفق',
                        data:result
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                throw {status:400,success:false,message:error.message}
            });
            
        } catch (error) {
            next(error)
        }
    }

    
}

module.exports = {
    PaymentController : new PaymentController()
}