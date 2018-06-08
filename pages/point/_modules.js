const ajax = require('../../modules/ajax.js')

exports.getPoint = function (callback) {
  ajax.request(
    '/wechat-mp/point/get-point',
    {},
    function (json) {
      // json = {
      //   code: 200,
      //   data:{
      //     current: 500,
      //     expire: 50,
      //     next_level: 800,
      //     next_level_progress: 100,
      //     total: 100,
      //   }
      // }
      if (json.code == 200) {
        callback && callback(json.data)
      } 
    }
  )
}
exports.setPoint = function (num,callback) {
  ajax.request(
    '/wechat-mp/point/set-share/' + num,
    {},
    function (json) {
      if (json.code == 200) {
        callback && callback(json.data.hash)
      }else{
        wx.showModal({
          showCancel: false,
          content:json.message,
        })
      }
    }
  )
}

exports.getRecord = function (callback) {
  ajax.request(
    '/wechat-mp/point/get-history',
    {},
    function (json) {
      // json = {
      //   code: 200,
      //   data: [{
      //     date: '2018-09-01',
      //     desc: '奖励积分',
      //     icon: 'add',
      //     point: '20'
      //   }, {
      //     date: '2018-10-10',
      //     desc: '奖励积分212',
      //     icon: 'subtract',
      //     point: '-10'
      //   }]
      // }
      if (json.code == 200) {
        callback && callback(json.data)
      }
    }
  )
}