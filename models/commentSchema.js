const mongoose = require('mongoose');
const { getCurrentTime } = require('../utils/util');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content:String,
    create_time:{type:String,default:getCurrentTime},
    creator:{type:Schema.Types.ObjectId,ref:'user'},
    depth:{type:Number,default:0},
    type:Number, // 0 动态 1 书评 2 帖子
    to:{type:Schema.Types.ObjectId,ref:'user'},
    // base_moment:{type:Schema.Types.ObjectId,ref:'m'}
    base_review:{type:Schema.Types.ObjectId,ref:'review'},
    base_comment:{type:Schema.Types.ObjectId,ref:'comment'}
})

module.exports = mongoose.model('comment',commentSchema)