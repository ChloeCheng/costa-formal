// pages/share/index.js
const app = getApp()
const ajax = require('./_modules.js')
const login = require('../../modules/login.js');
const getUrl = require('../../modules/getPageUrl.js')
Page({

  data: {
    currentData: app.global[app.global['currentLanguage']],
    shareType: 1,//1,分享， 2，领积分， 3，领成， 4，领完了, 5 好友未领取 7退回的积分 8 自己的被领完了,
    infoDetail:{}
  },
  goback() {
    if (this.data.shareType == 1) {
      return
    } else if (this.data.shareType == 2) {
      var option = getUrl.getCurrentPageArgs()
      ajax.receivePoint(option.pointHash, () => {
        this.setData({
          shareType: 3,
        })
      })
      return
    }
    wx.navigateTo({
      url: '/pages/point/index'
    })
  },
  updateInfo: function () {
    login.checkLogin(() => {
      var option = getUrl.getCurrentPageArgs()
      ajax.getPoint(option.pointHash, (data) => {
        this.setData({infoDetail:data})
        if (data.myself) {
          if (option.isShared == 1 && data.status == true){
            if(data.is_back){
              this.setData({
                shareType: 7
              })
            } else {
              this.setData({
                shareType: 5
              })
            }
          } else if (option.isShared == 1 && data.status == false) {
            this.setData({
              shareType: 8
            })
          }else {
            this.setData({
              shareType: 1
            })
          }
        } else if (data.status == false) {
          this.setData({
            shareType: 4
          })
        } else if (data.status == true) {
          if(data.is_back){
            this.setData({
              shareType: 7
            })
          } else {
            this.setData({
              shareType: 2
            })
          }
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      currentData: app.global[app.global['currentLanguage']]
    })
    var option = getUrl.getCurrentPageArgs()
    ajax.getPoint(option.pointHash, (data) => {
      this.setData({ infoDetail: data })
      if (data.myself) {
        if (option.isShared == 1 && data.status == true) {
          if (data.is_back) {
            this.setData({
              shareType: 7
            })
          } else {
            this.setData({
              shareType: 5
            })
          }
        } else if (option.isShared == 1 && data.status == false) {
          this.setData({
            shareType: 8
          })
        } else {
          this.setData({
            shareType: 1
          })
        }
      } else if (data.status == false) {
        this.setData({
          shareType: 4
        })
      } else if (data.status == true) {
        if (data.is_back) {
          this.setData({
            shareType: 7
          })
        } else {
          this.setData({
            shareType: 2
          })
        }
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareUrl = "/" + getUrl.getCurrentPageUrlWithArgs() + "&isShared=1";
    return {
      title: '速度！你的壕友在撒COSTA福利！就看谁手快！',
      imageUrl: app.global.hostUrl + '/default/img/img-coupon-share.jpg',
      path: shareUrl,
      success: function (res) {
        console.log(shareUrl)
        let lau = app.global['currentLanguage'];
        // 转发成功之后的回调
        wx.showModal({
          title: (lau === 'zh' ? '提示' : 'Notice'),
          content:'分享成功',
          showCancel: false,
          confirmText:'返回',
          success:()=>{
            wx.navigateTo({
              url: '/pages/point/index',
            })
          }
        })
      },
    }
  }
})