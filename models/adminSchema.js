const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {getCurrentTime} = require('../utils/util')

const adminSchema = new Schema({
    adminId:{type:String,unique:true},
    adminName:{type:String,unique:true},
    adminPwd:{type:String},
    createTime:{
        type:string,
        default:getCurrentTime
    },
    lastLoginTime:{
        type:string,
        default:getCurrentTime
    }
})

module.exports = mongoose.model("admin", adminSchema,"admin");