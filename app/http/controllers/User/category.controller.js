const { CategoryModel } = require("../../../models/category");
const { ERRORING } = require("../../../utils/constans");
const mongoose = require('mongoose')

class CategoryController {

    async getAllCategory(req,res,next){
        try {
            const result = await CategoryModel.find({__v:0,parent:undefined});
            if(!result || result.length < 1) throw ERRORING;

            res.status(200).json({
                status:200,
                success:true,
                data:result
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllCategory1(req,res,next){
        try {
            const result = await CategoryModel.find();
            res.status(200).json({
                status:200,
                success:true,
                data:result
            })
        } catch (error) {
            next(error)
        }
    }


    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id);
        if (!category) throw {status:200,success:false,message:'دسته بندی پیدا نشد'}
        return category;
    }

    async getCategoryById(req, res, next) {
        try {
          const { id: _id } = req.body;
          const category = await CategoryModel.aggregate([
            {
              $match: { _id: mongoose.Types.ObjectId(_id) },
            },
            {
              $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "parent",
                as: "children",
              },
            },
            {
              $project: {
                __v: 0,
                "children.__v": 0,
                "children.parent": 0,
              },
            },
          ]);
          return res.status(200).json({
            status: 200,
            data: {
              category,
            },
          });
        } catch (error) {
          next(error);
        }
    }

    async getCategoryById(req,res,next){
        try {
            const {id} = req.body;
            const result = await CategoryModel.findOne({_id:id});
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
    
}

module.exports = {
    CategoryController : new CategoryController()
}