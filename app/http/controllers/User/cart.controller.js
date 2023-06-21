const { CartModel } = require("../../../models/cart");
const { ModesModel } = require("../../../models/modes");
const { calcModesPrice, isEqual, checkCount } = require("../../../modules/functions");
const { ERRORING } = require("../../../utils/constans");
const mongoose = require('mongoose');
const { ProductModel } = require("../../../models/product");
const { OrderModel } = require("../../../models/order");

class CartController {

    // async addToCart(req,res,next){
    //     try {
    //         const deviceId = req.cookies['deviceId'];
    //         if(deviceId){
    //             const {p_name,e_name,priceAsli,modes,count,productId,id} = req.body;
    //             let TotalPrice = 0;
    //             let jsonMod = JSON.stringify(modes);
    //             const isProd = await CartModel.findOne({deviceId,productId,modes:jsonMod});
    //             let result;
    //             let message = "";
    //             if(isProd){
    //                 if(isEqual(JSON.parse(isProd.modes),modes) === true){
    //                     let newCount = parseInt(isProd.count) + 1;
    //                     const TotalModePrice =  await calcModesPrice(modes)
    //                     TotalPrice = (TotalModePrice + parseInt(priceAsli)) * parseInt(newCount);
    //                     result = await CartModel.updateOne({deviceId,productId,modes:jsonMod} , {$set:{count:newCount,totalPrice:TotalPrice}})  
    //                     if(!result) throw ERRORING;
    //                     message="این محصول از قبل در سبد شما موجود بود . بکی به تعداد آن اضافه شد";
                        
    //                 }else{
    //                     const TotalModePrice =  await calcModesPrice(modes)
    //                     TotalPrice = (TotalModePrice + parseInt(priceAsli)) * parseInt(count);
    //                     result = await CartModel.create({
    //                         p_name,e_name,priceAsli,modes:JSON.stringify(modes),count,totalPrice:TotalPrice,productId,deviceId
    //                     })
    //                     if(!result) throw ERRORING;
    //                     message="محصول به سبد خرید اضافه شد"
    //                 }
    //             }else{
    //                 const TotalModePrice =  await calcModesPrice(modes)
    //                 TotalPrice = (TotalModePrice + parseInt(priceAsli)) * parseInt(count);
    //                 result = await CartModel.create({
    //                     p_name,e_name,priceAsli,modes:JSON.stringify(modes),count,totalPrice:TotalPrice,productId,deviceId
    //                 })
    //                 if(!result) throw ERRORING;
    //                 message="محصول به سبد خرید اضافه شد"
    //             }
    
    
    //             if(!result) throw ERRORING;
    
    //             res.status(200).json({
    //                 status:200,
    //                 success:true,
    //                 message:message
    //             })
    //         }else{
    //             throw ERRORING;
    //         }
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    // By Cookie
    
    
    async addToCart(req,res,next){
        try {
            const deviceId = req.cookies['deviceId'];
            const {productId,addonItem} = req.body;

            const xxx = await ProductModel.findOne({_id:productId})
            let senitems = [];
            addonItem.map(item => senitems.push(item._id))
            let finalAdd = [];

            xxx.addonItem.map(item => {
                item.specs.map(item1 => {
                    if(senitems.includes(item1._id.toString())) finalAdd.push({
                        title:item.title,
                        key: item1.key,
                        price: item1.price,
                        quantity: item1.quantity,
                        value: item1.value,
                        _id: item1._id
                    })
                })
            })

            const isHere = await CartModel.findOne({
                deviceId,productId,
                addonItem:JSON.stringify(finalAdd),
            });

             
            // 
            if(isHere){
                let tPrice = xxx.priceAsli;
                finalAdd.map(item => {tPrice = tPrice + parseInt(item.price)})
                let priceAsli = tPrice;
                tPrice = (isHere.count + 1) * tPrice
                await CartModel.updateOne({deviceId,productId,addonItem:JSON.stringify(finalAdd)},
                {$set:{count:isHere.count + 1,totalPrice:tPrice,priceAsli}})

                return res.status(200).json({
                    status:200,
                    success:true,
                    message:'سبد خرید با موفقیت آپدیت شد'
                })
            }else{
                let tPrice = xxx.priceAsli;
                finalAdd.map(item => {tPrice = tPrice + parseInt(item.price)})
                let priceAsli = tPrice;
                await CartModel.create({
                    deviceId,
                    p_name:xxx.p_name,
                    productId:xxx._id,
                    e_name:xxx.e_name,
                    price:xxx.priceAsli,priceAsli,
                    addonItem:JSON.stringify(finalAdd),
                    count:1,
                    totalPrice:tPrice,
                    discount:xxx.discount
                })

                return res.status(200).json({
                    status:200,
                    success:true,
                    message:'محصول به سبد خرید اضافه شد'
                })
            }

            
        } catch (error) {
            next(error)
        }
    }

