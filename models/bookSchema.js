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
    have_read:[{type:Schema.Types.ObjectId}],
    reading:[{type:Schema.Types.ObjectId,}],
    want_read:[{type:Schema.Types.ObjectId,}],
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