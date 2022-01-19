const Router = require('koa-router')

const router = new Router()
const api = require('./../controller/user')

// 用户注册
// router.post("/user/register", api.register);
router.post('/register', api.register)
// 用户登录
router.post('/login', api.login)

router.post('/save', api.save)

router.get('/checkUserList', api.checkUserList)
module.exports = router
