const ReviewModel = require('../models/reviewSchema')


const checkReview = async(ctx)=>{
    let {userid,bookid } = ctx.request.body;
    try {
        let reviewdoc = await ReviewModel.findOne({writer:userid,related_book:bookid})
        if(reviewdoc){ 
            console.log(reviewdoc)
            return ctx.body={
                code:200,
                msg:'存在书评',
                data:reviewdoc
            }
        }else{
            return ctx.body={
                code:200,
                msg:'尚未存在书评',
                data:{}
            }
        }
    } catch (error) {
        console.log(error)
        return ctx.body={
            code:40001,
            msg:'接口出错',
            data:{}
        }
    }
}


module.exports ={
    checkReview
}