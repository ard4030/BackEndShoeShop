
var axios = require('axios');
var qs = require('qs');
const { OrderModel } = require('../../../models/order');
const { CartModel } = require('../../../models/cart');
const moment = require('moment');
const { ERRORING } = require('../../../utils/constans');
const { default: mongoose } = require('mongoose');
const { getAmountDiscount } = require('../../../modules/functions');
const { DiscountModel } = require('../../../models/discount');
const { PaymentMethodModel } = require('../../../models/paymentmethod');
const { ProductModel } = require('../../../models/product');

class PeymentController {

    async peyCartNextPay(req,res,next){
        // try {
        //     let oId = Date.now();
        //     const deviceid = req.cookies['deviceId'];
        //     const userId = req.user._id;

        //     const result  = await CartModel.aggregate([
        //         {
        //             $match:{deviceId:mongoose.Types.ObjectId(deviceid)}
        //         }, 
        //         {
        //             $group: {
        //               _id: '$deviceId',
        //               total: {
        //                 $sum: "$totalPrice"
        //               }
        //             }
        //         },
        //         {
        //             $lookup: {
        //                from: "carts",
        //                localField: "_id",
        //                foreignField: "deviceId",
        //                as: "userDetails"
        //             }
        //         },
        //         {
        //             $addFields: {
        //                userDetails: "$userDetails",
        //             }
        //         },
        //     ]);
        //     if(!result || result.length < 1) throw ERRORING;

        //     const order = await OrderModel.aggregate([
        //         {
        //             $match :{userId,success:false}
        //         },
        //         {
        //                 $lookup: {
        //                    from: "addresses",
        //                    localField: "addressId",
        //                    foreignField: "_id",
        //                    as: "addRessDet"
        //                 }
        //         },
        //         {
        //             $lookup: {
        //                from: "postmethods",
        //                localField: "postMethod",
        //                foreignField: "_id",
        //                as: "pestDet"
        //             }
        //         }     
        //     ])

        //     let totalAllPrice = result[0].total + order[0].pestDet[0].price;
        //     if(order[0].discount){
        //         if(order[0].discount.type === 'naghdi'){
        //             totalAllPrice = parseInt(totalAllPrice) - parseInt(order[0].discount.price);
        //         }else{
        //             totalAllPrice = parseInt(totalAllPrice) - ((parseInt(totalAllPrice)*30) / 100);
        //         }
        //     }

        //     const data = {
        //         orderId:order[0]._id,
        //         userDetails:result[0].userDetails,
        //         total:result[0].total,
        //         address:order[0].addRessDet,
        //         postMethod:order[0].pestDet,
        //         status:order[0].status,
        //         success:order[0].success,
        //         step:order[0].step,
        //         discount:order[0].discount,
        //         totalAllPrice
        //     }

        //     // let custom_json_fields = { "productName":"Shoes752" , "id":52 };
        //     var data0 = qs.stringify({
        //         api_key: 'd167de99-cc29-4fdf-8955-830cf5ca67bd',
        //         amount: 1000,
        //         order_id: oId,
        //         customer_phone: req.user.mobile,
        //         custom_json_fields: JSON.stringify(result[0].userDetails),
        //         callback_uri: 'https://novin-code.ir/pay/result' 
        //     });

        //     var config = {
        //         method: 'post',
        //         url: 'https://nextpay.org/nx/gateway/token',
        //         data : data0
        //     };

        //     let succ = false;
        //     let err='';
        //     let response1 = null

        //     await axios(config)
        //         .then(async function (response) {
        //             if(parseInt(JSON.stringify(response.data.code)) === -1){
        //                 const updateOrder = await OrderModel.updateOne({userId,success:false},{$set:{
        //                     trans_id:response.data.trans_id,
        //                     order_id:oId,
        //                     amount:totalAllPrice,
        //                     customer_phone:req.user.mobile,
        //                     cartDetail:{product:result[0].userDetails},
        //                     userId:req.user._id
        //                 }})

        //                 if(!updateOrder || updateOrder.acknowledged < 1) throw {status:400,success:false,message:'خطا'} 
        //                 succ = true,
        //                 response1 = response.data.trans_id
        //             }else{
        //                 succ = false
        //             }
        //         })
        //         .catch(function (error) {
        //             succ= false;
        //             err = error
        //             console.log(error);
        //     });

        //     if(succ){
        //         return res.status(200).json({
        //             status:200,
        //             success:true,
        //             message:'ol',
        //             data:`https://nextpay.org/nx/gateway/payment/${response1}`
        //         })
        //     }else{
        //         throw {status:400,success:false,message:err}
        //     }
            
        // } catch (error) {
        //     next(error)
        // }
    }

