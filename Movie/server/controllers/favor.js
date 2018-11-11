const DB = require('../utils/db.js')

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM favor;")
  },

  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId;
    let username = ctx.state.$wxInfo.userinfo.nickName;
    let commentId = + ctx.request.body.commentId;

    if (!isNaN(commentId)) {
      await DB.query('INSERT INTO favor (commentId, user,username) VALUES (?, ?, ?)', [commentId,user,username]);
    }

    ctx.state.data = {}
  }
}