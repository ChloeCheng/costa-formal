const app = getApp();
const login = require('../../modules/login.js');
const URL = require('../../modules/api-list.js');
const ajax = require('../../modules/ajax.js');
const QRCode = require('../../common/qrcode.js');
const userInfo ={};// wx.getStorageSync('userInfo')
const bannerList = wx.getStorageSync('bannerList') || [{ "summary": "开业当天任意消费，即送新年贺卡期待您的光临", "img": "https://miniprogramapi.costa.net.cn//default/upload/banner-1.jpg", "banner": true, "title": "上海大宁国际广场店开业啦～", "content": "", "url": "", "released": 1525917600000 }];
Page({
  data: {
    bannerList: bannerList,
    authorizeUserInfo: false,
    userInfo: userInfo,
    currentLanguage: app.global.currentLanguage || 'zh',
    showCode: false,
    showPhone: false,
    currentData: app.global[app.global['currentLanguage']].home,
    currentBarDate: app.global[app.global['currentLanguage']],
    showData:{},
    hideDialog: false,
    isShowLevelDialog:false,
    isShowUpgradeDialog: false,
  },
  onLoad: function (options) {
    let _this = this;
    wx.getUserInfo({
      success: function(res) {
          getApp().global.wxUserInfo = res.userInfo;
          wx.setStorageSync('userInfo', res.userInfo)
          _this.setData({
            'userInfo': res.userInfo,
            hideDialog: true
          });
      }
    })
    _this.initPage();
    _this.getBanner();

     /*分享之后进入下一个页面*/
     let query = options;
     if(query && query.$route){
       const route = decodeURIComponent(query.$route);
       wx.navigateTo({
         url: route
       });
     }

  },
  toggleLevelDialog(){
    this.setData({ isShowLevelDialog: !this.data.isShowLevelDialog})
  },
  toggleUpgradeDialog() {
    this.setData({ isShowUpgradeDialog: !this.data.isShowUpgradeDialog })
    wx.setStorageSync('isShowUpgradeDialog', false) 
  },
  initPage(noInit){
    let _this = this;
    let url = `${URL.default.home.userInfo}`;
    // let indexUrl = '/wechat-mp/customer/get-index?language=cn'
    // ajax.request(indexUrl)
    ajax.request(
      url,
      {},
      function(data){
        if(data.code === 200) {
          let tmp = data.data, pointValue = tmp.max - tmp.total;
          // tmp.cups = 6;
          // tmp.next_id =0;          
          //let pointHint = tmp.hint.replace(/<[^>]+>/g, '').replace('POINTS', pointValue)
          tmp.pointValue = pointValue || 0;
          //tmp.vipcodeBase64 = '../../assets/qrcode.png1'
          if(!noInit){
            var qrcode = new QRCode('canvas', {
              text: '12' + tmp.vipcode,
              width: 130,
              height: 130,
              colorDark: "#9e0028",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.H,
            });
          }
          //next_id 2:红卡， 3:银卡， 0:金卡
          //tmp.next_id=3; 
          //tmp.cups = 5
          tmp.isShowUpgradeDialog = tmp.remind_first;// || true;
          _this.setData({
            'showData': tmp,
            showCode: false,
            isShowUpgradeDialog: tmp.isShowUpgradeDialog
          });
          wx.setStorageSync('bannerList', tmp)
        }
      }
     )
  
  },
  getBanner(){
    let _this = this;
    let url = `${URL.default.home.bannerList}`;
    ajax.request(
      url,
      {},
      function(data){
        if(data.code === 200) {
          let tmp = data.data;
          tmp.forEach(item=>{
            item.img = `${app.global.host}${item.img}`;
          });
          console.log(tmp)
          _this.setData({
            'bannerList': tmp
          });
        }
      }
     )
  },
  updateInfo: function (){
    this.setData({
      'userInfo': app.global.wxUserInfo
    });
    login.checkLogin()
  },
  changeLanguage(){
    app.global.currentLanguage = (app.global.currentLanguage === 'zh' ? 'en' : 'zh');
    wx.setStorageSync('language', app.global.currentLanguage)
    this.setData({
      'currentLanguage': app.global.currentLanguage,
      'currentData': app.global[app.global['currentLanguage']].home,
      'currentBarDate': app.global[app.global['currentLanguage']]
    });
    this.initPage(true);
  },
  codeOperater(e){
    if(e.target.dataset.target!='hide'){
      return
    }
    let code = this.data.showCode;
    this.setData({
      'showCode': !code
    });
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: '400-060-1971'
    })
  },
  showPhone(){
    let code = this.data.showPhone;
    this.setData({
      'showPhone': !code
    });
  },
  gotoPage: function(e){
    let url = e.currentTarget.dataset.detail;
    if(url){
      wx.navigateTo({
        url: url,
      })
    }   
  },
  gotoEdit() {
    let url = '/pages/userInfo/index';
    if(url) {
      wx.navigateTo({
        url: url,
      })
    }
  },
  gotoPoint() {
    let url = '/pages/point/index';
    if (url) {
      wx.navigateTo({
        url: url,
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    login.checkLogin();
    this.initPage(true);
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
  onShareAppMessage: function (options) {
    return {
      title: '欢迎加入Costa会员',
      imageUrl: app.global.hostUrl + '/default/img/img-coupon-share.jpg',
      path: '/pages/index/index'
    }
  }
})
