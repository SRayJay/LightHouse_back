const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publisherSchema = new Schema({
    name:String,
    logo:String,
    intro:String,
    books:{type:Array,default:[]}
})

module.exports = mongoose.model('publisher',publisherSchema)