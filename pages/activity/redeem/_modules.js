const ajax = require('../../../modules/ajax.js')

exports.getList = function (callback) {
  ajax.request(
    '/wechat-mp/exchange/get-all',
    {},
    function (json) {
      if (json.code == 200) {
        callback && callback(json.data)
      }
    }
  )
}