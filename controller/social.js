const MomentModel = require('../models/momentSchema')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const getMoments = async(ctx)=>{
    
    try {
        if(ctx.request.header['token']){
            let token = jwt.verify(ctx.request.headers['token'],'LightHouse')
            let moments = await getMoment(1,token._id)
            ctx.body={
                code:200,
                msg:'获取成功',
                data:moments
            }
        }else{
            let moments = await getMoment(1,null)
            ctx.body={
                code:200,
                msg:'获取成功',
                data:moments
            }
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:40001,
            msg:'接口错误',
            data:error
        }
    }
}
const getMomentById = async(ctx)=>{
    let id = ctx.query[0]
    console.log(ctx.query[0])
    try {
        if(ctx.request.header['token']){
            let token = jwt.verify(ctx.request.headers['token'],'LightHouse')
            let moment = await getMoment(2,token._id,id)
            ctx.body={
                code:200,
                msg:'获取成功',
                data:moment
            }
        }else{
            let moment = await getMoment(2,null,id)
            ctx.body={
                code:200,
                msg:'获取成功',
                data:moment
            }
        }
        
    } catch (error) {
        console.log(error)
        ctx.body={
            code:40001,
            msg:'接口错误',
            data:error
        }
    }
}
function getMoment(type,token,id){
    // 全获取
    if(type===1){
        return new Promise((resolve,reject)=>{
            MomentModel.find({}).lean().populate('creator','userName avatar signature').exec((err,moments)=>{
                if(token){
                    moments.forEach((i)=>{
                        console.log(i.likes.some((item)=>ObjectId(item).toString()===token))
                        if(i.likes.some((item)=>ObjectId(item).toString()===token)){
                            i.isLike=true
                        }else{
                            i.isLike=false
                        }
                        console.log(i)
                    })
                    resolve(moments)
                }else{
                    resolve(moments)
                }
            })
        })

    // 根据id获取单条动态    
    }else if(type===2){
        return new Promise((resolve,reject)=>{
            MomentModel.findById(id).lean().populate('creator','userName avatar signature').exec((err,moment)=>{
                if(token){
                    let isLike=false;
                    if(moment.likes.some(item=>ObjectId(item).toString()===token)){
                        isLike = true;  
                    }else {
                        isLike = false; 
                    }
                    resolve({...moment,isLike})
                }else{
                    resolve({...moment})
                }
               
            })
            
            
            
        })
    }
}
/**
 * 
 * @param type: 1-动态 2-书评  
 */
const like = async(ctx)=>{
    let {id,type} =  ctx.request.body;
    let token = jwt.verify(ctx.request.headers['token'],'LightHouse')
    console.log(token)
    try {
        if(type===1){
            // await MomentModel.findByIdAndUpdate(id,{$push:{likes:token._id}})
            let momentDoc = await MomentModel.findById(id)
            if(momentDoc.likes.indexOf(token._id)!==-1){
                 momentDoc.likes.splice(momentDoc.likes.indexOf(token._id),1)
            }else{
                 momentDoc.likes.push(token._id)
            }
            await momentDoc.save()
        }else if(type===2){

        }
        ctx.body={
            code:200,
            msg:'操作成功',
            data:{}
        }
    } catch (error) {
        console.log(error)
        ctx.body={
            code:40001,
            msg:'接口出错',
            data:error
        }
    }
}

module.exports = {
    getMoments,
    getMomentById,
    like
}