const router = require('koa-router')()
const api = require('../controller/editor')
router.post("/checkReview",api.checkReview)


module.exports = router