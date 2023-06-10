const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    title : {type:String,default:""},
    content : {type:String,default:""},
    image : {type:String,default:""},
    userId:{type:mongoose.Types.ObjectId}
},{
    timestamps:true
})

module.exports = {
    ArticleModel : mongoose.model("article",Schema)
}