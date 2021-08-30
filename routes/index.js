const router = require('koa-router')()
const path = require('path')
router.post('/', async (ctx, next) => {
   ctx.body = "hello"
})

router.post('/uploadavatar', async (ctx, next) => {
  console.log(ctx.request.files)
  // console.log(ctx.request.files)
  const avatar = ctx.request.files.avatar
  const basename = path.basename(avatar.path)
  ctx.body = { "url": `${ctx.origin}/uploads/${basename}` }
})

router.post('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
