const router = require('koa-router')()
const api = require('./../controller/social') 

router.get('/getMoments',api.getMoments)
router.post('/like',api.like)
router.get('/getMomentById',api.getMomentById)
module.exports = router