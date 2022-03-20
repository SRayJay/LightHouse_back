const router = require('koa-router')()
const api = require('../controller/editor')
router.post("/checkReview",api.checkReview)
router.post('/publishReview',api.publishReview)
router.get('/getReview',api.getReview)
router.post('/publishComment',api.publishComment)
module.exports = router