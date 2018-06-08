// pages/agreement/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: app.global[app.global['currentLanguage']].agreement,
    'currentLanguage': app.global.currentLanguage,
  },
  changeLanguage() {
    app.global.currentLanguage = (app.global.currentLanguage === 'zh' ? 'en' : 'zh');
    this.setData({
      'currentLanguage': app.global.currentLanguage,
      currentData: app.global[app.global['currentLanguage']].agreement,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //debugger
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
  goback(){
    wx.navigateBack({
      
    })
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