const app = getApp()

exports.getSession = function(){
  var value = wx.getStorageSync('session_id')
  return value;
}

exports.setSession = function (session_id) {
  var value = wx.setStorageSync('session_id', session_id)
  return value;
}
