const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({

    name:{type:String,},
    authorId:{type:Schema.Types.ObjectId},
    publisherId:{type:Schema.Types.ObjectId},
    ISBN:String,
    intro:String,
    have_read:{type:Array,default:[]},
    reading:{type:Array,default:[]},
    want_read:{type:Array,default:[]},
    reviews:{type:Array,default:[]},
    excerpts:{type:Array,default:[]},
    rate:{type:Number,default:0},
    comments:{type:Array,default:[]},
    publishTime:Date,
    // book_cate
    // book_label:
    photoUrl:String,
    book_isHot:{type:Boolean,default:false}

})

module.exports = mongoose.model("book",bookSchema)