
const { ERRORING } = require("../../../utils/constans");
var mongoose = require('mongoose');
const { OrderModel } = require("../../../models/order");
const { ProductModel } = require("../../../models/product");
const { FileModel } = require("../../../models/file");
const fs = require('fs');
const path = require('path');
const util = require('util');

class UploadController {


    async getAllImages(req,res,next){
        try { 
            let { page, size, sort } = req.body;
            if (!page) {page = 1}
            if (!size) {size = 10;}
            const limit = parseInt(size);
            if (!page) {page = 1}
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit


            const count = await FileModel.count()
            const result = await FileModel.aggregate([
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

    async deleteManyImages(req, res, next) {
        try {
          const { ids } = req.body;
          const images = await FileModel.find({ path: { $in: ids } });
          const filePath = path.join(__dirname, '..', '..', '..', '..');
          for (const element of images) {
            const filep = filePath + element.path.replace(/\//g, '\\');
            if (fs.existsSync(filep)) {
              try {
                // Wait 10 milliseconds before trying to delete the file
                await new Promise((resolve) => setTimeout(resolve, 1000)); 
                await util.promisify(fs.unlink)(filep);
                console.log(`File ${filep} has been deleted.`); 
              } catch (err) {
                console.error(`Error deleting file ${filep}: ${err}`);
                throw {status:400,success:false,message:'noimage'} 
              }
            }
          }
          const result = await FileModel.deleteMany({ path: { $in: ids } });
          if (!result) throw ERRORING;
          if (result.modifiedCount < 1)
            throw { status: 400, success: false, message: 'عکس یافت نشد' };
          res.status(200).json({
            status: 200,
            success: true,
            message: 'عکس‌ها با موفقیت حذف شدند',
            data: images,
          }); 
        } catch (error) {
          next(error);
        }
      }


      

   
      
}

module.exports = {
    UploadController : new UploadController()
}