var express = require('express');
var router = express.Router();

// 引入ChatModel
const { ChatModel } = require('../models/chat');
// 引入UserModel
const { UserModel } = require('../models/user');

//过滤属性
const filter = { password: 0, __v: 0 };

/**
 * @typedef UserParams
 * @property {string} userid.required - 用户id
 */

/**
 * @typedef Response
 * @property {number} code
 * @property {string} message
 * @property {object} result
 * @property {boolean} success
 */

//路由：获取当前用户所有相关聊天信息列表
/**
 * @route POST /chat/list
 * @summary 消息列表
 * @group chat - 聊天模块
 * @param {UserParams.model} request.cookie.required - 参数
 * @returns {Response.model} 200 - OK
 * @returns {Error} 404 - Not Found
 */
router.get('/list',function(req,res){
  //1.获取cookie中的用户id
  const userid = req.cookies.userid;

  UserModel.find(function(error,userDocs) {
    const users = {};
    userDocs.forEach(doc=>{
      users[doc._id] = {username: doc.username, avatar:doc.avatar}
    })

    //查询userid相关的所有聊天信息
    ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function(err,chatMsgs) {
      res.send({code: 200, result: {users, chatMsgs}, success: true, message: '查询成功'})  //更新的数量
    })
  })

})

//路由：获取当前会话的聊天信息列表
/**
 * @route POST /chat/detail
 * @summary 消息列表
 * @group chat - 聊天模块
 * @param {UserParams.model} request.cookie.required - 参数
 * @returns {Response.model} 200 - OK
 * @returns {Error} 404 - Not Found
 */
router.get('/list',function(req,res){
  const {chat_id} = req.body;

  //查询userid相关的所有聊天信息
  ChatModel.find({'$or':[{ chat_id }]},filter,function(err, result) {
    res.send({code: 200, result, success: true, message: '查询成功'})  //更新的数量
  })

})

//路由：修改指定消息为已读
/*
* path: /readmsg
* method：post
* params: 参数1：查询条件
*         参数2：更新为指定的数据对象
*         参数3：是否1次更新多条，默认只更新一条
*         参数4：更新完成的回调函数
* */
router.post('/readmsg',function(req,res){
  //1.得到请求中的from和to
  const {from} = req.body;
  const to = req.cookies.userid;

  ChatModel.update({from,to,read:false},{read: true},{multi:true},function(error,doc) {
      res.send({code: 0, data: doc.nModified});
  })

})

// 测试用接口
router.post('/getmsg',function(req,res){
  //1.得到请求中的from和to
  const userid = req.cookies.userid;
  // const {to} = req.body.form;
//查询一个
  ChatModel.find({from:userid},function(error,chat) {
    res.send({code: 0, data: chat});
  })

})


module.exports = router;
