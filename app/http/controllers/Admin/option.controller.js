const { ArticleModel } = require("../../../models/articles");
const { OptionModel } = require("../../../models/option");
const { SliderTopModel } = require("../../../models/slidertop");
const { ERRORING } = require("../../../utils/constans");

class OptionController {

    async addSliderTop(req,res,next){
        try {
            const {image,link} = req.body;
            const result = await SliderTopModel.create({image,link});
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:'اسلایدر با موفقیت ایجاد شد'
            })

        } catch (error) {
            next(error)
        }
    }

    async getSliderTop(req,res,next){
        const result = await SliderTopModel.find({});
        if(!result) throw ERRORING;
        return res.status(200).json({
            status:200,
            success:true,
            data:result
        })
    }

    async updateSliderTop(req,res,next){
        const {image,id,link} = req.body;
        const result = await SliderTopModel.updateOne({_id:id},{$set:{image,link}})
        if(!result) throw ERRORING;
        return res.status(200).json({
            status:200,
            success:true,
            message:"تغییرات با موفقیت انجام شد"
        })
    }

    async deleteItem(req,res,next){
        try {
           const {id} = req.body;
           const result = await SliderTopModel.deleteOne({_id:id});
           if(!result) throw ERRORING;
           return res.status(200).json({
            status:200,
            success:true,
            message:"اسلایدر با موفقیت حذف شد"
           }) 
        } catch (error) {
            next(error)
        }
    }

    // Initialize
    async initSettingsWebsite(req, res, next) {
        try {
            const {slider_momentary_enable,slider_momentary_number,name} = req.body;
            const sliderMomentary = await OptionModel.findOne({name});
    
            if (sliderMomentary) {
                await OptionModel.findOneAndUpdate({ name: name }, {
                    value: {
                        slider_momentary_enable: slider_momentary_enable,
                        slider_momentary_number: slider_momentary_number
                    }
                });
            } else {
                const newSliderMomentary = await OptionModel.create({
                    name: name,
                    value: {
                        slider_momentary_enable: true,
                        slider_momentary_number: 5
                    }
                });
            }

            return res.status(200).json({
                status:200,
                success:true,
                message:"با موفقیت انجام شد"
            })
        } catch (error) {
            next(error);
        }
    }

    async initSettingsWebsite1(req, res, next) {
        try {
            const {slider_pro_enable,slider_pro_number,name,cats} = req.body;
            console.log(req.body)
            const sliderPro = await OptionModel.findOne({name});
    
            if (sliderPro) {
                await OptionModel.findOneAndUpdate({ name: name }, {
                    value: {
                        slider_pro_enable: slider_pro_enable,
                        slider_pro_number: slider_pro_number,
                        cats:cats
                    }
                });
            } else {
                const newSliderPro = await OptionModel.create({
                    name: name,
                    value: {
                        slider_pro_enable: true,
                        slider_pro_number: 5,
                        cats:[]
                    }
                });
            }

            return res.status(200).json({
                status:200,
                success:true,
                message:"با موفقیت انجام شد"
            })
        } catch (error) {
            next(error);
        }
    }

    async initSettingsWebsite2(req, res, next) {
        try {
            const {slider_shegeft_enable,name,products} = req.body;
            console.log(req.body)
            const sliderShegeft = await OptionModel.findOne({name});
    
            if (sliderShegeft) {
                await OptionModel.findOneAndUpdate({ name: name }, {
                    value: {
                        slider_shegeft_enable: slider_shegeft_enable,
                        products:products
                    }
                });
            } else {
                const newSliderShegeft = await OptionModel.create({
                    name: name,
                    value: {
                        slider_shegeft_enable: true,
                        products:[]
                    }
                });
            }

            return res.status(200).json({
                status:200,
                success:true,
                message:"با موفقیت انجام شد"
            })
        } catch (error) {
            next(error);
        }
    }

    async initSettingsWebsite3(req, res, next) {
        try {
            const {slider_news_enable,slider_news_number,name} = req.body;
            const sliderNews = await OptionModel.findOne({name});
    
            if (sliderNews) {
                await OptionModel.findOneAndUpdate({ name: name }, {
                    value: {
                        slider_news_enable: slider_news_enable,
                        slider_news_number:slider_news_number
                    }
                });
            } else {
                const newSliderNews = await OptionModel.create({
                    name: name,
                    value: {
                        slider_news_enable: true,
                        slider_news_number:20
                    }
                });
            }

            return res.status(200).json({
                status:200,
                success:true,
                message:"با موفقیت انجام شد"
            })
        } catch (error) {
            next(error);
        }
    }

    async initSettingsWebsite4(req, res, next) {
        try {
            const {slider_atricle_enable,slider_atricle_number,name} = req.body;
            const sliderArticle = await OptionModel.findOne({name});
            
            if (sliderArticle) {
                await OptionModel.findOneAndUpdate({ name: name }, {
                    value: {
                        slider_atricle_enable: slider_atricle_enable,
                        slider_atricle_number:slider_atricle_number
                    }
                });
            } else {
                const newSliderArticle = await OptionModel.create({
                    name: name,
                    value: {
                        slider_atricle_enable: true,
                        slider_atricle_number:20
                    }
                });
            }

            return res.status(200).json({
                status:200,
                success:true,
                message:"با موفقیت انجام شد"
            })
        } catch (error) {
            next(error);
        }
    }

    async getOptionByname(req,res,next){
        try {
            const {name} = req.body;
            const result = await OptionModel.findOne({name});
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

    // articles
    async addArticle(req,res,next){
        try {
            const {image,title,value} = req.body;
            const result = await ArticleModel.create({
                title,image,content:value,userId:req.user._id
            })
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:"مقاله با موفقیت ایجاد شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async getArticles(req,res,next){
        try {
            const result = await ArticleModel.find({});
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
    OptionController : new OptionController()
}