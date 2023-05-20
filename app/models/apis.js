const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title : {type:String , default:""},
    description : {type:String , default:""},
    address : {type:String , default:""},
    method : {type:String , default:""},
    example : {type:String , default:""},
    category : {type:String , default:""},
    status : {type:String , default:"pending"},
});
 
module.exports = {
    ApisModel : mongoose.model("api",Schema)
}