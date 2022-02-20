const BookModel = require('../models/bookSchema');
const path = require('path')
const SeriesModel =require('../models/seriesSchema')
const PublisherModel =require('../models/publisherSchema')
const ProducerModel =require('../models/producerSchema')
const AuthorModel = require('../models/authorSchema')
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
const getBook = async(ctx) =>{
    console.log(ctx.query[0])
    try {
        const id = ctx.query[0]
        let book = await getBooks(2,id)
        ctx.body={
            code:200,
            msg:'查询成功',
            data:book
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:40001,
            msg:'查询出错',
            data:{}
        }
    }
}

const checkBookList = async(ctx)=>{
    try{
        let books = await getBooks(3)
        ctx.body = {
            code:200,
            msg:'查询成功',
            data:books
        }
    }catch(error){
        console.log(error)
    }
}
const addBook = async(ctx)=>{
    console.log(ctx.request.body)
    let {name,intro,author,ISBN,series,cover,translator,publisher,producer,publishTime} = ctx.request.body;
    try {
        let bookDoc = await BookModel.findOne({name}).exec();
        if(bookDoc) return ctx.body={
            code: 40001,
            msg:'已存在该书名',
            data:{}
        }
        let authorDoc = await AuthorModel.findOne({name:author}).exec();
        console.log(authorDoc)
        if(!authorDoc) return ctx.body={
            code:40001,
            msg:'不存在该作者',
            data:{}
        }

        const book = new BookModel({
            name,
            author:authorDoc._id,
            intro,ISBN,cover,publisher,producer,publishTime,translator,series
        })
        await book.save()
        await AuthorModel.findOneAndUpdate({name:author},{$push:{books:book._id}}).exec()
        if(series) await SeriesModel.findOneAndUpdate({name:series},{$push:{books:book._id}}).exec()
        await PublisherModel.findOneAndUpdate({name:publisher},{$push:{books:book._id}}).exec()
        if(producer) await ProducerModel.findOneAndUpdate({name:producer},{$push:{books:book._id}}).exec()
        ctx.body={
            code:200,
            msg:'添加成功',
            data:book
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:40001,
            msg:'添加出错',
            data:{}
        }
    }
}
const deleteBook = async(ctx)=>{
    try {
        let name = ctx.request.body.name;
        console.log(name)
        await BookModel.findOneAndRemove({name}).exec()
        ctx.body={
            code:200,
            msg:'删除成功',
            data:{}
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:40001,
            msg:'删除出错',
            data:{}
        }
    }
}
const getBooksByAuthorId = async(ctx)=>{

}
function getBooks(param,key){
    /**
     * @param:0:搜索books,1:热门书籍,2:指定书籍id查询单本详情,3:得到所有书籍
     */
    return new Promise((resolve,reject)=>{
        if(param==0){
            if(key){
                // 有关键词 搜索相关书籍
                BookModel.find({name:{$regex:key}}).populate('author','name country intro').exec((err,books)=>{
                    resolve(books)
                })
            }
        }else if(param==1){
            // 热门书籍
            BookModel.find({book_isHot:'true'}).populate('author','name country').exec((err,books)=>{
                // BookModel.find({book_isHot:'true'}).exec((err,books)=>{
                console.log(books)
                resolve(books)
            })
        }else if(param==2){
            // 根据id查询指定book
            BookModel.findById(key).populate('author','name country intro').exec((err,book)=>{
                resolve(book)
            })
        }else if(param==3){
            BookModel.find({}).exec((err,books)=>{
                resolve(books)
            })
        }
        
    })
}

module.exports = {
    hotBooks,
    checkBookList,
    addBook,
    deleteBook,
    getBook,
    getBooks
}