// pages/movie_preview/movie_preview.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    comment:'',
    voice:'',
    commentType:0,
    userInfo:null
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
        if (data.data!=null) {
          this.setData({
            movie: data.data
          })
        } else {
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

  addPlaceholder() {
    let placeholder = {
      image: "../../images/placeholder.jpg",
      title: "Placeholder",
      id: -1,
      description: "A new movie named The Placeholder somewhat no one cares."
    }
    this.setData({
      movie: placeholder
    })
  },
  goToPlay: function () {
    console.log(this.data.voice)
    var filePath = this.data.voice;
    //点击开始播放  
    wx.showToast({
      title: '播放录音',
      icon: 'success',
      duration: 1000
    })
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

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  publishComment() {
    let id = this.data.movie.id
    let content = this.data.comment
    let commentType = this.data.commentType
    let voice = this.data.voice
    console.log(id+content+commentType+voice)
    //推送评论到服务器
    qcloud.request({
      url: config.service.addComment,
      isLogin:true,
      method:'PUT',
      data:{
        movieId:this.data.movie.id,
        content:this.data.comment,
        commentType:this.data.commentType,
        voice: this.data.voice
      },
      success: res => {
        console.log(res)
        let data = res.data
        if (!data.code) {
          wx.showToast({
            title: '发表评论成功'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/comment_list/comment_list?movieId=' + this.data.movie.id,
            })
          }, 1500)
        } else {
          wx.showToast({
            icon: 'none',
            title: '发表评论失败'
          })
        }
      },
      fail: (res) => {
        console.log(res)
        wx.showToast({
          icon:'none',
          title: '发布失败',
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(options.id)
    this.setData({
      comment: options.comment,
      voice: options.voice,
      commentType: options.type
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