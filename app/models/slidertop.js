const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    link : {type:String , default:""},
    image : {type:String , default:""},
    status : {type:String , default:"pending"}
});
 
module.exports = {
    SliderTopModel : mongoose.model("slidertop",Schema)
}