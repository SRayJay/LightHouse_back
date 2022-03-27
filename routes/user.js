const Router = require('koa-router')

const router = new Router()
const api = require('./../controller/user')

// 用户注册
// router.post("/user/register", api.register);
router.post('/register', api.register)
// 用户登录
router.post('/login', api.login)

router.post('/saveInfo', api.saveInfo)
router.get('/getUserInfo',api.getUserInfo)
router.get('/checkUserList', api.checkUserList)
router.post('/addFollow',api.addFollow)
module.exports = router
