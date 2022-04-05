const AdminModel = require('../models/adminSchema')
const UserModel = require('../models/userSchema')
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
module.exports = {
    login,
    getUserList,
    getBookList
}