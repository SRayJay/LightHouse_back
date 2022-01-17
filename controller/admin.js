const AdminModel = require('../models/adminSchema')

const login = async (ctx) => {
    const { adminName, adminPwd } = ctx.request.body.admin
    
    try {
      const adminDoc = await AdminModel.findOne({
        $or: [
          {
            adminName,
          },
          // {
          //   mobilePhone: userName,
          // },
        ],
      })
      if (!adminDoc) return (ctx.body = { code: -1, msg: '用户不存在' })
     
      ctx.body = {
        code: 200,
        msg: '登录成功',
        // token,
        admin: adminDoc,
       
      }
    } catch (error) {
      console.log(error)
    }
  }
  module.exports = {
      login
  }