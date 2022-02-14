const mongoose = require('mongoose')
const Schema = mongoose.Schema

const producerSchema = new Schema({
    name:String,
    intro:String,
    logo:String,
    books:[{type:Schema.Types.ObjectId,ref:'book'}]
})

module.exports = mongoose.model('producer',producerSchema)