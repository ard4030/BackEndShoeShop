const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name : {type:String , default:""},
    enable : {type:Boolean , default:true},
    title:{type:String,default:''}
});
 
module.exports = {
    PaymentMethodModel : mongoose.model("paymentmethod",Schema)
}