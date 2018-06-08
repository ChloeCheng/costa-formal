// pages/share/index.js
const app = getApp()
const login = require('../../modules/login.js');
const URL = require('../../modules/api-list.js');
const ajax = require('../../modules/ajax.js');
const formatTime = require('../../common/formatTime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: app.global[app.global['currentLanguage']].cardShare,
    currentDataTotal: app.global[app.global['currentLanguage']],
    shareType: 1, //1,分享， 2，领积分， 3，领成， 4，领完了, 5自己的 6不能分享 7过期没领取
    detail: {},
    shareCode: '',
    noShareExplain: false,
    cardId:''
  },
  gobackPath(){
    wx.navigateTo({
      url: '/pages/card/index'
    })
  },
  updateInfo: function () {
    login.checkLogin()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx.hideShareMenu();
     this.setData({ 
      currentData: app.global[app.global['currentLanguage']].cardShare,
      currentDataTotal: app.global[app.global['currentLanguage']]
    })
     if(options.id){
      this.initData(options.id);
      this.setData({
        'noShareExplain': true,
        'cardId': options.id
      });
      return;
     }
     if(options.hash){
      this.initShareDetail(options.hash);
      this.setData({
        'shareCode': options.hash
      });
      return;
     }
     
  },
  initShareDetail(hash){
    let _this = this;
    let url = `${URL.default.card.shareDatail}${hash}`;
    ajax.request(
      url,
      {},
      function(data){
        if(data.code === 200) {
          let tmp = data.data;
          tmp.time = formatTime.formatTime(new Date(tmp.expired_time));
          tmp.content = (tmp.content=== null) ? [] : tmp.content;
          if(tmp.myself){
            _this.setData({
              'shareType': 5
            });
          } else if(tmp.status){
            _this.setData({
              'shareType': 2
            });
          } else if (tmp.is_back){
            _this.setData({
              'shareType': 7
            });
          }else {
            _this.setData({
              'shareType': 4
            });
          }
          _this.setData({
            'detail': data.data
          });
        }
      }
    );
  },
  initData(id){
      let _this = this;
      let url = `${URL.default.card.detail}${id}`;
      ajax.request(
        url,
        {},
        function(data){
          if(data.code === 200) {
            let tmp = data.data;
            tmp.time = formatTime.formatTime(new Date(tmp.expired_time));
            tmp.content = (tmp.content=== null) ? [] : tmp.content;
            _this.setData({
              'detail': data.data
            });
            if(data.data.can_share === 0){
              _this.setData({
                'shareType': 6
              })
            }
          }
        }
      );

    },
    getCard(){
      let _this = this;
      let hash = this.data.shareCode;
      let url = `${URL.default.card.getShare}${hash}`;
      ajax.request(
        url,
        {},
        function(data){
          if(data.code === 200) {
            let lau = app.global['currentLanguage'];
            wx.showModal({
              title: (lau === 'zh' ? '提示' : 'Notice'),
              content: '领取成功',
              showCancel: false,
              confirmText:(lau === 'zh' ? '确认' : 'Confirm'),
              success:()=>{
                _this.setData({
                  'shareType': 3
                })
              }
            })
          }
        }
      )
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
    login.checkLogin()
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
   * 获取分享码
   */
  getShareCode(){
    let shareCodeUrl = `${URL.default.card.share}${this.data.cardId}`;
    ajax.request(
      shareCodeUrl,
      {},
      function(data){
        if(data.code === 200) {
         /* _this.setData({
            'shareCode': data.data.hash
          });*/

          // callBcak && callBcak(data.data.hash)
        } else if(data.code === 501) {
         
        }
      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let _this = this;
    // console.log(_this.data.shareCode ? '/pages/shareCard/index?hash=' + _this.data.shareCode : '/pages/index/index')
    _this.getShareCode();
    return {
      title: '一张' + _this.data.detail.name + '已送出！就看谁手快！',
      imageUrl: app.global.hostUrl + '/default/img/img-coupon-share.jpg',
      path: '/pages/shareCard/index?hash=' + _this.data.detail.hash,
      success: function (res) {
       let lau = app.global['currentLanguage'];
        // 转发成功之后的回调
        wx.showModal({
          title: (lau === 'zh' ? '提示' : 'Notice'),
          content: '分享成功',
          showCancel: false,
          confirmText:(lau === 'zh' ? '确认' : 'Confirm'),
          success:()=>{
            wx.navigateTo({
              url: '/pages/card/index',
            })
          }
        })
      }
    }
    
  }
})