
const { ERRORING } = require("../../../utils/constans");
var mongoose = require('mongoose');
const { OrderModel } = require("../../../models/order");
const { ProductModel } = require("../../../models/product");
const { FileModel } = require("../../../models/file");

class ProductController {

    async add(req,res,next){
        try {
            const {
                p_name,
                e_name,
                category,
                images,
                priceAsli,
                description,
                id,
                technicalSpecifications,
                addonItem,
                quantity,
            } = req.body;
            
            
            if (id) {
                var mongoose = require('mongoose');
                var newId = mongoose.Types.ObjectId(id);
                const result = await ProductModel.updateOne({_id:newId},{$set:{
                    p_name,
                        e_name,
                        category,
                        images,
                        priceAsli,
                        description,
                        technicalSpecifications,
                        addonItem,
                        quantity,
                }})
                if(!result) throw ERRORING;
                if (result.modifiedCount < 1) throw {status:400,success:false,message:"انجام شد"}
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:"محصول با موفقیت ویرایش شد"
                })

            }else{
                const isHere =  await ProductModel.findOne({p_name,e_name})
                if(isHere){
                    throw {status:400,success:false,message:'محصول از قبل وجود دارد'}
                }else{
                    await ProductModel.create({
                        p_name,
                        e_name,
                        category,
                        images,
                        priceAsli,
                        description,
                        technicalSpecifications,
                        addonItem,
                        quantity,
                    })      
                }
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:"محصول با موفقیت ایجاد شد"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req,res,next){
        try { 
            let { page, size, sort } = req.body;
            if (!page) {page = 1}
            if (!size) {size = 10;}
            const limit = parseInt(size);
            if (!page) {page = 1}
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit


            const count = await ProductModel.count()
            const result = await ProductModel.aggregate([
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

    async deleteProductOne(req,res,next){
        try {
            const {id} = req.body;
            const result = await ProductModel.deleteOne({_id:id})
            console.log(result)
            if(result.deletedCount == 0) throw ERRORING
            res.status(200).json({
                status:200,
                success:true,
                message:"محصول با موفقیت حذف شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteManyProducts(req,res,next){
        try {
            const {ids} = req.body;
            const result = await ProductModel.deleteMany({_id:{ $in: ids}})
            if(!result) throw ERRORING;
            if (result.modifiedCount <1) throw {status:400,success:false,message:"محصول یافت نشد"}
            res.status(200).json({
                status:200,
                success:true,
                message:"محصولات با موفقیت حذف شدند"
            })
            
        } catch (error) {
            next(error)
        }
    }

    async getProductByFilter(req,res,next){
        try {
            
            
            // or 
            const filter = {
                '$or': [
                    {
                        'technicalSpecifications': {
                            '$elemMatch': {
                                'title': 'حافظه',
                                'specs': {
                                    '$elemMatch': {
                                        'key': 'داخلی',
                                        'value':'100 گیگ'
                                    }
                                }
                            }
                        }
                    },
                    {
                        'technicalSpecifications': {
                            '$elemMatch': {
                                'title': 'دوربین',
                                'specs': {
                                    '$elemMatch': {
                                        'key': 'عکسبرداری',
                                        'value':'40 مگاپیکسل'
                                    }
                                }
                            }
                        }
                    },
                    {
                        'priceAsli': {
                            '$gte': 50,
                            '$lte': 99
                        }
                    }
                ]
            }

            //and
            // const filter = {
            //     '$and': [
            //         {
            //             'technicalSpecifications': {
            //                 '$elemMatch': {
            //                     'title': 'حافظه',
            //                     'specs': {
            //                         '$elemMatch': {
            //                             'key': 'داخلی',
            //                             'value':'100 گیگ'
            //                         }
            //                     }
            //                 }
            //             }
            //         },
            //         {
            //             'technicalSpecifications': {
            //                 '$elemMatch': {
            //                     'title': 'دوربین',
            //                     'specs': {
            //                         '$elemMatch': {
            //                             'key': 'عکسبرداری',
            //                             'value':'40 مگاپیکسل'
            //                         }
            //                     }
            //                 }
            //             }
            //         },
            //         {
            //             'priceAsli': {
            //                 '$gte': 50,
            //                 '$lte': 99
            //             }
            //         }
            //     ]
            // }

            // $or: [
            //     { category: 'Electronics' },
            //     {
            //       $and: [
            //         { category: 'Books' },
            //         { price: { $lt: 20 } }
            //       ]
            //     }
            //   ]


            const result = await ProductModel.find(filter)


              return res.status(200).json({
                success:true,
                status:200,
                data:result
              })
        } catch (error) {
            next(error)
        }
    }

    async uploadImages(req,res,next){
        try {
            
            let images  = req.files?req.files:[];
            images.forEach(element => {
                element.path = '/' + element.path.replace(/\\/g, '/');
                element.filename = element.originalname
            });

            if(images.length > 0) {
                const result = await FileModel.insertMany(images);
                if(!result) throw ERRORING;
            }else{
                throw {status:200,success:false,message:'عکسی انتخاب نکردید'}
            }
            res.status(200).json({
                status:200,
                success:true,
                data:images
            })
        } catch (error) {
            next(error) 
        }
    }

}

module.exports = {
    ProductController : new ProductController()
}