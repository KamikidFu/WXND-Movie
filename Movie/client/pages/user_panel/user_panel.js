// pages/user_panel/user_panel.js


const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    shownTab:'published',
    favorCommentsList:[],
    publishCommentList: [], 
    locationAuthType: app.data.locationAuthType
    },
  
  onTapLogin: function () {
    app.login({
      success: ({userInfo})=>{
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error:()=>{
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },

  onTapTab(event){
    let tab = event.currentTarget.dataset.tab;
    this.setData({
      shownTab: tab
    })
    if (tab === 'published'){
      this.getPublishedComment()
    }else{
      this.getFavorComment()
    }
  },
  goToPlay: function (event) {
    var filePath = event.currentTarget.dataset.key;
    console.log(filePath)
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

  getPublishedComment() {
    wx.showLoading({
      title: '获取详情中...',
    })
    qcloud.request({
      url: config.service.userPublished,
      success: result => {
        let data = result.data
        console.log(data)
        if (data.data != null) {
          this.setData({
            publishCommentList: data.data
          })
        } else {
          wx.showToast({
            title: '获取详情失败！',
            icon: 'none'
          })
          this.addPlaceholder()
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取详情失败！',
          icon: 'none'
        })
        this.addPlaceholder()
      }
    })
    wx.hideLoading()},
  goHome() {
    wx.navigateBack({
      delta: 1
    })
  }, 

  getFavorComment() {
    wx.showLoading({
      title: '获取详情中...',
    })
    qcloud.request({
      url: config.service.userFavor,
      success: result => {
        let data = result.data
        console.log(data)
        if (data.data!=null) {
          this.setData({
            favorCommentsList: data.data
          })
        } else {
          wx.showToast({
            title: '获取详情失败！',
            icon: 'none'
          })
          this.addPlaceholder()
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取详情失败！',
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
      description: "A new movie named The Placeholder somewhat no one cares.",
      comment:'No comment yet',
      user:'USER'
    }
    let list = []
    list.push(placeholder)
    this.setData({
      favorCommentsList: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('check login')
    console.log(this.data.userInfo)
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
    this.getPublishedComment()
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