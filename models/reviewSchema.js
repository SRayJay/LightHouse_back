const mongoose = require('mongoose');
const { getCurrentTime } = require('../utils/util');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title:String,
    content:String,
    text:String,
    publish_time:{type:String,default:getCurrentTime},
    likes:[{type:Schema.Types.ObjectId,ref:'user'}],
    // 还有reply
    writer:{type:Schema.Types.ObjectId,ref:'user'},
    related_book:{type:Schema.Types.ObjectId,ref:'book'}
})

module.exports = mongoose.model('review',reviewSchema)