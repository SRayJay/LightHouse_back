const UserModel = require('../models/userSchema')
// const MobilePhoneModel = require("../models/mobilePhone");
// const mesModel = require("../models/message");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
// const fs = require("fs");
const jwt = require('jsonwebtoken')
const { getCurrentTime } = require('../utils/util')
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
    userDoc.lastLoginTime = getCurrentTime();
    await userDoc.save();
    ctx.body = {
      code: 200,
      msg: '登录成功',
      data:{
        token,
        user:userDoc
      }
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

const saveInfo = async (ctx) => {
  let {userName,city,signature,gender,avatar,background} = ctx.request.body;
  let token = jwt.verify(ctx.request.headers['token'],'LightHouse')
  try {
    await UserModel.findByIdAndUpdate(token._id,{
      userName:userName,
      city,
      signature,
      gender,
      avatar,background
    }).exec()
    let user = await UserModel.findById(token._id).exec()
    ctx.body={
      code:200,
      msg:'修改成功',
      data:user
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

const checkUserList = async(ctx)=>{
  const  key  = ctx.query[0]
  try {
    if(ctx.request.headers['token']){
      let token = jwt.verify(ctx.request.headers['token'],'LightHouse')
      let res = await getUserList(2,key,token._id)
      ctx.body = {
        code:200,
        msg:'查询成功',
        data:res
      }
    }else{
      let res = await getUserList(2,key)
      ctx.body = {
        code:200,
        msg:'查询成功',
        data:res
      }
    }
    
    
  } catch (error) {
    console.log(error)
  }
}
/**
 * 根据id查找用户，返回信息
 */
const getUserInfo = async(ctx) =>{
  let id = ctx.query[0]
  try {
    let res = await getUserList(3,id)
    ctx.body={
      code:200,
      msg:'获取成功',
      data:res
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

const getSpaceInfo = async(ctx) =>{
  let id = ctx.query[0]
  console.log(id)
  try {
    let res = await UserModel.findById(id)
    .populate({path:'moments',select:'content pics',populate:{path:'creator',select:'userName signature avatar'}})
    .populate('wantRead','cover name')
    .populate('reading','cover name')
    .populate('haveRead','cover name')
    .populate({path:'reviews',select:'title text',populate:{path:'related_book',select:'cover name rate'}})
    ctx.body={
      code:200,
      msg:'查询成功',
      data:{moments:res.moments,wantRead:res.wantRead,reading:res.reading,haveRead:res.haveRead,reviews:res.reviews}
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
const getHaveRead = async(ctx)=>{
  let id=ctx.query[0]
  try {
    let res = await UserModel.findById(id).populate({path:'haveRead',select:'name publisher',populate:{path:'author',select:'name'}})
    ctx.body={
      code:200,
      msg:'查询成功',
      data:res.haveRead
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

/**
 * 
 * @param {*} type 1:查询所有 2:根据关键字查名称 3:根据id查单个user 
 * @param {*} key 
 * @returns 
 */
function getUserList(type,key,token){
  return new Promise((resolve,reject)=>{
    if(type===1){
      UserModel.find({}).exec((err,users)=>{
        // console.log(users)
        resolve(users)
      })
    }else if(type===2){
      UserModel.find({userName:{$regex:key}}).lean().exec((err,users)=>{
        if(token){
          users.forEach((user)=>{
            console.log(1)
            user.followers.some((i)=>ObjectId(i).toString()===token)?
            user.isFollow=true:
            user.isFollow=false
          })
          
        }
        resolve(users)
      })
    }else if(type===3){
      UserModel.findById(key).lean().exec((err,user)=>{
        if(token){
          user.followers.some((i)=>ObjectId(i).toString()===token)?
          user = {...user,isFollow:true}:
          user = {...user,isFollow:false}
        }
        resolve(user)
      })
      
      
    }
    
    
  })
}

const addFollow = async(ctx)=>{
  let token = jwt.verify(ctx.request.headers['token'],'LightHouse')
  let {userid} = ctx.request.body
  try {
    let userDoc = await UserModel.findById(userid)
    console.log(userDoc)
    let index = userDoc.followers.findIndex((i)=>ObjectId(i).toString()===token._id)
    if(index!==-1){
      userDoc.followers.splice(index,1)
      await userDoc.save()
      
      ctx.body={
        code:200,
        msg:'取消关注成功',
        data:{user:userDoc,isFollow:false}
      }
    }else{
      userDoc.followers.push(token._id)
      await userDoc.save()
      ctx.body={
        code:200,
        msg:'关注成功',
        data:{user:userDoc,isFollow:true}
      }
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
  register,
  login,
  saveInfo,
  checkUserList,
  getUserList,
  getUserInfo,
  addFollow,
  getSpaceInfo,
  getHaveRead
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
