const ReviewModel = require('../models/reviewSchema')
const UserModel = require('../models/userSchema')
const BookModel = require('../models/bookSchema')
const CommentModel = require('../models/commentSchema')
const MomentModel = require('../models/momentSchema')
const jwt = require('jsonwebtoken')

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
    let {title,content,writer,text,related_book} = ctx.request.body;
    try {
        const review = new ReviewModel({
            title,
            content,
            text,
            writer,
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



const getReview = async(ctx)=>{
    let id = ctx.query[0]
    try {
        let review = await ReviewModel.findById(id)
        .populate('writer','userName avatar signature')
        .populate({path:'related_book',select:'name intro cover',populate:{path:'author',select:'name'}})
        .populate({path:'comments',select:'content create_time',populate:{path:'creator',select:'userName avatar'}})
        .exec()
        ctx.body={
            code:200,
            msg:'获取成功',
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


const publishComment = async(ctx)=>{
    let {content,creator,depth,type,base_review,base_comment} = ctx.request.body;
    try {
        const comment = new CommentModel({
            content,
            creator,
            depth,
            type,
            base_review,
            base_comment
        })
        await comment.save()
        if(base_review){
            await ReviewModel.findByIdAndUpdate(base_review,{$push:{comments:comment._id}}).exec()
        }
        ctx.body={
            code:200,
            msg:'发布成功',
            data:comment
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

const publishMoment = async(ctx)=>{
    let {content,pics,} = ctx.request.body;
    let creator = jwt.verify(ctx.request.headers['token'],'LightHouse')
    try {
        const moment = new MomentModel({
            content,
            pics,
            creator,
        })
        await moment.save()
        await UserModel.findByIdAndUpdate(creator,{$push:{moments:moment._id}}).exec()
        
        ctx.body={
            code:200,
            msg:'发布成功',
            data:moment
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
    getReview,
    publishComment,
    publishMoment
}