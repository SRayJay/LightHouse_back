const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema =require('./bookSchema')
const authorSchema = new Schema({

    name:{type:String,},
    country:{type:String}, // 全称
    intro:String,
    nobel:{type:Number,default:0},
    books:[{type:Schema.Types.ObjectId,ref:'book'}],
    photo:{type:String,default:''},//默认作者图片路径
    birth:{type:String,default:''},
    death:{type:String,default:''}
})

module.exports = mongoose.model("author",authorSchema)