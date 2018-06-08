
const getUrl = require('./getPageUrl.js')
const ajax = require('./ajax.js')
exports.checkLogin = function (option) {
  wx.setStorageSync('session_id', '32232')
  //未登录
  if (session_id == "") {
    //跳转callbackurl
    var url = getUrl.getCallbackUrl()
    wx.redirectTo({
      url: '/pages/login/index?callbackUrl=' + encodeURIComponent(url)
    })
    return
  }
  ajax.request(
    'https://developers.weixin.qq.com/miniprogram/gitbook/images/list@2x.png', {
      session_id,
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 400) {
          var url = getUrl.getCallbackUrl()
          wx.redirectTo({
            url: '/pages/login/index?callbackUrl=' + encodeURIComponent(url)
          })
        }
      }
    })
}