// pages/login/index.js
const app = getApp()
const date = require('../../modules/dateFormat.js');
const ajax = require('./_modules.js')
const login = require('../../modules/login.js');
const getPageUrl = require('../../modules/getPageUrl.js'); //getCurrentPageArgs
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorizeUserInfo: true,
    currentData: app.global[app.global['currentLanguage']].login,
    'currentLanguage': app.global.currentLanguage,
    date: date.dateFormat(new Date('1985-01-01'), 'yyyy-MM-dd'),
    code: '',
    tel: '',
    checked: false,
    secondFlag: -1,
  },
  changeLanguage() {
    app.global.currentLanguage = (app.global.currentLanguage === 'zh' ? 'en' : 'zh');
    wx.setStorageSync('language', app.global.currentLanguage)
    this.setData({
      'currentLanguage': app.global.currentLanguage,
      currentData: app.global[app.global['currentLanguage']].login,
    });
  },
  switchCheck() {
    this.setData({
      checked: !this.data.checked
    })
  },
  bindTelInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  goAgreement(){
    wx.navigateTo({
      url: '/pages/agreement/index'
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  sendSMS() {
    if(this.data.tel==''){
      wx.showModal({
        showCancel: false,
        content: this.data.currentData.tel,
      })
      return
    } 
    if (this.data.secondFlag != -1) {
      return
    }
    ajax.sendSms(this.data.tel,
    ()=>{
      var SECOND_COUNT = 60;
      this.setData({
        secondFlag: SECOND_COUNT
      })
      var timeSecond = setInterval(() => {
        if (this.data.secondFlag == -1) {
          clearInterval(timeSecond)
          return
        }
        this.setData({
          secondFlag: (this.data.secondFlag - 1)
        })
      }, 1000)
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentData: app.global[app.global['currentLanguage']].login,
    })
  },
  gotoLogin() {
    var currentPageArgs = getPageUrl.getCurrentPageArgs()
    if (this.data.tel == "") {
      wx.showModal({
        showCancel: false,
        content: this.data.currentData.tel || '请输入手机号码',
      })
    }
    else if (this.data.code == "") {
      wx.showModal({
        showCancel: false,
        content: this.data.currentData.code || '请输入短信验证码',
      })
    } else if (!this.data.checked) {
      wx.showModal({
        showCancel: false,
        content: this.data.currentData.agree,
      })
    }else {
      ajax.register({
        'mobile': this.data.tel,
        'code': this.data.code,
        'birthday': this.data.date,
        'hash': currentPageArgs.hash || '',
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
    //login.checkLogin()
  },
  openSetting() {
    wx.openSetting({
      success: function (res) {
        if (res && res.authSetting && res.authSetting['scope.userInfo']) {

        }
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