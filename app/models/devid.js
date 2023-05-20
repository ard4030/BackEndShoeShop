const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    devname : {type:String , default:""},
});
 
module.exports = {
    DevidModel : mongoose.model("david",Schema)
}