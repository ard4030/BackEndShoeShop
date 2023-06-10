const { CategoryModel } = require("../../../models/category");
const { ERRORING } = require("../../../utils/constans");
const mongoose = require('mongoose');
const { ProductModel } = require("../../../models/product");

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

    async getCategoryWithCount(req, res, next) {
      try {
        const result = await CategoryModel.aggregate([
          // یافتن بالاترین دسته
          { $match: { parent: null } },
          // جستجوی تمامی زیر دسته ها با استفاده از $graphLookup
          {
            $graphLookup: {
              from: "category",
              startWith: "$_id",
              connectFromField: "_id",
              connectToField: "parent",
              as: "subcategories"
            }
          },
          // اضافه کردن محصولات به دسته‌بندی‌ها
          {
            $lookup: {
              from: "product",
              localField: "_id",
              foreignField: "category",
              as: "products"
            }
          },
          // اضافه کردن محصولات به زیردسته‌ها
          {
            $lookup: {
              from: "product",
              localField: "subcategories._id",
              foreignField: "category",
              as: "subcategories.products"
            }
          },
          // ترکیب تمامی محصولات در هر دسته‌بندی
          {
            $addFields: {
              allProducts: {
                $concatArrays: ["$products", "$subcategories.products"]
              }
            }
          },
          // شمارش تعداد محصولات در هر دسته‌بندی
          {
            $group: {
              _id: "$_id",
              title: { $first: "$title" },
              image: { $first: "$image" },
              totalProductsCount: { $sum: { $size: "$allProducts" } },
              subcategories: {
                $push: {
                  _id: "$subcategories._id",
                  title: "$subcategories.title",
                  productsCount: { $size: "$subcategories.products" }
                }
              }
            }
          },
          // انتخاب فیلد های مورد نیاز
          {
            $project: {
              _id: 1,
              title: 1,
              totalProductsCount: 1,
              image: 1,
              subcategories: 1
            }
          }
        ]);
    
        return res.status(200).json({
          status: 200,
          success: true,
          data: result
        });
      } catch (error) {
        next(error);
      }
    }

    async getCategoryWithCount(req, res, next) {
      try {
        const categories = await CategoryModel.find({ parent: null }).populate({
          path: "children",
          populate: { path: "children", select: { __v: 0, id: 0 } },
        });
    
        const result = [];
    
        for (const category of categories) {
          let totalProductsCount = category.products?.length || 0;
    
          for (const subcategory of category.children) {
            totalProductsCount += subcategory.products?.length || 0;
          }
    
          result.push({
            _id: category._id,
            title: category.title,
            image: category.image,
            totalProductsCount,
            subcategories: category.children.map((subcategory) => ({
              _id: subcategory._id,
              title: subcategory.title,
              productsCount: subcategory.products?.length || 0,
            })),
          });
        }
    
        return res.status(200).json({
          status: 200,
          success: true,
          data: categories,
        });
      } catch (error) {
        next(error);
      }
    }



}

module.exports = {
    CategoryController : new CategoryController()
}

