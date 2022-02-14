const mongoose = require('mongoose')
const Schema = mongoose.Schema
const seriesSchema = require('./seriesSchema')

const publisherSchema = new Schema({
    name:String,
    logo:String,
    intro:String,
    books:[{type:Schema.Types.ObjectId,ref:'book'}],
    series:[{type:Schema.Types.ObjectId,ref:'series'}]
})

module.exports = mongoose.model('publisher',publisherSchema)