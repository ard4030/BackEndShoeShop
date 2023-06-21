const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    p_name : {type:String , default:""},
    e_name : {type:String , default:""},
    priceAsli : {type:String},
    addonItem : {type:String},
    colors : {type:String},
    count : {type:Number,default:1},
    productId : {type : mongoose.Types.ObjectId,default:undefined , required:true},
    totalPrice : {type:Number,default:0},
    price : {type:Number,default:0},
    deviceId:{type : mongoose.Types.ObjectId,default:undefined , required:true},
    discount:{type:Object}
    
});
 
module.exports = {
    CartModel : mongoose.model("cart",Schema)
}