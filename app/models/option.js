const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name : {type:String , default:""},
    value : {type:Object , default:{}},
});
 
module.exports = {
    OptionModel : mongoose.model("option",Schema)
}