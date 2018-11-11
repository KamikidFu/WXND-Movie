// pages/app_home/app_home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList()
  },

  getMovieList(){
    wx.showLoading({
      title: '获取电影数据...',
    })

    qcloud.request({
      url: config.service.movieList,
      success: result=>{
        let data = result.data
        console.log(data.data)
        if (data.data!=null) {
          console.log('Data ready!')
          this.setData({
            movieList: data.data            
          })
        } else {
          console.log('Data not ready!')
          wx.showToast({
            icon: 'none',
            title: '获取电影数据失败！',
          })
          this.addPlaceholder()
        }
        wx.hideLoading()
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '获取电影数据失败！',
        })
        this.addPlaceholder()
        wx.hideLoading()
      }
    })
  },

  addPlaceholder(){
    let placeholder = {
      image: "../../images/placeholder.jpg",
      title: "Placeholder",
      id: -1,
      description: "A new movie named The Placeholder somewhat no one cares."
    }
    let placeholderList = []
    placeholderList.push(placeholder)
    this.setData({
      movieList: placeholderList
    })
  }
})