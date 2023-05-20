const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    catId : {type : mongoose.Types.ObjectId,default:undefined , required:true},
    technicalSpecifications: [{
        title: String,
        specs: [{
          key: String,
          value: String,
          asli : Boolean
        }]
    }]
});
 
module.exports = {
    FeaturesModel : mongoose.model("features",Schema)
}