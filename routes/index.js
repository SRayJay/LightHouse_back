const router = require('koa-router')()
const path = require('path')
router.post('/', async (ctx, next) => {
   ctx.body = "hello"
})

router.post('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
