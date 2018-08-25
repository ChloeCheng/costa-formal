// pages/points/index.js
const app = getApp()
const ajax = require('./_modules.js')
const dateFormat = require('../../modules/dateFormat.js')
var moveFlage = true
var startPosition = 0
var movePosition = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: app.global[app.global['currentLanguage']].points,
    currentDataTotal: app.global[app.global['currentLanguage']],
    images: {
      logo: '../../assets/point/vip-logo.png',
      red:'../../assets/point/red.png',
      silver:'../../assets/point/silver.png',
      gold:'../../assets/point/gold.png',
      costa:'../../assets/costa.png',
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
    points: {
      level:'',
      will_expired_total:0,
      total: 0,
      usable_total:0,
    },
    list: [],
    animateScroll: '',
    shareValue:0,
  },
  inputChange(e){
    this.setData({
      shareValue: e.detail.value
    })
  },
  goRecord: function (e) {
    wx.navigateTo({
      url: '/pages/record/index'
    })
  },
  gotoShare: function (e) {
    if(this.data.shareValue>0){
      ajax.setPoint(this.data.shareValue,(data) => {
        console.log('/pages/share/index?pointHash=' + encodeURIComponent(data))
        wx.navigateTo({
          url: '/pages/share/index?pointHash=' + encodeURIComponent(data)
        })
      })
    }else{
      wx.showModal({
        showCancel:false,
        content: this.data.currentData.placeholder,
      })
    }
  },
  gotoPromotion() {
    let url = '/pages/activity/promotion/index';
    if (url) {
      wx.navigateTo({
        url: url,
      })
    }
  },
  goRedeem: function (e) {
    wx.navigateTo({
      //url: '/pages/activity/redeem/index'
      url: ('/pages/special/special?url=' + encodeURIComponent('https://h5.costa.net.cn/wechat/point-exchange-coupon?scheme=https'))
    })
  },
  changeLanguage() {
    app.global.currentLanguage = (app.global.currentLanguage === 'zh' ? 'en' : 'zh');
  },
  methods: {

  },
  touchstart(e) {
    console.log('start:' + e.touches[0].clientY)
    startPosition = e.touches[0].clientY
  },
  touchmove(e) {
    if (moveFlage) {
      var currentY = e.touches[0].clientY
      //下滑
      if (currentY - startPosition > 10) {
        console.log(e.touches[0].clientY)
        moveFlage = false
        this.setData({
          animateScroll: 'animateScrollBottom',
        })
        setTimeout(function () {
          moveFlage = true
        }, 1000)
        
        
        var list = this.data.list;
        setTimeout(() => {
          this.setData({
            list: [],
          })
        }, 1000)
        setTimeout(() => {
          this.setData({
            list: list,
          })
        }, 1100)
      }
      // 上滑
      else if (startPosition - currentY > 10) {
        console.log(e.touches[0].clientY)
        moveFlage = false
        this.setData({
          animateScroll: 'animateScrollTop',
        })
        setTimeout( ()=> {
          moveFlage = true
        }, 1000)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.setData({ 
      currentData: app.global[app.global['currentLanguage']].points,
      'currentDataTotal': app.global[app.global['currentLanguage']]
   })
    ajax.getPoint((data) => {
      this.setData({  points: data  })
    })
    ajax.getRecord((data) => {
      var n = data.map((item)=>{
        item.create_time = dateFormat.dateFormat(item.create_time,'yyyy-MM-dd')
        return item
      })
      this.setData({  list: n })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.currentData)
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