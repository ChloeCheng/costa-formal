const dateFormat = require('./dateFormat.js')
const app = getApp()

function checkSession(url) {
  if (url.indexOf('/wechat-mp/oauth') > -1) {
    return true
  }
  var JSESSIONID_EXPIRED = wx.getStorageSync('JSESSIONID_EXPIRED') 
  var is_expired = dateFormat.checkBeyondTime(JSESSIONID_EXPIRED, new Date())
  return JSESSIONID_EXPIRED && JSESSIONID_EXPIRED && !is_expired
}
exports.checkExpired = function (url,callback) {
  var _url = url
  if (checkSession(_url)) {
    callback()
  } else {
    var flag = setInterval(() => {
      //console.log(url)
      if (checkSession(_url)) {
        clearInterval(flag)
        callback()
      }
    }, 100)
  }
}