// pages/points/index.js
const app = getApp()
const URL = require('../../modules/api-list.js');
const ajax = require('../../modules/ajax.js');
const formatTime = require('../../common/formatTime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentLanguage: app.global['currentLanguage'],
    currentData: app.global[app.global['currentLanguage']].cardShare,
    currentDataTotal: app.global[app.global['currentLanguage']],
    activeSpread: false,
    disableSpread: false,
    notExpired: [],
    expired: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.setData({ 
      currentLanguage: app.global['currentLanguage'],
      currentData: app.global[app.global['currentLanguage']].card,
      'currentDataTotal': app.global[app.global['currentLanguage']] 
    })
   this.initPage();
  },
  initPage(){
    let _this = this;
    let url = `${URL.default.card.list}`;
    ajax.request(
      url,
      {},
      function(data){
        if(data.code === 200) {
          let tmp = data.data;
          const {notExpired,expired} = _this.splitItemData(tmp);
          _this.setData({
            'notExpired': notExpired,
            'expired': expired
          });
        }
      }
     )
  },
  /**
   * 拆分已过期、未过期数据
   * @param list
   */
   splitItemData(list){
    // return {notExpired: [], expired: list};
    let notExpired = [], expired = [], ts = Date.now();
    list.forEach(item=>{
        item.time = formatTime.formatTime(new Date(item.expired_time));
        if(item.expired_time>ts){
            if(item.status === 1){
              notExpired.push(item);
            } else {
              expired.push(item);
            }
            
        } else {
            expired.push(item);
        }
    });
    return {
        notExpired,
        expired
    };
  },
  activeSpreadTap(){
    let value = this.data.activeSpread;
    this.setData({
      'activeSpread': !value
    });
  },
  disableSpreadTap(){
    let value = this.data.disableSpread;
    this.setData({
      'disableSpread': !value
    });
  },
  gotoDetail(event){
    const {currentTarget:{dataset:{item}}} = event 
    wx.navigateTo({
      url: '/pages/shareCard/index?id=' + item.id
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    // console.log(this.data.currentData)
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
    // console.log('2222')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})