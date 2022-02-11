const BookModel = require('../models/bookSchema');
const path = require('path')

const hotBooks = async(ctx)=>{
    try {
        let books = await getBooks(1)
        // const bookDoc = await BookModel.find({book_isHot:true}).exec((err,books)=>{
            ctx.body = {
                code:200,
                msg:'查询成功',
                data:books
            }
        // })
    } catch (error) {
        console.log(error)
    }
}
const checkBookList = async(ctx)=>{
    try{
        let books = await getBooks(0)
        ctx.body = {
            code:200,
            msg:'查询成功',
            data:books
        }
    }catch(error){
        console.log(error)
    }
}
const uploadCover = async(ctx)=>{
    console.log(ctx.request.files)
    const cover = ctx.request.files.avatar
    const basename = path.basename(cover.path)
    // ctx.body = { "url": `${ctx.origin}/uploads/${basename}` }
    ctx.body={"url":`${basename}`}
}

function getBooks(param,key){
    /**
     * @param:0:搜索books,1:热门书籍
     */
    return new Promise((resolve,reject)=>{
        if(param==0){
            if(key){
                BookModel.find({}).exec((err,books)=>{
                    console.log(books)
                    resolve(books)
                })
            }else{
                BookModel.find({}).exec((err,books)=>{
                    console.log(books)
                    resolve(books)
                })
            }
        }else if(param==1){
            BookModel.find({book_isHot:'true'}).exec((err,books)=>{
                console.log(books)
                resolve(books)
            })
        }
        
    })
}

module.exports = {
    hotBooks,
    checkBookList,
    uploadCover
}