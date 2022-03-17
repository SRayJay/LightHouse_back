const router = require('koa-router')()
const api = require('../controller/editor')
router.post("/checkReview",api.checkReview)
router.post('/publishReview',api.publishReview)


module.exports = router