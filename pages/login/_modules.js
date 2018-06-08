const ajax = require('../../modules/ajax.js')
const getUrl = require('../../modules/getPageUrl.js')
const app = getApp()
exports.register = function (option, callback) {
  option.method = 'POST'
  ajax.request(
    '/wechat-mp/customer/register-submit',
    option,
    function (json) {
      //json.code = 200
      if (json.code == 200) {
        wx.setStorageSync('is_registered', 'true')
        wx.showModal({
          showCancel: false,
          content: app.global[app.global['currentLanguage']].login.success,
          success: function (res) {
            var url = wx.getStorageSync('callbackUrl')
            if (url == "" || url.indexOf('pages/login/index')>-1){
              url = 'pages/index/index'
            } 
            console.log(url)
            wx.reLaunch({
              url: '/' + url,
            })
          }
        })
      } else  {
        wx.showModal({
          showCancel: false,
          content: json.message,
          success: function (res) {
          }
        })
      }
    }
  )
}

exports.sendSms = function (num, success,failed) {
  ajax.request(
    '/wechat-mp/customer/register-get-code/' + num,
    {},
    function (json) {
      if(json.code != 200){
        wx.showModal({
          showCancel: false,
          content: json.message,
          success: function (res) {
           }
        })
        failed && failed()
      }else{
        success && success()
      }
    }
  )
}