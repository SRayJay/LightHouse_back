const BookModel = require('../models/bookSchema');
const path = require('path')
const jwt = require('jsonwebtoken')
const SeriesModel =require('../models/seriesSchema')
const PublisherModel =require('../models/publisherSchema')
const ProducerModel =require('../models/producerSchema')
const AuthorModel = require('../models/authorSchema')
const UserModel = require('../models/userSchema')
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
        if(ctx.request.headers['token']){
            let {_id} = jwt.verify(ctx.request.headers['token'],'LightHouse')
            let result = {isWantRead:false,isReading:false,isHaveRead:false}
            let book = await getBooks(2,id)
            let userdoc= await UserModel.findById(_id)
            // console.log(userdoc)
            if(userdoc.wantRead.indexOf(id)!==-1) result.isWantRead=true;
            if(userdoc.reading.indexOf(id)!==-1) result.isReading=true;
            if(userdoc.haveRead.indexOf(id)!==-1) result.isHaveRead=true; 
            ctx.body={
                code:200,
                msg:'查询成功',
                data:{book,result}
            }
        }else{
            let book = await getBooks(2,id)
            ctx.body={
                code:200,
                msg:'查询成功',
                data:{book}
            }
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

const addBook = async(ctx)=>{
    console.log(ctx.request.body)
    let {name,intro,author,ISBN,series,cover,translator,belong,classify,publisher,producer,publishTime} = ctx.request.body;
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
            intro,ISBN,cover,publisher,producer,publishTime,translator,series,belong,classify
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
const getBooksByBelong = async(ctx)=>{
    let key= ctx.query[0];
    try {
        let books = await getBooks(4,key)
        ctx.body={
            code:200,
            msg:'查询成功',
            data:books
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:200,
            msg:"接口出错",
            data:error
        }
    }
}
function getBooks(param,key,token){
    /**
     * @param:0:搜索books,1:热门书籍,2:指定书籍id查询单本详情,3:得到所有书籍 4:根据belong得到书籍列表
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
            BookModel.findById(key).populate('author','name country intro').populate('reviews','title content text').exec((err,book)=>{
                resolve(book)
            })          
        }else if(param==3){
            
        }else if(param==4){
            BookModel.find({belong:key}).populate('author','name country intro').exec((err,books)=>{
                resolve(books)
            })
        }
        
    })
}

/**
 * 书单操作 type:1 想读 type:2 在读 type:3 已读
 */
const bookListAct= async(ctx)=>{
    let token = ctx.request.headers['token']
    let {_id:userid} = jwt.verify(token,'LightHouse')
    let {bookid,type} = ctx.request.body;
    try {
        let userDoc = await UserModel.findById(userid)
        let bookDoc = await BookModel.findById(bookid)
        let upos1 = userDoc.wantRead.indexOf(bookid)
        let bpos1 = bookDoc.wantRead.indexOf(userid)
        let upos2 = userDoc.reading.indexOf(bookid)
        let bpos2 = bookDoc.reading.indexOf(userid)
        let upos3 = userDoc.haveRead.indexOf(bookid)
        let bpos3 = bookDoc.haveRead.indexOf(userid)
        console.log(upos1,upos2,upos3)
        if(type===1){
            if(upos2!==-1){
                userDoc.reading.splice(upos2,1)
                bookDoc.reading.splice(bpos2,1)
            }
            if(upos3!==-1){
                userDoc.haveRead.splice(upos3,1)
                bookDoc.haveRead.splice(bpos3,1)
            }
            if(upos1!==-1){
                userDoc.wantRead.splice(upos1,1)
                bookDoc.wantRead.splice(bpos1,1)
            }else{
                userDoc.wantRead.push(bookid)
                bookDoc.wantRead.push(userid)
            }

        }else if(type===2){
            if(upos1!==-1){
                userDoc.wantRead.splice(upos1,1)
                bookDoc.wantRead.splice(bpos1,1)
            }
            if(upos3!==-1){
                userDoc.haveRead.splice(upos3,1)
                bookDoc.haveRead.splice(bpos3,1)
            }
            if(upos2!==-1){
                userDoc.reading.splice(upos2,1)
                bookDoc.reading.splice(bpos2,1)
            }else{
                userDoc.reading.push(bookid)
                bookDoc.reading.push(userid)
            }

        }else{
            if(upos1!==-1){
                userDoc.wantRead.splice(upos1,1)
                bookDoc.wantRead.splice(bpos1,1)
            }
            if(upos2!==-1){
                userDoc.reading.splice(upos2,1)
                bookDoc.reading.splice(bpos2,1)
            }
            if(upos3!==-1){
                userDoc.haveRead.splice(upos3,1)
                bookDoc.haveRead.splice(bpos3,1)
            }else{
                userDoc.haveRead.push(bookid)
                bookDoc.haveRead.push(userid)
            }
        }
        await userDoc.save()
        await bookDoc.save()
        ctx.body={
            code:200,
            msg:'操作成功',
            data:{}
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:40001,
            msg:'接口错误',
            data:error
        }
    }
}
module.exports = {
    hotBooks,
    addBook,
    deleteBook,
    getBook,
    getBooks,
    getBooksByBelong,
    bookListAct
}