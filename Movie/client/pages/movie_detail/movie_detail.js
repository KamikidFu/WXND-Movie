// pages/movie_detail/movie_detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    user:{},
    alreadyComment:null
  },
  checkAlreadyComment(event) {
    console.log(event)
    if (this.data.userInfo != null && this.data.movie != null) {
      let id = this.data.movie.id
      qcloud.request({
        url: config.service.userAlreadyComment,
        data: {
          movieId: id
        },
        success: result => {
          console.log('Data ready!')
          let data = result.data.data
          console.log(data)
          if (data.length != 0) {
            wx.showToast({
              title: '你已经评论过啦！~',
            })
          } else {
            console.log('Allow to comment')
            console.log(event)
            this.addCommentTap(event)
          }
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }
  },
  checkUserState() {
    let that = this
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function (res) {
        console.log(res.userInfo)
        that.setData({
          userInfo: res.userInfo
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '尚未登录',
          icon: 'none'
        })
        wx.navigateTo({
          url: '/pages/user_panel/user_panel',
        })
      },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(options.id)
    this.checkUserState()
    this.checkAlreadyComment()
  },
  onShow: function (options) {
    this.checkAlreadyComment()
  },
  
  getMovie(id){
    wx.showLoading({
      title: '获取电影详情中...',
    })
    qcloud.request({
      url: config.service.movieDetail+id,
      success:result=>{
        let data = result.data
        console.log(data)
        if (data.data != null) {
          console.log('Data ready!')
          this.setData({
            movie:data.data
          })
        } else {
          console.log('Data not ready!')
          wx.showToast({
            title: '获取电影详情失败！',
            icon:'none'
          })
          this.addPlaceholder()
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取电影详情失败！',
          icon:'none'
        })
        this.addPlaceholder()
      }
    })
    wx.hideLoading()
  },

  addPlaceholder(){
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
  }
})