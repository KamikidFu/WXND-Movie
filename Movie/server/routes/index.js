/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

//--- 获取Movies ---//
//GET 用来获取服务器上的Movies数据
router.get('/movies', controllers.movies.list)

//--- 获取单独Moive ---//
//GET 用来获取对应电影详情
router.get('/movies/:id', controllers.movies.detail)

//--- 获取评论列表 ---//
//GET 用来获取评论
router.get('/comment',controllers.comment.list)

//--- 获取评论详情 ---//
//GET 用来获取某个评论的详情
router.get('/comment/:id', controllers.comment.detail)

//--- 添加电影评论 ---//
//PUT 上传新的电影评论
router.put('/comment', validationMiddleware,controllers.comment.add)

//--- 用户收藏 ---//
//GET 获取用户的收藏信息
router.get('/favor',controllers.favor.list)

//---添加收藏--//
//PUT 上传收藏
router.put('/favor', validationMiddleware,controllers.favor.add)

//---用户是否评论---//
//GET 获取用户的评论信息
router.get('/me/comment', validationMiddleware,controllers.me.checkAlreadyComment)

// GET 获取我发布的评论列表
router.get('/me/published', validationMiddleware, controllers.me.myPublishedComments)

// GET 获取我收藏的评论列表
router.get('/me/favor', validationMiddleware, controllers.me.myFavorComments)

module.exports = router
