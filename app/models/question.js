const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId},
    message:{type:String,default:""},
    userResponseId:{type:mongoose.Types.ObjectId},
    responseMessage:{type:String,default:""},
    status:{type:String,default:"pending"},
    productId:{type:mongoose.Types.ObjectId}
},{
    timestamps:true
})

module.exports = {
    QuestionModel : mongoose.model("question",Schema)
}