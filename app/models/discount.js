const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name : {type:String,default:''},
    type : {type:String,default:'naghdi'},
    value :{type:Number,default:0},
    code:{type:String,default:''},
    status:{type:String,default:'pending'},
    start_date:{type:Date},
    end_date: {type:Date},
    userId:{type:mongoose.Types.ObjectId,default:undefined , required:true},
},{
    timestamps:true
});
 
module.exports = {
    DiscountModel : mongoose.model("discount",Schema)
}