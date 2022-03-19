/**
 * 通用工具函数
 * @author SRayJay
 */

const CODE = {
    SUCCESS: 200,
    PARAM_ERROR: 10001,// 参数错误
    USER_ACCOUT_ERROR: 20001,// 账号或密码错误
    USER_UNLOGIN: 30001,// 用户未登录
    BUSINESS_ERROR: 40001, // 业务请求失败
    AUTH_ERROR: 50001,// 认证失败或TOKEN过期
}
function check10(n){
    if(n<10){
        n='0'+n;
    }
    return n;
}
module.exports = {
    /**
     * 分页结构封装
     * @param {number} pageNum
     * @param {number} pageSize 
     * @returns 
     */
    pager({pageNum,pageSize}){
        pageNum*=1;
        pageSize*=1;
        const skipIndex = (pageNum - 1)*pageSize;
        return {
            page:{
                pageNum,
                pageSize
            },
            skipIndex
        }
    },
    success(data='',msg='',code=CODE.SUCCESS){
        return {
            code,data,msg
        }
    },
    fail(msg='',code=CODE.BUSINESS_ERROR){
        return {
            msg,code
        }
    },
    /**
     * 补全操作，小于10在前面补0
     */
    
    getCurrentTime(){
        let date = new Date()
        let time = date.getFullYear()+'-'+check10(date.getMonth()+1)+'-'+check10(date.getDate())+' '+check10(date.getHours())+':'+check10(date.getMinutes())+':'+check10(date.getSeconds())
        console.log(time)
        // console.log(date.toString().getTime())
        return time
    },
   
}