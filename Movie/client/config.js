var host = 'https://kuovftlj.qcloud.la';

var config = {
  service:{
    host,
    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,
    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,
    //获取用户 
    user: `${host}/weapp/user`,
    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,
    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,
    //获取所有movies列表
    movieList: `${host}/weapp/movies`, 
    //获取电影详情
    movieDetail: `${host}/weapp/movies/`,
    //获取评论列表
    commentList:`${host}/weapp/comment?movieId=`,
    //获取评论详情
    commentDetail:`${host}/weapp/comment/`,
    //上传新评论
    addComment:`${host}/weapp/comment`, 
    //获取评论
    favor: `${host}/weapp/favor`,
    //获取收藏
    favoriteList:`${host}/weapp/favor?movieId=`,
    //获取用户收藏的评论
    userFavor: `${host}/weapp/me/favor`,
    //获取用户发布的评论
    userPublished:`${host}/weapp/me/published`,
    //获取用户是否评论
    userAlreadyComment:`${host}/weapp/me/comment`
  }
};

module.exports = config;