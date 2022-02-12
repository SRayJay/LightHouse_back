const router = require('koa-router')()
const koaBody = require("koa-body");
const path = require('path')
router.post('/author',koaBody({
    // encoding:'gzip',
    multipart: true,
    formidable:{
        uploadDir:path.join(__dirname,'../public/uploads/author'),
        keepExtensions:true,
    },
}),
async(ctx)=>{
    console.log(1)
    try {
        console.log(ctx.request.files,2)
        const avatar = ctx.request.files.avatar
        const basename = path.basename(avatar.path)
        // ctx.body = { "url": `${ctx.origin}/uploads/author/${basename}` }
        ctx.body = {
            code:200,
            msg:'上传成功',
            url:`${ctx.origin}/uploads/author/${basename}`,
            data:`/uploads/author/${basename}`
        }
    } catch (error) {
        ctx.body={
            code:400001,
            msg:'上传失败',
            data:{}
        }
    }
})

module.exports = router