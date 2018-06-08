// pages/points/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: app.global[app.global['currentLanguage']].member,
    currentDataTotal: app.global[app.global['currentLanguage']],
    currentLanguage: app.global['currentLanguage']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      'currentLanguage': app.global['currentLanguage'],
      'currentDataTotal': app.global[app.global['currentLanguage']],
      'currentData': app.global[app.global['currentLanguage']].member
    })
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