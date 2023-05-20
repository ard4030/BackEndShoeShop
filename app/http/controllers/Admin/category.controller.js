
const { ERRORING } = require("../../../utils/constans");
const mongoose = require('mongoose');
const { CategoryModel } = require("../../../models/category");
const { FeaturesModel } = require("../../../models/features");

class CategoryController {

    async add(req,res,next){
        try {
            let {title,parent} = req.body;
            let result = await CategoryModel.findOne({title})
            if(result) throw {status:400,message:"این دسته بندی قبلا ایجاد شده"};
            if(parent == 0) {
                result = await CategoryModel.create({title})
            }else{
                result = await CategoryModel.create({title,parent})
            }
            if(!result) throw {status:400,message:"افزودن دسته به مشکل مواجه شد"}
            return res.status(200).json({
                status:200,
                success:true,
                message:"دسته بندی با موفقیت ایجاد شد"
            })  
        } catch (error) {
            next(error)
        }
        
    }

    async editCategory(req,res,next){
        try {
            const {title,parent,id} = req.body;
            let result = null;
            if(parent === undefined || parent === "" || parent === " "){
                 result = await CategoryModel.updateOne({_id:id},{$set:{title}})
            }else{
                 result = await CategoryModel.updateOne({_id:id},{$set:{title,parent}})
            }
  
            if(result.modifiedCount == 0) throw {status:401,success:false,message:"دسته بندی پیدا نشد یا خطا در ویرایش"};
            return res.status(200).json({
                status:200,
                success:true,
                message:"دسته بندی با موفقیت ویرایش شد"
            })
        } catch (error) {
            next(error)
        }
    }

    deleteCategory = async (req,res,next) => {
        try {
            const { id } = req.body;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
              $or: [{ _id: category._id }, { parent: category._id }],
            });
            if (deleteResult.deletedCount == 0)
              throw {status:200,success:false,message:'حطا در حذف دسته بندی'}
            return res.status(200).json({
                status:200,
                success:true,
                message:'دسته بندی و زیر دسته ها با موفقیت حذف شد'
            })
          } catch (error) {
            next(error);
          }
    }

    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id);
        if (!category) throw {status:200,success:false,message:'دسته بندی پیدا نشد'}
        return category;
    }

    async addFeature(req,res,next){
        try {
            const {catId,technicalSpecifications} = req.body;
            const isHere = await FeaturesModel.findOne({catId});
            if(isHere){
                const result = await FeaturesModel.updateOne({catId},{$set:{technicalSpecifications}});
                if(!result) throw ERRORING;
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:"ویژگی با موفقیت آپدیت شد"
                })
            }else{
                const result = await FeaturesModel.create({catId,technicalSpecifications});
                if(!result) throw ERRORING;
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:"ویژگی با موفقیت ایجاد شد"
                })

            }
            
        } catch (error) {
            next(error)
        }
    }

    async getFeat(req,res,next){
        try {
            const {id} = req.body;
            const result = await FeaturesModel.findOne({catId:id});
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

    async deleteFeatById(req,res,next){
        try {
            const {id} = req.body;
            const result = await FeaturesModel.deleteOne({_id:id});
            if(result.acknowledged < 1) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:'با موفقیت حذف شد'
            })
        } catch (error) {
            next(error)
        }
    }

    
}

module.exports = {
    CategoryController : new CategoryController()
}