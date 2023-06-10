const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    p_name : {type:String , unique: true , required:true},
    e_name : {type:String , default:""},
    category : {type : mongoose.Types.ObjectId,default:undefined , required:true},
    images : {type:[String] , default:[]},
    priceAsli : {type:Number , default:0},
    description : {type:String , default:""},
    rating : {type:String , default:"0"},
    visit : {type:[] , default:[]},
    status: {type:String , default:"Pending",required:true},
    technicalSpecifications: [{
        title: String,
        specs: [{
          key : String,
          value : String,
          asli : Boolean
        }]
    }],
    addonItem: [{
        title: String,
        specs: [{
          key : String,
          price : Number,
          quantity:Number,
          value:String
        }]
    }],
    quantity : {type:Number , default:0},
    momentary : {type:Boolean , default:false},
    discount : {type:Object , default :{
      type : {type:String,default:'naghdi'},
      value :{type:Number,default:0},
      start_date:{type:Date},
      end_date: {type:Date},
      shegeft:{type:Boolean,default:false}
    }}
},{
  timestamps:true
});

module.exports = {
    ProductModel : mongoose.model("product",Schema)
}

