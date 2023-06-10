const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    userId : {type:mongoose.Types.ObjectId},
    productId : {type:mongoose.Types.ObjectId},
    rate : {type:Number,default:0},
    keyfiat : {type:Number,default:0},
    arzesh : {type:Number,default:0},
    noavari : {type:Number,default:0},
    emkanat : {type:Number,default:0},
    sohoolat : {type:Number,default:0},
    ghovat : {type:Array,default:[]},
    zaf : {type:Array,default:[]},
    message:{type:String,default:""},
    mofid : {type:Object,default:{yes:0,no:0}},
    status : {type:String,default:"pending"}
},{
    timestamps:true
})

module.exports = {
    CommentModel : mongoose.model("comment",Schema)
}