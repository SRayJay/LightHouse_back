const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({

    name:{type:String,},
    authorId:{type:Schema.Types.ObjectId},
    publisherId:{type:Schema.Types.ObjectId},
    ISBN:String,
    intro:String,
    have_read:Array,
    reading:Array,
    want_read:Array,
    reviews:Array,
    excerpts:Array,
    rate:Number,
    comments:Array,
    publishTime:Date,
    // book_cate
    // book_label:
    photoUrl:String,
    book_isHot:{type:Boolean,default:false}

})

module.exports = mongoose.model("book",bookSchema)