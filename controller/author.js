const AuthorModel = require('../models/authorSchema');


const addAuthor = async(ctx)=>{
    const {name,intro,country,photo,nobel} = ctx.request.body
    try {
        const authorDoc = await AuthorModel.findOne({
            name
        })
        if(authorDoc) return
            ctx.body={
                code:40001,
                msg:'已存在该作者',
                data:{}
            }
        
        const author = new AuthorModel({
            name:name,
            intro,
            country,
            photo,
            nobel
        })
        await author.save()
        ctx.body={
            code:200,
            msg:'新增成功',
            data:author
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteAuthor = async(ctx)=>{
    console.log(ctx.request.body)
    const name = ctx.request.body.name
    try {
        await AuthorModel.findOneAndRemove({name:name}).exec()
        ctx.body={
            code:200,
            msg:'删除成功',
            data:{}
        }
    } catch (error) {
        console.log(error)
    }
}
const getAuthors = async(ctx)=>{
    try {
        const key = ctx.query[0]
        let res = await getAuthorList(key)
        ctx.body= {
            code:200,
            msg:'获取作者列表成功',
            data: res
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code:40001,
            msg:'接口出错',
            data:{}
        }
    }
}
const getAuthorById = async(ctx)=>{
    try {
        let author = await getAuthor(ctx.query[0])
        ctx.body={
            code:200,
            msg:'查询成功',
            data:author
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code:40001,
            msg:'接口出错',
            data:{}
        }
    }
}
function getAuthor(id){
    return new Promise((resolve,reject)=>{
        AuthorModel.findById(id).exec((err,author)=>{
            resolve(author)
        })
    })
}
function getAuthorList(key){
    return new Promise((resolve,reject)=>{
        if(key){
            AuthorModel.find({name:{$regex:key}}).exec((err,authors)=>{
                console.log(authors),
                resolve(authors)
            })
        }else{
            AuthorModel.find({}).exec((err,authors)=>{
                console.log(authors),
                resolve(authors)
            })
        }
        
    })
}
module.exports = {
    addAuthor,
    getAuthors,
    deleteAuthor,
    getAuthorList,
    getAuthorById
}