    async verifyNextPay(req,res,next){
        // try {
        //     const {amount , np_status , order_id , trans_id} = req.body;
        //     console.log(req.body)
        //     var data = qs.stringify({
        //         api_key: 'd167de99-cc29-4fdf-8955-830cf5ca67bd',
        //         amount: amount,
        //         trans_id: trans_id
        //     });
        //     var config = {
        //         method: 'post',
        //         url: 'https://nextpay.org/nx/gateway/verify',
        //         data : data
        //     };

        //     await axios(config)
        //     .then(async function (response) {
        //         if(parseInt(JSON.stringify(response.data.code)) === 0){
        //             const result = await OrderModel.updateOne({order_id:response.data.order_id},{
        //                 $set:{
        //                     card: response.data.card_holder,
        //                     shaparakref:response.data.Shaparak_Ref_Id,
        //                     success:true
        //                 }
        //             })
        //             if(!result) throw ERRORING
        //             return res.status(200).json({
        //                 status:200,
        //                 success:true,
        //                 message:'پرداخت موفق',
        //                 data:result
        //             })
        //         }else{
        //             const result = await OrderModel.updateOne({order_id:response.data.order_id},{
        //                 $set:{
        //                     card: response.data.card_holder,
        //                     shaparakref:response.data.Shaparak_Ref_Id,
        //                     success:false
        //                 }
        //             })
        //             if(!result) throw ERRORING
        //             return res.status(200).json({
        //                 status:200,
        //                 success:false,
        //                 message:'پرداخت ناموفق',
        //                 data:result
        //             })
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         throw {status:400,success:false,message:error.message}
        //     });
            
        // } catch (error) {
        //     next(error)
        // }
    }

    async newCartNextPay(req,res,next){
        try {
            let oId = Date.now();
            const deviceid = req.cookies['deviceId'];
            const {addressId,discount,first_name,last_name,email,paymentMethod,factor,company} = req.body;

            const data = {};
            
            // Get Cart Total
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

            // Check Discount
            let CheckDis = await DiscountModel.findOne({code:discount.code});
            if(CheckDis){
                if(CheckDis.status === 'publish') {
                    // مقایسه تاریخ انقضا با تاریخ حال حاضر
                    const expirationDate = moment(CheckDis.end_date);
                    const currentDate = moment();
                    if (expirationDate.isBefore(currentDate)) {
                        // کد تخفیف منقضی شده است
                        CheckDis = 0;
                    } else {
                        
                    }
                }
            }else{
               CheckDis = 0; 
            }

            // Check Post Price
            let postPrice = 10;

            // data.amount = (result[0].total + postPrice) - getAmountDiscount(CheckDis,result[0].total); 
            data.amount = 1000; 

            // Payment Configuration
            const PayMethod = await PaymentMethodModel.findOne({_id:paymentMethod})
            if(PayMethod.name === "online"){
                var data0 = qs.stringify({
                    api_key: 'd167de99-cc29-4fdf-8955-830cf5ca67bd',
                    amount: data.amount,
                    order_id: oId,
                    customer_phone: req.user.mobile,
                    custom_json_fields: JSON.stringify(result[0].userDetails),
                    callback_uri: 'https://novin-code.ir/pay/result' 
            });

            var config = {
                method: 'post',
                url: 'https://nextpay.org/nx/gateway/token',
                data : data0
            };

            let succ = false;
            let err='';
            let response1 = null

            await axios(config)
                .then(async function (response) {
                    if(parseInt(JSON.stringify(response.data.code)) === -1){
                        const changeOrder = await OrderModel.create(
                            {
                                trans_id:response.data.trans_id,
                                order_id:oId,
                                amount:data.amount,
                                customer_phone:req.user.mobile,
                                cartDetail:{product:result[0].userDetails},
                                userId:req.user._id,
                                first_name,
                                last_name,
                                email,
                                factor,
                                company,
                                addressId,
                                paymentMethod,
                                discount:(CheckDis===0)?{}:CheckDis
                            },
                            )
                        if(!changeOrder) throw ERRORING;    
                        succ = true,
                        response1 = response.data.trans_id
                    }else{
                        succ = false
                    }
                })
                .catch(function (error) {
                    succ= false;
                    err = error
                    console.log(error);
            });

            if(succ){
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:'ol',
                    data:`https://nextpay.org/nx/gateway/payment/${response1}`
                })
            }else{
                throw {status:400,success:false,message:err}
            }

                
            }
            


            // return res.status(200).json({
            //     status:200,
            //     success:true,
            //     data:PayMethod
            // })

        } catch (error) {
            next(error)
        }
    }

    async newVerifyNextPay(req,res,next){
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
                    const myOrder = await OrderModel.aggregate([
                        {
                            $match :{order_id:response.data.order_id}
                        },
                        {
                            $lookup :{
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
                        }
                        
                    ])

                    if(!result) throw ERRORING;
                    return res.status(200).json({
                        status:200,
                        success:true,
                        message:'پرداخت موفق',
                        data:myOrder
                    })
                }else{
                    const result = await OrderModel.findOneAndUpdate({order_id:response.data.order_id},{
                        $set:{
                            card: response.data.card_holder,
                            shaparakref:response.data.Shaparak_Ref_Id,
                            success:false
                        }
                    })

                    const myOrder = await OrderModel.aggregate([
                        {
                            $match :{order_id:response.data.order_id}
                        },
                        {
                            $lookup :{
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
                        }
                        
                    ])

                    if(!result) throw ERRORING
                    return res.status(200).json({
                        status:200,
                        success:false,
                        message:'پرداخت ناموفق',
                        data:myOrder
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
    PeymentController : new PeymentController()
}