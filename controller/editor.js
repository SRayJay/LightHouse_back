const ReviewModel = require('../models/reviewSchema')
const UserModel = require('../models/userSchema')
const BookModel = require('../models/bookSchema')


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

const publishReview = async(ctx)=>{
    let {title,content,writer,rate,related_book} = ctx.request.body;
    try {
        const review = new ReviewModel({
            title,
            content,
            writer,
            rate,
            related_book
        })
        await review.save()
        await UserModel.findByIdAndUpdate(writer,{$push:{reviews:review._id}}).exec()
        await BookModel.findByIdAndUpdate(related_book,{$push:{reviews:review._id}}).exec()
        ctx.body={
            code:200,
            msg:'发布成功',
            data:review
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
    checkReview,
    publishReview,
}