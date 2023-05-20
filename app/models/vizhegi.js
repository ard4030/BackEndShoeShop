const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    p_name : {type:String , default:""},
    e_name : {type:String , default:""},
    category : {type : [mongoose.Types.ObjectId],default:undefined , required:true},
});
 
module.exports = {
    VizhegiModel : mongoose.model("vizhegi",Schema)
}