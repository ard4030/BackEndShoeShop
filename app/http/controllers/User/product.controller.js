
const { ERRORING } = require("../../../utils/constans");
var mongoose = require('mongoose');
const { CategoryModel } = require("../../../models/category");
const { OrderModel } = require("../../../models/order");
const { ModesModel } = require("../../../models/modes");
const { ProductModel } = require("../../../models/product");

class ProductController {

    // async addModes(req,res,next){
    //     try {
    //         const {name,value,price} = req.body;
    //         const result = await ModesModel.create({name,value,price})
    //         if(!result) throw ERRORING;
    //         res.status(200).json({
    //             status:200,
    //             success:true,
    //             data:result
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    async getParentsById(idx){ 
        let par = 1;
        let parents = [];
        while (par > 0 ) {
            const result = await CategoryModel.findById(idx);
            if(!result.parent) {
                parents.push({
                    title:result.title,
                    id:result._id
                }) 
                par=0      
            }else{
                parents.push({
                    title:result.title,
                    parent:result.parent,
                    id:result._id
                })
                idx = result.parent;
                // console.log(par)
            }
        }

        return parents;
    }

    // getProductById = async (req,res,next) => {
    //    try {
    //        const {id} = req.body;
    //        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;  
    //        var Newid = mongoose.Types.ObjectId(id);
    //        const result = await ProductModel.aggregate([
    //         { $match: { _id: Newid } },
    //         // { $project: { visit: 0} }
    //        ])

    //        if(result.length > 0){
    //         if(ip || ip[0] !== ":" || ip !=="0"){ 
    //             if(!result[0].visit.includes(ip)){
    //                 await ProductModel.updateOne(
    //                     { _id: Newid }, 
    //                     { $push: { visit: ip } },
    //                 );
    //             }
    //            }
            
    //            let parenting = await this.getParentsById(result[0].category);
               
    //            delete result[0].__v
    //            result[0].visit = result[0].visit.length;
    //            result[0].parents = parenting
    //        }else{
    //         throw ERRORING
    //        }

    //        res.status(200).json({
    //            status:200,
    //            success:true,
    //            data:result
    //        })
    //    } catch (error) {
    //        next(error)
    //    }
    // }

    async getAllProducts(req,res,next){
        try { 
            let { page, size, sort,name } = req.body;
            if (!page) {page = 1}
            if (!size) {size = 10;}
            const limit = parseInt(size);
            if (!page) {page = 1}
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit


            const count = await ProductModel.count()
            const result = await ProductModel.aggregate([
                {
                    $match: {
                      p_name: {
                        $regex: name
                      }
                    }
                },
                {
                    $lookup:
                      {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'finall'
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

    async getMostSaleProduct(req,res,next){
         const result = await OrderModel.aggregate([
            {
                $match:{success:false}
            },
            {
                $unwind: {path:"$cartDetail.product"}
            }, 
            {
              $group: {
                _id: "$cartDetail.product.productId",
               total: {$sum: "$cartDetail.product.count"},
                "items": {
                    "$addToSet": {
                    "p_name": "$cartDetail.product.p_name",
                    "e_name": "$cartDetail.product.e_name",
                    "images": "$cartDetail.product.image",
                    }
                },
              },
            }, 
            { $sort: { total: -1 } }
            ]
         )

         if(!result) throw ERRORING;
        return res.status(200).json({
            status:200,
            success:true,
            data:result
        })
    }

    getProductById = async (req,res,next) => {
        try {
            const {id} = req.body;
            var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;  
            var Newid = mongoose.Types.ObjectId(id);
            const result = await ProductModel.aggregate([
                { $match: { _id: Newid } },
                {
                    $lookup : {
                        from:"comments",
                        localField:"_id",
                        foreignField:"productId",
                        as:"com"
                    }
                },
                {
                    $unwind: "$com"
                },
                {
                    $group: {
                        _id: "$_id",
                        p_name: { $first: "$p_name" },
                        e_name: { $first: "$e_name" },
                        images: { $first: "$images" },
                        category: { $first: "$category" },
                        visit: { $first: "$visit" },
                        description: { $first: "$description" },
                        status: { $first: "$status" },
                        technicalSpecifications: { $first: "$technicalSpecifications" },
                        addonItem: { $first: "$addonItem" },
                        quantity: { $first: "$quantity" },
                        discount: { $first: "$discount" },
                        momentary: { $first: "$momentary" },

                        avgRate: { $avg: "$com.rate" },
                        avgArzesh: { $avg: "$com.arzesh" },
                        avgEmkanat: { $avg: "$com.emkanat" },
                        avgKeyfiat: { $avg: "$com.keyfiat" },
                        avgSohoolat: { $avg: "$com.sohoolat" },
                        avgNoavari: { $avg: "$com.noavari" },
                        
                    }
                },
                {
                    $lookup : {
                        from:"comments",
                        localField:"_id",
                        foreignField:"productId",
                        as:"com1"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        p_name: 1,
                        e_name: 1,
                        images: 1,
                        category: 1,
                        visit: 1,
                        description: 1,
                        status:1,
                        technicalSpecifications:1,
                        addonItem:1,
                        quantity:1,
                        discount:1,
                        momentary:1,
                        avgRate: 1,
                        avgArzesh:1,
                        avgEmkanat:1,
                        avgKeyfiat:1,
                        avgSohoolat:1,
                        avgNoavari:1,
                        commentCount: { $size: "$com1" }
                    }
                }
            ]);
    
            if(result.length > 0){
                if(ip || ip[0] !== ":" || ip !=="0"){ 
                    if(!result[0].visit.includes(ip)){
                        await ProductModel.updateOne(
                            { _id: Newid }, 
                            { $push: { visit: ip } },
                        );
                    }
                }
    
                let parenting = await this.getParentsById(result[0].category);
    
                delete result[0].__v
                result[0].visit = result[0].visit.length;
                result[0].parents = parenting
            }else{
                throw ERRORING
            }
            
    
            res.status(200).json({
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
    ProductController : new ProductController()
}