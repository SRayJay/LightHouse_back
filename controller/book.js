const BookModel = require('../models/bookSchema');

const hotBooks = async(ctx)=>{
    try {
        // const bookDoc = await BookModel.find({book_isHot:true}).exec((err,books)=>{
            ctx.body = {
                code:200,
                msg:'查询成功',
                data:'111'
            }
        // })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    hotBooks
}