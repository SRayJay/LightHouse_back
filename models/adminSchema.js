const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    adminId:{type:String,unique:true},
    adminName:{type:String,unique:true},
    adminPwd:{type:String},
    createTime:{
        type:Date,
        default:Date.now
    },
    lastLoginTime:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("admin", adminSchema,"admin");