const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    title : {type : String,required : true},
    parent : {type : mongoose.Types.ObjectId,default:undefined , required:false},
    image : {type : String,default : ""},
    description : {type : String,default : ""},
}, {
    toJSON: {virtuals:true},
    id:false,
});

CategoryModel.virtual("children",{
    ref:"category",
    localField:"_id",
    foreignField:"parent"
})

function autoPopulate(next){
    this.populate([{path:"children",select : {__v:0,id:0}}])
    next()
}

CategoryModel.pre('findOne',autoPopulate)
.pre('find',autoPopulate)

module.exports = {
    CategoryModel : mongoose.model("category",CategoryModel)
}