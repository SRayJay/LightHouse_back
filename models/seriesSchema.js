const mongoose = require('mongoose')
const Schema = mongoose.Schema
const publisherSchema = require('./publisherSchema')
const bookSchema = require('./bookSchema')

const seriesSchema = new Schema({
    name:{type:String,unique:true},
    count:{type:Number,default:0},
    books:[{type:Schema.Types.ObjectId,ref:'book'}],
    publisher:{type:Schema.Types.ObjectId,ref:'publisher'}
})

module.exports = mongoose.model("series",seriesSchema,"series")