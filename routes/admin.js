// const router = require('koa-router')()
// const util = require('./../utils/util')
// const Admin = require('./../models/adminSchema')

// router.prefix('/admin')

// router.post('/login', async(ctx)=>{

    
// })
const Router = require('koa-router')

const router = new Router()
const api = require('./../controller/admin')


router.post('/login', api.login)
router.get('/getUserList',api.getUserList)
router.get('/getBookList',api.getBookList)

module.exports = router