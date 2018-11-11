const DB = require('../utils/db')

module.exports = {
  myPublishedComments: async ctx =>{
    let user = ctx.state.$wxInfo.userinfo.openId;
    let comments = await DB.query('SELECT movie_id AS movieId, comment_type AS commentType, comment.user AS user, comment.username AS username, comment.avatar, content, voice, title, image, category, description FROM comment,  movies WHERE comment.movie_id = movies.id AND comment.user=?',[user])

    ctx.state.data=comments
  },

  myFavorComments: async ctx =>{
    let user = ctx.state.$wxInfo.userinfo.openId;
    let comments = await DB.query('SELECT movie_id AS movieId, comment_type AS commentType, comment.user AS user, comment.username AS username, comment.avatar, content, voice, title, image, category, description FROM comment, favor, movies WHERE comment.id=favor.commentId AND comment.movie_id = movies.id AND favor.user=?', [user])

    ctx.state.data = comments
  },

  checkAlreadyComment: async ctx => {
    let movieId = + ctx.request.query.movieId
    let user =  ctx.state.$wxInfo.userinfo.openId;
    let comment = []
    comment = await DB.query(`SELECT * FROM comment WHERE movie_id=? AND user=?`, [movieId, user]);
    ctx.state.data = comment
  }
}