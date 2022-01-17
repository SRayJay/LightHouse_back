// const router = require('koa-router')()
// const util = require('./../utils/util')
// const Admin = require('./../models/adminSchema')

// router.prefix('/admin')

// router.post('/login', async(ctx)=>{
//     console.log(ctx.request.body.admin)
//     const {adminName,adminPwd} = ctx.request.body.admin;
//     try {
//         const res = await Admin.findOne({
//             adminName,
//             adminPwd
//         })
//         console.log(res)
//         // if(res){
//         //     util.success(res)
//         // }else{
//         //     util.fail('账号或密码不正确')
//         // }
//     } catch (error) {
//         // util.fail(error.msg)
//     }
    
// })
const Router = require('koa-router')

const router = new Router()
const api = require('./../controller/admin')


router.post('/login', api.login)


module.exports = router