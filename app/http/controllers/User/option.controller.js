const { Mongoose, default: mongoose } = require("mongoose");
const { ArticleModel } = require("../../../models/articles");
const { CategoryModel } = require("../../../models/category");
const { OptionModel } = require("../../../models/option");
const { ProductModel } = require("../../../models/product");
const { SliderTopModel } = require("../../../models/slidertop");
const { UserModel } = require("../../../models/user");
const { ERRORING } = require("../../../utils/constans");

class OptionController {

    async getSliderTop(req,res,next){
        const result = await SliderTopModel.find({});
        if(!result) throw ERRORING;
        return res.status(200).json({
            status:200,
            success:true,
            data:result
        })
    }

    async getHome(req,res,next){
        try {
            const SliderTop = await SliderTopModel.find({});

            const Option = await OptionModel.find({
                name:{$in:
                    [
                        "slider_moment",
                        "slider_pro",
                        "slider_shegeft",
                        "slider_news",
                        "slider_article"
                    ]
                }
            });
            
            let SliderMoment = [];
            if (Option && Option[0].value.slider_momentary_enable){
                SliderMoment = await ProductModel.find({momentary:true}).limit(Option[0].value.slider_momentary_number)
            }

            const Categorys = await CategoryModel.find({parent:null})

            let ProSlider = [];
            let ids = [];
            Option[1].value.cats.forEach(element => {
                ids.push(mongoose.Types.ObjectId(element))
            });
            
            if (Option && Option[1].value.slider_pro_enable){

                ProSlider = await ProductModel.aggregate([
                    {
                      $graphLookup: {
                        from: "categories",
                        startWith: "$category",
                        connectFromField: "parent",
                        connectToField: "_id",
                        as: "subcategories"
                      }
                    },
                    {
                      $lookup: {
                        from: "comments",
                        let: { productId: "$_id" },
                        pipeline: [
                          {
                            $match: {
                              $expr: {
                                $eq: ["$productId", "$$productId"]
                              }
                            }
                          },
                          {
                            $group: {
                              _id: "$productId",
                              rate: { $avg: "$rate" }
                            }
                          }
                        ],
                        as: "rate"
                      }
                    },
                    {
                      $match: {
                        "subcategories._id": { $in: ids }
                      }
                    },
                    {
                      $project: {
                        _id: 1,
                        p_name: 1,
                        e_name: 1,
                        category: 1,
                        subcategories: 1,
                        description: 1,
                        priceAsli: 1,
                        images: 1,
                        rate: { $ifNull: [{ $arrayElemAt: ["$rate.rate", 0] }, 0] },
                        status: 1,
                        technicalSpecifications: 1,
                        addonItem: 1,
                        quantity: 1,
                        discount: 1,
                        momentary: 1,
                      }
                    }
                  ]);
            }
            ProSlider.forEach(element => {
                let b;
                element.subcategories.map(item => {
                    if(item.parent === null) b={id:item._id,name:item.title}
                })
                element.paId = b.id;
                element.paName = b.name;
            });

            let ShegeftSlider = [];
            if (Option && Option[2].value.slider_shegeft_enable){
                ShegeftSlider = await ProductModel.find({ "discount.value": { $gt: 0 } , "discount.shegeft" : true })
            }

            let NewsProduct = [];
            if (Option && Option[3].value.slider_news_enable){
                NewsProduct = await ProductModel.find({}).limit(Option[3].value.slider_news_number).sort({$natural:-1}) 
            }

            let SliderArticle = [];
            if (Option && Option[4].value.slider_atricle_enable){
                SliderArticle = await ArticleModel.find({}).limit(Option[4].value.slider_article_number).sort({$natural:-1}) 
            }

     
            return res.status(200).json({
                status:200,
                success:true,
                data:{
                    SliderTop,
                    SliderMoment,
                    Categorys,
                    ProSlider,
                    ShegeftSlider,
                    NewsProduct,
                    SliderArticle
                }
            })
        } catch (error) {
            
        }
    }

    async getArticleById(req,res,next){
        try {
            const {id} = req.body;
            const result = await ArticleModel.findOne({_id:id});
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

    async addBookmark(req,res,next){
        try {
            const { productId } = req.body;
            const user = await UserModel.findOne({ _id: req.user._id, bookmarks: productId });
            if (user) {
            await UserModel.updateOne({ _id: req.user._id }, { $pull: { bookmarks: productId } });
            return res.status(200).json({
                status: 200,
                success: true,
                message: "محصول از علاقه مندی های شما حذف شد"
            });
            } else {
            await UserModel.updateOne({ _id: req.user._id }, { $addToSet: { bookmarks: productId } });
            return res.status(200).json({
                status: 200,
                success: true,
                message: "محصول به علاقه مندی های شما اضافه شد"
            });
            }
        } catch (error) {
            next(error)
        }
    }

 
}

module.exports = {
    OptionController : new OptionController()
}