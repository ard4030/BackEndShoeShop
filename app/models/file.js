const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    path : {type : String,default:'' , required:true},
    filename : {type : String,default:'' , required:true},
    mimetype : {type : String,default:'' , required:true},
    size : {type : String,default:'' , required:true},

},{
    timestamps:true
});
 
module.exports = {
    FileModel : mongoose.model("file",Schema)
}