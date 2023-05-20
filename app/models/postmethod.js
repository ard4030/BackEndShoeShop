const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name : {type:String , default:""},
    price : {type:Number , default:0},
    status : {type:String , default:"pending"}
});
 
module.exports = {
    PostMethodModel : mongoose.model("postmethod",Schema)
}