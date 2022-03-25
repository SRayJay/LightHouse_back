const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {getCurrentTime} = require('../utils/util')
const momentSchema = new Schema({
    content:String,
    pics:[{type:String}],
    replys:[{type:Schema.Types.ObjectId,ref:'comment'}],
    likes:[{type:Schema.Types.ObjectId,ref:'user'}],
    creator:{type:Schema.Types.ObjectId,ref:'user'},
    create_time:{type:String,default:getCurrentTime}
})

module.exports = mongoose.model('moment',momentSchema)