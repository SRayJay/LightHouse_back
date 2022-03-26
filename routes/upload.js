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
    try {
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

router.post('/logo',koaBody({
    // encoding:'gzip',
    multipart: true,
    formidable:{
        uploadDir:path.join(__dirname,'../public/uploads/logo'),
        keepExtensions:true,
    },
}),
async(ctx)=>{
    try {
        const avatar = ctx.request.files.avatar
        const basename = path.basename(avatar.path)
        // ctx.body = { "url": `${ctx.origin}/uploads/author/${basename}` }
        ctx.body = {
            code:200,
            msg:'上传成功',
            url:`${ctx.origin}/uploads/logo/${basename}`,
            data:`/uploads/logo/${basename}`
        }
    } catch (error) {
        ctx.body={
            code:400001,
            msg:'上传失败',
            data:{}
        }
    }
})

router.post('/cover',koaBody({
    // encoding:'gzip',
    multipart: true,
    formidable:{
        uploadDir:path.join(__dirname,'../public/uploads/book'),
        keepExtensions:true,
    },
}),
async(ctx)=>{
    try {
        const avatar = ctx.request.files.avatar
        const basename = path.basename(avatar.path)
        // ctx.body = { "url": `${ctx.origin}/uploads/author/${basename}` }
        ctx.body = {
            code:200,
            msg:'上传成功',
            url:`${ctx.origin}/uploads/book/${basename}`,
            data:`/uploads/book/${basename}`
        }
    } catch (error) {
        ctx.body={
            code:400001,
            msg:'上传失败',
            data:{}
        }
    }
})

// 用户上传动态图片
router.post('/moment',koaBody({
    // encoding:'gzip',
    multipart: true,
    formidable:{
        uploadDir:path.join(__dirname,'../public/uploads/moment'),
        keepExtensions:true,
    },
}),
async(ctx)=>{
    try {
        const avatar = ctx.request.files.file
        const basename = path.basename(avatar.path)
        ctx.body = {
            code:200,
            msg:'上传成功',
            url:`${ctx.origin}/uploads/moment/${basename}`,
            data:`/uploads/moment/${basename}`
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:400001,
            msg:'上传失败',
            data:error
        }
    }
})

// 用户上传头像
router.post('/avatar',koaBody({
    // encoding:'gzip',
    multipart: true,
    formidable:{
        uploadDir:path.join(__dirname,'../public/uploads/avatar'),
        keepExtensions:true,
    },
}),
async(ctx)=>{
    try {
        const avatar = ctx.request.files.avatar
        const basename = path.basename(avatar.path)
        // ctx.body = { "url": `${ctx.origin}/uploads/author/${basename}` }
        ctx.body = {
            code:200,
            msg:'上传成功',
            url:`${ctx.origin}/uploads/avatar/${basename}`,
            data:`/uploads/avatar/${basename}`
        }
    } catch (error) {
        ctx.body={
            code:400001,
            msg:'上传失败',
            data:{}
        }
    }
})

// 用户上传背景图片
router.post('/background',koaBody({
    // encoding:'gzip',
    multipart: true,
    formidable:{
        uploadDir:path.join(__dirname,'../public/uploads/background'),
        keepExtensions:true,
    },
}),
async(ctx)=>{
    console.log(ctx.request.files)
    try {
        const background = ctx.request.files.background
        const basename = path.basename(background.path)
        // ctx.body = { "url": `${ctx.origin}/uploads/author/${basename}` }
        ctx.body = {
            code:200,
            msg:'上传成功',
            url:`${ctx.origin}/uploads/background/${basename}`,
            data:`/uploads/background/${basename}`
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:400001,
            msg:'上传失败',
            data:error
        }
    }
})
module.exports = router