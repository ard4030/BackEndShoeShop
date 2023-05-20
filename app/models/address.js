const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    ostanCode : {type:String , default:""},
    cityCode : {type:String , default:""},
    ostanName : {type:String , default:""},
    cityName : {type:String , default:""},
    name : {type:String},
    mobile : {type:String},
    postalCode : {type:String,default:""},
    plak : {type:String,default:""},
    description : {type:String,default:""},
    userId:{type : mongoose.Types.ObjectId,default:undefined , required:true},
    lat:{type : String ,default:"" },
    lang:{type : String ,default:"" }

});
 
module.exports = {
    AddressModel : mongoose.model("address",Schema)
}