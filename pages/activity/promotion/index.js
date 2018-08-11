// pages/activity/promotion/index.js
const app = getApp();
const URL = require('../../../modules/api-list.js');
const ajax = require('../../../modules/ajax.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    crosswiseList: [],
    currentBarDate: app.global[app.global['currentLanguage']],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'currentBarDate': app.global[app.global['currentLanguage']]
    })
    this.getBanner();
  },
  getBanner() {
    let _this = this;
    let url = `${URL.default.home.bannerAll}`;
    ajax.request(
      url,
      {},
      function (data) {
        if (data.code === 200) {
          let tmp = data.data;
          let tmpa = [], tmpb = [];
          tmp.forEach(item => {
            item.img = `${app.global.host}${item.img}`;
            if (item.banner) {
              tmpa.push(item);
            } else {
              tmpb.push(item);
            }
          });
          _this.setData({
            'bannerList': tmpa,
            'crosswiseList': tmpb
          });
        }
      }
    )
  },
  tapClick(e) {
    let url = e.currentTarget.dataset.banneritem.url;
    if (url) {
      url = getApp().global.h5HostUrl + url;  //'/pages/activity/summer/index'
      wx.navigateTo({
        url: ('/pages/special/special?url=' + encodeURIComponent(url))
      })
    }
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