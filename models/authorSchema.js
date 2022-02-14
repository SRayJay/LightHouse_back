const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({

    name:{type:String,},
    country:{type:String},
    intro:String,
    nobel:{type:Number,default:0},
    books:[{type:Schema.Types.ObjectId,ref:'book'}],
    photo:{type:String,default:''},//默认作者图片路径

})

module.exports = mongoose.model("author",authorSchema)