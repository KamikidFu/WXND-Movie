// pages/add_comment/add_comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    comment:'',
    voice:'',
    isSpeaking:false,
    commentType:0
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

  inputEvent(event) {
    this.setData({
      comment: event.detail.value.trim()
    })
  }, 
  //关于录音的API: https://developers.weixin.qq.com/miniprogram/dev/api/media-record.html
  startRecording: function () {
    console.log('Recording')
    var _this = this;
    this.setData({
      isSpeaking: true
    })
    wx.startRecord({
      success: function (res) {
        console.log('start recording')
        var tempFilePath = res.tempFilePath
        console.log('tempFilePath: '+tempFilePath)
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath
            console.log("savedFilePath: " + savedFilePath)
            _this.setData({
              voice: savedFilePath
            })
          }
        })
        wx.showToast({
          title: '已保存录音',
          icon: 'success',
          duration: 1000
        })
      },
      fail: function (res) {
        console.log('wrong recording')
        wx.showToast({
          content: '录音失败！',
          icon: 'fail'
        })
      }
    })
  },

  stopRecording: function () {
    console.log('stopping')
    this.setData({
      isSpeaking: false,
    })
    wx.stopRecord()
  },

  goToPreviewPage() {
    if (!this.data.comment && !this.data.voice) {
      wx.showToast({
        icon: 'none',
        title: '请填写文字评论或进行语音评论',
      })
    } else {
      wx.navigateTo({
        url: `/pages/comment_preview/comment_preview?id=${this.data.movie.id}&comment=${this.data.comment}&voice=${this.data.voice}&type=${this.data.commentType}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(options.id)
    this.setData({
      commentType: options.type
    })
    console.log(this.data.commentType)
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
