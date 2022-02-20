const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title:String,
    content:String,
    publish_time:Date,
    writer:{type:Schema.Types.ObjectId,ref:'user'},
    related_book:{type:Schema.Types.ObjectId,ref:'book'}
})

module.exports = mongoose.model('review',reviewSchema)