    async addQuantity(req,res,next){
        try {
            const deviceId = req.cookies['deviceId'];
            const {addonItem,productId} = req.body;

            const product = await ProductModel.findOne({_id:productId})
            let senitems = [];;
            addonItem.map(item => senitems.push(item._id))
            let finalAdd = [];

            product.addonItem.map(item => {
                item.specs.map(item1 => {
                    if(senitems.includes(item1._id.toString())) finalAdd.push({
                        title:item.title,
                        key: item1.key,
                        price: item1.price,
                        quantity: item1.quantity,
                        value: item1.value,
                        _id: item1._id
                    })
                })
            })
                      
            const Here = await CartModel.findOne({deviceId,addonItem:JSON.stringify(finalAdd),productId})

            const x = await checkCount(product,finalAdd,Here.count);    
            if(x != false) throw {status:200,success:false,message:x}

            let tPrice = product.priceAsli;
            if(finalAdd && finalAdd.length > 0){
                finalAdd.map(item => {tPrice = tPrice + parseInt(item.price)})
            }
            let priceAsli = tPrice;
            tPrice = (Here.count + 1) * tPrice
            const result = await CartModel.updateOne({deviceId,productId,addonItem:JSON.stringify(finalAdd)},
            {$set:{count:Here.count + 1,totalPrice:tPrice,priceAsli}})

 
            return res.status(200).json({
                status:200,
                success:true,
                message:"افزوده شد"
            })  

        } catch (error) {
            next(error)
        }
    }

    async deleteQuantity(req,res,next){
        try {
            const deviceId = req.cookies['deviceId'];
            const {addonItem,productId} = req.body;

            const product = await ProductModel.findOne({_id:productId})
            let senitems = [];;
            addonItem.map(item => senitems.push(item._id))
            let finalAdd = [];

            product.addonItem.map(item => {
                item.specs.map(item1 => {
                    if(senitems.includes(item1._id.toString())) finalAdd.push({
                        title:item.title,
                        key: item1.key,
                        price: item1.price,
                        quantity: item1.quantity,
                        value: item1.value,
                        _id: item1._id
                    })
                })
            })

            const Here = await CartModel.findOne({deviceId,addonItem:JSON.stringify(finalAdd),productId})

            if(Here.count === 1) {
                const result = await CartModel.deleteOne({deviceId,addonItem:JSON.stringify(finalAdd),productId})
                if(result.deletedCount < 1) throw ERRORING;
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:"حذف شد"
                })  
            }else{

            let tPrice = Here.price;
            if(finalAdd && finalAdd.length > 0){
                finalAdd.map(item => {tPrice = tPrice + parseInt(item.price)})
            }
            let priceAsli = tPrice;
            tPrice = (Here.count - 1) * tPrice
            await CartModel.updateOne({deviceId,productId,addonItem:JSON.stringify(finalAdd)},
            {$set:{count:Here.count - 1,totalPrice:tPrice,priceAsli}})
            
            return res.status(200).json({
                status:200,
                success:true,
                message:"حذف شد"
            })  

            }
            

        } catch (error) {
            next(error)
        }
    }
 
    async getCart(req,res,next){
        try {
            const deviceId = req.cookies['deviceId'];
            // const result = await CartModel.find({userId})
            const result = await CartModel.aggregate([
                  {
                    $match: { deviceId: mongoose.Types.ObjectId(deviceId) },
                  },
                  {
                    $lookup: {
                      from: "products",
                      localField: "productId",
                      foreignField: "_id",
                      as: "image",
                    },
                  },
                  {
                    $addFields: {
                      totalAllPrice: { $multiply: ["$totalPrice", "$count"] }
                    }
                  }
                  
            ])
            if(!result) throw ERRORING;
            res.status(200).json({
                status:200,
                success:true,
                data:result
            })
        } catch (error) {
            next(error)
        }
    }

    // By Body
    async getCart1(req,res,next){
        try {
            const {deviceid} = req.headers;
            // const result = await CartModel.find({userId})
            const result = await CartModel.aggregate([
                  {
                    $match: { deviceId: mongoose.Types.ObjectId(deviceid) },
                  },
                  {
                    $lookup: {
                      from: "products",
                      localField: "productId",
                      foreignField: "_id",
                      as: "image",
                    },
                  },
            ])

            if(!result) throw ERRORING;
            res.status(200).json({
                status:200,
                success:true,
                data:result
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteItemCart(req,res,next){
        try {
            const {id} = req.body;
            const result = await CartModel.deleteOne({_id:id})
            if(!result || result.deletedCount < 1) throw ERRORING
            res.status(200).json({
                status:200,
                success:true,
                message:'محصول از سبد شما حذف شد'
            })

        } catch (error) {
            next(error)
        }
    }

    async deleteAllItems(req,res,next){
        try {
            const {userId} = req.body;
            const result = await CartModel.deleteMany({userId:req.user._id})
            if(!result || result.deletedCount < 1) throw ERRORING
            res.status(200).json({
                status:200,
                success:true,
                message:"سبد خرید شما خالی شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async editItem(req,res,next){
        try {
            const {p_name,e_name,priceAsli,modes,count,productId,userId,id} =req.body;

            const TotalModePrice =  await calcModesPrice(modes)
            let TotalPrice = (TotalModePrice + parseInt(priceAsli)) * parseInt(count);

            const result = await CartModel.updateOne({_id:id},{$set:{
                p_name,e_name,priceAsli,modes:JSON.stringify(modes),count,productId,userId,totalPrice:TotalPrice
            }})

            if(!result || result.modifiedCount < 1) throw ERRORING;
            res.status(200).json({
                status:200,
                success:true,
                message:'سبد خرید آپدیت شد'
            })
        } catch (error) {
            next(error)
        }
    }


    // Calc All Items 
    // Calc All Items whit discount Code

}

module.exports = {
    CartController : new CartController()
}