const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    cartDetail : {type:Object,default:{products:[]}},
    Totalamount : {type:String , default:""},
    amount : {type:String , default:""},
    order_id : {type:String , default:""},
    customer_phone : {type:String , default:""},
    trans_id : {type:String , default:""},
    card : {type:String , default:""},
    shaparakref : {type:String , default:""},
    success:{type:Boolean,default:false},
    userId : {type : mongoose.Types.ObjectId,default:undefined , required:true},
    addressId:{type : mongoose.Types.ObjectId,default:undefined , required:true},
    postMethod:{type : mongoose.Types.ObjectId,default:undefined },
    discount:{type:Object,default:null},
    status:{type:String,default:'pending'},
    step:{type:String,default:'addressOk'},
    tracking_code:{type:String,default:''},
    first_name:{type:String,default:''},
    last_name:{type:String,default:''},
    email:{type:String,default:''},
    company:{type:String,default:''},
    factor:{type:Boolean,default:false},
    paymentMethod:{type : mongoose.Types.ObjectId,default:undefined , required:true},

},{
    timestamps:true
});
 
module.exports = {
    OrderModel : mongoose.model("order",Schema)
}