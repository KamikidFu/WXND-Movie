// pages/hot_movie/hot_movie.js 
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotFilmList:[]
  },
  getFavorList() {
    wx.showLoading({
      title: '获取详情中...',
    })
    qcloud.request({
      url: config.service.movieList,
      success: result => {
        let data = result.data
        console.log(data)
        if (data.data!=null) {
          this.setData({
            hotFilmList: data.data
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
      description: "A new movie named The Placeholder somewhat no one cares."
    }
    let list = []
    list.push(placeholder)
    this.setData({
      hotFilmList: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFavorList();
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