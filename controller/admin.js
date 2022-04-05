const AdminModel = require('../models/adminSchema')
const UserModel = require('../models/userSchema')
const BookModel = require('../models/bookSchema')
const AuthorModel = require('../models/authorSchema')
const SeriesModel = require('../models/seriesSchema')
const ProducerModel = require('../models/producerSchema')
const PublisherModel = require('../models/publisherSchema')
const login = async (ctx) => {
    const { adminName, adminPwd } = ctx.request.body.admin
    
    try {
      const adminDoc = await AdminModel.findOne({
        $or: [
          {
            adminName,
          },
        ],
      })
      if (!adminDoc) return (ctx.body = { code: -1, msg: '用户不存在' })
     
      ctx.body = {
        code: 200,
        msg: '登录成功',
        // token,
        data: adminDoc,
       
      }
    } catch (error) {
      console.log(error)
    }
  }

const getUserList = async(ctx) =>{
  let key = ctx.query[0] || null;
  console.log(key)
  try {
    if(key){
      let res= await UserModel.find({userName:{$regex:key}})
      ctx.body={
        code:200,
        msg:'查询成功',
        data:res
      }
    }else{
      let res = await UserModel.find({})
      ctx.body={
        code:200,
        msg:'查询成功',
        data:res
      }
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
const getBookList = async(ctx)=>{
  let key = ctx.query[0] || null;
  console.log(key)
  try {
    if(key){
      let res= await BookModel.find({name:{$regex:key}}).populate('author','name')
      ctx.body={
        code:200,
        msg:'查询成功',
        data:res
      }
    }else{
      let res = await BookModel.find({}).populate('author','name')
      ctx.body={
        code:200,
        msg:'查询成功',
        data:res
      }
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
const addBook = async(ctx)=>{
  console.log(ctx.request.body)
  let {name,intro,author,ISBN,series,cover,translator,belong,classify,publisher,producer,publishTime} = ctx.request.body;
  try {
      
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
module.exports = {
    login,
    getUserList,
    getBookList,
    addBook,
    deleteBook
}