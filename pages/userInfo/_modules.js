const ajax = require('../../modules/ajax.js')
const Dialog = require('../../components/vendor/dist/dialog/dialog');

exports.getDetail = function (callback) {
  ajax.request(
    '/wechat-mp/customer/get-userinfo',
    {},
    function (json) {
      // json = {
      //   code: 200,
      //   data: {
      //     birthday: '2018-3-43',
      //     city: '110100',
      //     province: '110',
      //     company: 'gosg',
      //     favourites: ['美式', '拿铁'],
      //     gender: 1,
      //     job: '3234',
      //     name: '3223',
      //   }
      // }
      json.data.province = json.data.province_code//'110'
      json.data.city = json.data.city_code //'110100'
      //json.data.favourites = '1, 2,3'
      if (json.code == 200) {
        json.data.province = json.data.province_code//'110'
        json.data.city = json.data.city_code //'110100'
        callback && callback(json.data)
      }
    }
  )
}


exports.getAddress = function (callback) {
  ajax.request(
    '/wechat-mp/customer/get-city',
    {},
    function (json) {
      // json = {
      //   code: 200,
      //   data: {
      //     provinces: [{
      //       code: 110,
      //       name: '北京',
      //     }, {
      //       code: 120,
      //       name: '天津',
      //     }, {
      //       code: 130,
      //       name: '河北',
      //     }, {
      //       code: 140,
      //       name: '湖南',
      //     }, {
      //       code: 150,
      //       name: '山西',
      //     }
      //     ],
      //     cities: {
      //       110: [
      //         {
      //           code: 110100,
      //           name: '北京'
      //         }
      //       ],
      //       120: [
      //         {
      //           code: 120100,
      //           name: '天津'
      //         }
      //       ],
      //       130: [
      //         {
      //           code: 130100,
      //           name: '石家庄'
      //         },
      //         {
      //           code: 130101,
      //           name: '唐山'
      //         },
      //         {
      //           code: 130102,
      //           name: '秦皇岛'
      //         }
      //       ],
      //       140: [
      //         {
      //           code: 140100,
      //           name: '石家庄4'
      //         },
      //         {
      //           code: 140101,
      //           name: '唐山4'
      //         },
      //         {
      //           code: 140102,
      //           name: '秦皇岛4'
      //         }
      //       ],
      //       150: [
      //         {
      //           code: 150100,
      //           name: '石家庄5'
      //         },
      //         {
      //           code: 150101,
      //           name: '唐山5'
      //         },
      //         {
      //           code: 150102,
      //           name: '秦皇岛5'
      //         }
      //       ]
      //     }
      //   }
      // }
      if (json.code == 200) {
        callback && callback(json.data)
        wx.setStorage({
          key: "address",
          data: json.data
        })
      }
    }
  )
}

exports.getFavourities = function (callback) {
  ajax.request(
    '/wechat-mp/customer/get-favorites',
    {},
    function (json) {
      // json = {
      //   code: 200,
      //   data: [
      //     { name: '美式', id: 1 },
      //     { name: '拿铁', id: 2 },
      //     { name: '卡布奇诺', id: 3 },
      //     { name: '摩卡', id: 4 },
      //     { name: '醇艺白', id: 5 }, {
      //       name: '意式浓缩', id: 6
      //     },
      //     { name: '可塔朵', id: 7 },
      //     { name: '茶饮', id: 8 },
      //     { name: '巧克力', id: 9 }]
      // }
      if (json.code == 200) {
        callback && callback(json.data)
      }
    }
  )
}

exports.update = function (option) {
  option.method = 'POST'
  ajax.request(
    '/wechat-mp/customer/info-submit',
    option,
    function (json) {
      // json = {
      //   code: 200
      // }
      if (json.code == 200) {
        let lan = getApp().global.currentLanguage;
        wx.showModal({
          title:(lan === 'zh' ? '提示' : 'Notice'),
          content: json.message,
          confirmText:(lan === 'zh' ? '确认' : 'Confirm'),
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
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