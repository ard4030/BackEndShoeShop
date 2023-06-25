const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    firts_name : {type:String , default:""},
    last_name : {type:String , default:""},
    city : {type:String , default:""},
    address : {type:String , default:""},
    postalCode : {type:String , default:""},
    mobile : {type:String,required : true},
    email : {type:String, lowercase:true},
    password : {type:String},
    otp : {type:Object,default:{
        code:0,
        expiresIn: 0,
        timeSend:0
    }},
    bills : {type:[], default:[]},
    discount : {type:Number,default:0},
    birsday : {type:String},
    Roles : {type:[String] , default:['USER']},
    bookmarks : {type : [mongoose.Types.ObjectId], default : []},

},{
    timestamps:true
});
 
module.exports = {
    UserModel : mongoose.model("user",Schema)
}