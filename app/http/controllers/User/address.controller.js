const { AddressModel } = require("../../../models/address");
const { ERRORING } = require("../../../utils/constans");


class AddressController {

    async addAddress(req,res,next){
        try {
            const {ostanCode,cityCode,ostanName,cityName,name,mobile,postalCode,plak,description,lat,lang} = req.body;
            const result = await AddressModel.create({
                ostanCode,cityCode,ostanName,cityName,
                name,mobile,postalCode,plak,description,userId:req.user._id,lat,lang
            });
            if(!result) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:'آدرس با موفقیت ایجاد شد'
            })
        } catch (error) {
            next(error)
        }
    }

    async getAddressById(req,res,next){
        try {
            const result = await AddressModel.aggregate([
                {
                    $match : {userId:req.user._id}
                },
                {
                    $project : {__v:0}
                }
            ])
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

    async updateAddress(req,res,next){
        try {
            const {ostanCode,cityCode,ostanName,cityName,name,mobile,postalCode,plak,description,id,lat,lang} = req.body;
            const result = await AddressModel.updateOne({userId:req.user._id,_id:id},{$set:{
                ostanCode,cityCode,ostanName,cityName,name,mobile,postalCode,plak,description,lat,lang
            }})
            if(!result) throw ERRORING
            return res.status(200).json({
                status:200,
                success:true,
                message:'آدرس با موفقیت ویرایش شد'
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteAddress(req,res,next){
        try {
            const {id} = req.body;
            const result = await AddressModel.deleteOne({_id:id,userId:req.user._id})
            if(result.deletedCount < 1) throw ERRORING;
            return res.status(200).json({
                status:200,
                success:true,
                message:'آدرس با موفقیت حذف شد'
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    AddressController : new AddressController()
}