const UserModel = require('../models/userSchema')
// const MobilePhoneModel = require("../models/mobilePhone");
// const mesModel = require("../models/message");

// const fs = require("fs");
const jwt = require('jsonwebtoken')
// const tools = require("../utils/tools");
// const bcrypt = require("bcryptjs"); // 用于密码哈希的加密算法
// const { log } = require("debug");
// const SALT_WORK_FACTOR = 10; // 定义加密密码计算强度

const register = async (ctx) => {
  // const { userName, password, mobilePhone, smsCode } = ctx.request.body;
  const { userName, password } = ctx.request.body
  console.log(userName, password)
  // if (!userName || !password || !mobilePhone || !smsCode)
  //   return (ctx.body = {
  //     code: 5020,
  //     msg: "请输入完整信息",
  //   });
  // if (!ctx.session.smsCode)
  //   return (ctx.body = {
  //     code: 5021,
  //     msg: "验证码已过期",
  //   });
  // if (ctx.session.smsCode !== smsCode)
  //   return (ctx.body = {
  //     code: 5022,
  //     msg: "验证码不正确",
  //   });
  try {
    const userDoc = await UserModel.findOne({
      $or: [
        {
          userName,
        },
        // {
        //   mobilePhone,
        // },
      ],
    })
    if (userDoc !== null)
      return (ctx.body = {
        code: 0,
        msg: '用户名已存在',
      })
    // 注册账号
    const userEntity = new UserModel({
      userName,
      password,
      // mobilePhone,
    })
    await userEntity.save()
    const token = jwt.sign({ _id: userEntity._id }, 'LightHouse', {
      expiresIn: 60 * 60 * 24 * 7,
    })
    ctx.body = {
      code: 200,
      user: userEntity,
      token: token,
      msg: '注册成功',
    }
  } catch (error) {
    console.log(error)
  }
}

const login = async (ctx) => {
  const { userName, password } = ctx.request.body
  // if (!userName || !password || !verifyCode)
  //   return (ctx.body = {
  //     code: 5020,
  //     msg: "请输入完整信息",
  //   });
  // if (!ctx.session.picCode)
  //   return (ctx.body = {
  //     code: 5021,
  //     msg: "验证码已过期",
  //   });
  // if (ctx.session.picCode.toUpperCase() !== verifyCode.toUpperCase())
  //   return (ctx.body = {
  //     code: 5022,
  //     msg: "验证码不正确",
  //   });
  try {
    const userDoc = await UserModel.findOne({
      $or: [
        {
          userName,
        },
      ],
    })
    if (!userDoc) return (ctx.body = { code: -1, msg: '用户不存在' })
    // 登录账号
    // const result = await userDoc.comparePassword(password, userDoc.password); // 进行密码比对是否一致
    const result = (await userDoc.password) === password
    if (!result) return (ctx.body = { code: -2, msg: '用户名或者密码错误' })
    const token = jwt.sign({ _id: userDoc._id }, 'LightHouse', {
      expiresIn: 60 * 60 * 24 * 7,
    })
    ctx.body = {
      code: 200,
      msg: '登录成功',
      token,
      user: userDoc,
      // data: {
      //   userName: userDoc.userName,
      //   mobilePhone: userDoc.mobilePhone,
      //   avatar: userDoc.avatar,
      //   signature: userDoc.signature,
      //   nickname: userDoc.nickname,
      //   email: userDoc.email,
      //   province: userDoc.province,
      //   city: userDoc.city,
      //   gender: userDoc.gender,
      //   conversationsList: userDoc.conversationsList,
      //   age: userDoc.age,
      //   friendsGroup: userDoc.friendsGroup,
      //   id: userDoc._id,
      // },
    }
  } catch (error) {
    console.log(error)
  }
}

const save = async (ctx) => {
  console.log(ctx.request.body)
}

const checkUserList = async(ctx)=>{
  const  key  = ctx.query[0]
  try {
    let userlist = []
    let res = await getUserList(key)
    ctx.body = {
      code:200,
      msg:'查询成功',
      data:res
    }
  } catch (error) {
    console.log(error)
  }
}

// 查询用户操作
function getUserList(key){
  return new Promise((resolve,reject)=>{
    console.log('key:',key)
    const reg = new RegExp(key,'i')
    UserModel.find({userName:{$regex:key}}).exec((err,users)=>{
      console.log(users)
      resolve(users)
    })
  })
}

module.exports = {
  register,
  login,
  save,
  checkUserList
  // sendSMSCode,
  // updateUserInfo,
  // getUserInfo,
  // previewUser,
  // addConversationList,
  // removeConversationList,
  // searchFriends,
  // getOfficialInfo,
  // serverAddConversationList,
  // modifyFriendRemark,
  // updatedUserPhone,
  // updatedUserPassword,
  // updateUserConversations,
  // deleteDialog,
  // userCheckIsMyFriend,
}
