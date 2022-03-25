const Router = require('koa-router')

const router = new Router()
const api = require('./../controller/book')

// 查询热门书籍
router.get("/hotBooks",api.hotBooks)
router.get("/checkBookList",api.checkBookList)
router.post("/addBook",api.addBook)
router.post("/deleteBook",api.deleteBook)
router.get("/getBook",api.getBook)

router.post('/bookListAct',api.bookListAct)
// router.post('/login', api.login)

// router.post('/save', api.save)

// router.get('/checkUserList', api.checkUserList)
module.exports = router
