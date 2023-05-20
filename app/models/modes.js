const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name : {type:String , default:""},
    value : {type:String , default:""},
    price : {type:String , default:""},
});
 
module.exports = {
    ModesModel : mongoose.model("modes",Schema)
}