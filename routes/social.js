const router = require('koa-router')()
const api = require('./../controller/social') 

router.get('/getMoments',api.getMoments)

module.exports = router