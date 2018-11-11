// pages/comment_detail/comment_detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[]
  },
  goHome() {
    wx.navigateTo({
      url: '/pages/app_home/app_home',
    })
  },
  getComment(id) {
    wx.showLoading({
      title: '获取电影详情中...',
    })

    qcloud.request({
      url: config.service.commentList + id,
      success: result => {
        let data = result.data
        console.log(data)
        if (data.data!=null) {
          this.setData({
            commentList: data.data
          })
        } else {
          wx.showToast({
            title: '获取影评详情失败！',
            icon: 'none'
          })
          this.addPlaceholder()
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取影评详情失败！',
          icon: 'none'
        })
        this.addPlaceholder()
      }
    })
    wx.hideLoading()
  },
  addPlaceholder(){
    let placeholder = [{
      userName: 'USER',
      userAvater: '/images/user.png',
      content: 'No comment yet'
    }, {
      userName: 'USER2',
      userAvater: '/images/user.png',
      content: 'No comment yet!'
    }]
    this.setData({
      commentList: placeholder
    })
  },
  onTapComment(event){   
    const commentId = event.currentTarget.dataset.comment.id;
    const movieId = event.currentTarget.dataset.comment.movie_id;
    wx.navigateTo({
      url: '/pages/comment_detail/comment_detail?commentId=' + commentId + '&movieId=' + movieId,
    });
  },
  goToPlay(event){
    var filePath = event.currentTarget.voice;
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getComment(options.movieId)
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