const ProducerModel = require('../models/producerSchema')
const PublisherModel = require('../models/publisherSchema')
const SeriesModel = require('../models/seriesSchema')


const getPublishers = async(ctx)=>{
    try {
        let res = await getData(1)
        ctx.body={
            code:200,
            msg:'查询成功',
            data:res
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code:40001,
            msg:'接口出错',
            data:{}
        }
    }
}
const addPublisher = async(ctx)=>{
    let {name,intro,logo} = ctx.request.body
    try {
        const publisherDoc = await PublisherModel.findOne({
            name
        })
        if(publisherDoc) return
            ctx.body={
                code:40001,
                msg:'已存在该出版社',
                data:{}
            }
        const publisher = new PublisherModel({
            name,
            intro,
            logo
        })
        await publisher.save()
        ctx.body={
            code:200,
            msg:'新增成功',
            data:publisher
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code:40001,
            msg:'添加出错',
            data:{}
        }
    }
}
const addProducer = async(ctx)=>{
    let {name,intro,logo} = ctx.request.body
    try {
        const producerDoc = await ProducerModel.findOne({
            name
        })
        if(producerDoc) return
            ctx.body={
                code:40001,
                msg:'已存在该出品方',
                data:{}
            }
        const producer = new ProducerModel({
            name,
            intro,
            logo
        })
        await producer.save()
        ctx.body={
            code:200,
            msg:'新增成功',
            data:producer
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code:40001,
            msg:'添加出错',
            data:{}
        }
    }
}
const getProducers = async(ctx)=>{
    try {
        let res = await getData(2)
        ctx.body={
            code:200,
            msg:'查询成功',
            data:res
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code:40001,
            msg:'接口出错',
            data:{}
        }
    }
}

const addSeries = async(ctx)=>{
    const {name,count,pubId} = ctx.request.body;
    try {
        let s = new SeriesModel({
            name,count,publisher:pubId
        })
        await s.save()
        console.log(s)
        await PublisherModel.findOneAndUpdate({_id:pubId},{$push:{series:s._id}}).exec()
        ctx.body={
            code:200,
            msg:'添加成功',
            data:s
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code:40001,
            msg:'接口出错',
            data:{}
        }
    }
}
/**
 * @param 1:Publisher,2:Producer
 */
function getData(param){
    return new Promise((resolve,reject)=>{
        if(param==1){
            PublisherModel.find({}).populate('series','name').exec((err,publishers)=>{
                resolve(publishers)
            })
        }else if(param ==2){
            ProducerModel.find({}).exec((err,producers)=>{
                resolve(producers)
            })
        }
    })
}


module.exports={
    getPublishers,
    getProducers,
    addPublisher,
    addProducer,
    addSeries
}