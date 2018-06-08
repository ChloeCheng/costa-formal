// pages/activity/redeem/index.js
const app = getApp()
const ajax = require('./_modules.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: app.global[app.global['currentLanguage']],
    hostUrl: app.global.hostUrl,
    images: {
      logo: '../../assets/point/vip-logo.png',
      bg: '../../assets/point/bg.png',
      current: '../../assets/point/current.png',
      upgrade: '../../assets/point/upgrade.png',
      expire: '../../assets/point/expire.png',
      dui: '../../assets/point/dui.png',
      'new': '../../assets/point/new.png',
      'share': '../../assets/point/share.png',
      'up': '../../assets/point/up.png',
      'down': '../../assets/point/down.png',
    },
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.getList((data)=>{
      this.setData({
        list:data
      })
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