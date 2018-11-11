const DB = require('../utils/db.js')  

module.exports = {

  detail: async ctx => {
    let id = + ctx.params.id
    let detail

    if (id) {
      detail = (await DB.query("SELECT * FROM comment WHERE id= ?", [id]))[0]
    } else {
      detail = {}
    }
    ctx.state.data = detail
  },

  list: async ctx =>{
    let movieId = + ctx.request.query.movieId
    let comments=[]

    if(!isNaN(movieId)){
        comments = await DB.query("SELECT * FROM comment WHERE movie_id = ?",[movieId])
    }else{
      comments= await DB.query("SELECT * FROM comment")
    }
    ctx.state.data=comments
  },

  add: async ctx => {
    let movieId = + ctx.request.body.movieId;
    let comment_type = + ctx.request.body.commentType;
    let user = ctx.state.$wxInfo.userinfo.openId;
    let username = ctx.state.$wxInfo.userinfo.nickName;
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl;
    let content = ctx.request.body.content ||null;
    let voice = ctx.request.body.voice || null;

    if(!isNaN(movieId)){
      await DB.query('INSERT INTO comment (movie_id, comment_type,user,username,avatar,content, voice) VALUES (?, ?, ?, ?, ?, ?, ?)',[movieId, comment_type,user,username,avatar,content, voice]);
    }

    ctx.state.data={}
  }
}