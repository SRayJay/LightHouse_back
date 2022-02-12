const Router =require('koa-router')
const router= new Router()
const api = require('../controller/author')

router.get('/getAuthors',api.getAuthors)
router.post('/addAuthor',api.addAuthor)
router.post('/deleteAuthor',api.deleteAuthor)
module.exports = router