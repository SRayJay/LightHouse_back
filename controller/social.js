const MomentModel = require('../models/momentSchema')

const getMoments = async(ctx)=>{

    try {
        let moments = await MomentModel.find({}).populate('creator','userName avatar signature').exec()
        ctx.body={
            code:200,
            msg:'获取成功',
            data:moments
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

module.exports = {
    getMoments
}