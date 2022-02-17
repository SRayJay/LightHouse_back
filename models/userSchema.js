const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Schema
  userId: {type:Number,unique:true},
  userName: { type: String, unique: true },
  password: {type:String},
  mobilePhone: { type: String, unique: true }, // 手机号码
  avatar: { type: String, default: "/img/default_avatar.jpg" }, // 默认头像
  signature: { type: String, default: "这个人很懒，暂时没有签名哦！" },
  email: { type: String, default: "" },
  province: { type: String, default: "" }, // 省
  city: { type: String, default: "" }, // 市
  gender: { type: Number, default: 2 }, // 1 男 0 女 2 保密
  signUpTime: { type: Date, default: +new Date() }, // 注册时间
  lastLoginTime: { type: Date, default: +new Date() }, // 最后一次登录
  // conversationsList: Array, // 会话列表 * name 会话名称 * photo 会话头像 * id 会话id * type   会话类型 group/ frend/me
  // emoji: Array, // 表情包
  age: { type: Number, default: 0 },
  background:{type:String,default:'/img/default_background.jpg'}, // 默认背景
  focus: {
    type: Array,
    default: []
  },
  followers:{
    type: Array,
    default: []
  }

});

module.exports = mongoose.model("user", userSchema,"user");
