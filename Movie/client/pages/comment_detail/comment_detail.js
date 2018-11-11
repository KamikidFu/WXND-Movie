// pages/comment_detail/comment_detail.js


const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
   movie:{},
   comment:{},
   userInfo: null
  },
  checkAlreadyComment(event){
    if(this.data.userInfo!=null && this.data.movie!=null){
      let id = this.data.movie.id
      qcloud.request({
        url: config.service.userAlreadyComment,
        data:{
          movieId:id
        },
        success: result => {
          console.log('Data ready!')
          let data = result.data.data
          console.log(data)
          if (data.length!=0) {
            wx.showToast({
              title: '你已经评论过啦！~',
            })
          } else {
            console.log('Allow to comment')
            this.addCommentTap(event)
          }
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }
  },
  checkUserState(){
    let that = this
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function(res) {
        console.log(res.userInfo)
        that.setData({
          userInfo: res.userInfo
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '尚未登录',
          icon:'none'
        })
        wx.navigateTo({
          url: '/pages/user_panel/user_panel',
        })
      },
      complete: function(res) {},
    })
  },
  addCommentTap: function (event) {
        wx.showActionSheet({
          itemList: ['文字', '语音'],
          success: function (res) {
            if (!res.cancel) {
              let id = event.currentTarget.dataset.id
              console.log(res.tapIndex)
              wx.navigateTo({
                url: `/pages/add_comment/add_comment?id=${id}&type=${res.tapIndex}`,
              })
            }
          }
        })
  },
  favorite: function (event){
    let id = event.currentTarget.dataset.id
    qcloud.request({
      url: config.service.favor,
      isLogin: true,
      method: 'PUT',
      data: {
        commentId:id
      },
      success: res => {
        console.log(res)
        let data = res.data
        if (!data.code) {
          wx.showToast({
            title: '收藏评论成功'
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '收藏评论失败'
          })
        }
      },
      fail: (res) => {
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: '收藏失败',
        })
      }
    })
  },
  addPlaceholder() {
    let placeholder = {
      image: "../../images/placeholder.jpg",
      title: "Placeholder",
      id: -1,
      description: "A new movie named The Placeholder somewhat no one cares.",
      comment: 'No comment yet',
      user: 'USER'
    }
    this.setData({
      movie: placeholder
    })
  },
  getMovie(id) {
    wx.showLoading({
      title: '获取电影详情中...',
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        let data = result.data
        console.log(data)
        if (data.data != null) {
          console.log('Data ready!')
          this.setData({
            movie: data.data
          })
        } else {
          console.log('Data not ready!')
          wx.showToast({
            title: '获取电影详情失败！',
            icon: 'none'
          })
          this.addPlaceholder()
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取电影详情失败！',
          icon: 'none'
        })
        this.addPlaceholder()
      }
    })
    wx.hideLoading()
  },
  getCommentDetail(commentId){
    qcloud.request({
      url: config.service.commentDetail + commentId,
      success: result => {
        let data = result.data
        console.log(data)
        if (data.data != null) {
          console.log('Data ready!')
          this.setData({
            comment: data.data
          })
        } else {
          console.log('Data not ready!')
          wx.showToast({
            title: '获取评论详情失败！',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取评论详情失败！',
          icon: 'none'
        })
      }
    })
  },
  getComments(movieId) {
    qcloud.request({
      url: config.service.commentList + movieId,
      success: result => {
        let data = result.data
        console.log(data)
        if (data.data != null) {
          console.log('Data ready!')
          this.setData({
            comment: data.data[0]
          })
        } else {
          console.log('Data not ready!')
          wx.showToast({
            title: '获取评论详情失败！',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取评论详情失败！',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.commentId==null){
      this.getMovie(options.movieId);
      this.getComments(options.movieId);
    } else {
      this.getMovie(options.movieId);
      this.getCommentDetail(options.commentId);
    }    
    this.checkUserState()
    this.checkAlreadyComment()
  },

  goToPlay(event) {
    var filePath = event.currentTarget.dataset.key;
    console.log(filePath)
    wx.playVoice({
      filePath: filePath,
      success: function () {
        wx.showToast({
          title: '播放结束',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.checkSession({
      success: (userInfo) => {
        console.log(userInfo)
        this.setData({
          userInfo
        })
      },
      error: (err) => {
        console.log(err)
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})