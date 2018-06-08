const ajax = require('../../modules/ajax.js')

exports.getPoint = function (hash, callback) {
  ajax.request(
    '/wechat-mp/point/get/' + hash,
    {},
    function (json) {
      if (json.code == 200) {
        //json.data.status = false //未领取true,
        //json.data.myself = true
        callback && callback(json.data)
      }
    }
  )
}

exports.receivePoint = function (hash, callback) {
  ajax.request(
    '/wechat-mp/point/receive-share/' + hash,
    {},
    function (json) {
      if (json.code == 200) {
        callback && callback()
      }else{
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