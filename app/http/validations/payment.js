const { default: mongoose } = require("mongoose");

function PayValidator() {
    return function(req, res, next) {
            const {addressId,first_name,last_name,paymentMethod } = req.body;
            
            if (!mongoose.Types.ObjectId.isValid(addressId)) {
                throw {status:200,success:false,message:"لطفا آدرس خود را انتخاب نمایید"}
            } 
    
            if (!paymentMethod || !mongoose.Types.ObjectId.isValid(paymentMethod._id)) {
                throw {status:200,success:false,message:"لطفا روش پرداخت را انتخاب نمایید"}
            } 
    
            if (first_name.length < 1) {
                throw {status:200,success:false,message:"لطفا نام خود را وارد نمایید"}
            } 
    
            if (last_name.length < 1) {
                throw {status:200,success:false,message:"لطفا نام خانوادگی خود را وارد نمایید"}
            } 

            next();
            
            
    }
  }

  module.exports = {
    PayValidator
  }
