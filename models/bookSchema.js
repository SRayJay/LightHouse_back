const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorSchema = require('./authorSchema')
const bookSchema = new Schema({

    name:String,
    author:{type:Schema.Types.ObjectId,ref:'author'},
    publisher:String,
    producer:String,
    ISBN:String,
    intro:String,
    translator:String,
    series:String,
    belong:String, // 所属：拉美文学 中国古典文学 中国现当代文学 法国文学 英国文学 美国文学 俄国文学 德国文学 海外华语文学 日本文学 其他文学
    classify:String, // 分类：散文 诗歌 小说 人文 社科 传记 随笔
    haveRead:[{type:Schema.Types.ObjectId}],
    reading:[{type:Schema.Types.ObjectId,}],
    wantRead:[{type:Schema.Types.ObjectId,}],
    reviews:[{type:Schema.Types.ObjectId,ref:'review'}],
    excerpts:[{type:Schema.Types.ObjectId,}],
    rate:{type:Number,default:0},
    comments:[{type:Schema.Types.ObjectId,}],
    publishTime:String,
    pages:Number,
    // book_cate
    // book_label:
    cover:{type:String,default:'/img/default_book.png'},
    book_isHot:{type:Boolean,default:false}

})

module.exports = mongoose.model("book",bookSchema)