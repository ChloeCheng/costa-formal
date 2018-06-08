const app = getApp()
const storage = require('./storage.js')
const ajax = require('./ajax.js')
const getUrl = require('./getPageUrl.js')


//最终供外面调用的方法
exports.login = function (option) {
  console.log('logining..........');
  //调用登录接口
  wx.login({
    success: function (e) {
      console.log('wxlogin successd........');
      var code = e.code;
      wx.getUserInfo({
        success: function (res) {
          console.log('wxgetUserInfo successd........');
          var encryptedData = encodeURIComponent(res.encryptedData);
          thirdLogin(code, encryptedData, res.iv, option);//调用服务器api
        }
      })
    }
  });
}

function thirdLogin(code, encryptedData, iv, option) {
  var url = "eeee/xxx/login/ttttt";
  var params = new Object();
  params.code = code;
  params.encryptedData = encryptedData;
  params.iv = iv;
  params.option = option
  console.log(params)
  if (true) {
    console.log('登录成功')
    wx.setStorageSync('session_id', '32232')
    //跳转callbackurl
    var url = getUrl.getCallbackUrl()
    wx.redirectTo({
      url: url,
    })
  } else {
    console.log('未登录')
  }
  return
  ajax.request(
    'https://developers.weixin.qq.com/miniprogram/gitbook/images/list@2x.png',
    { a: 11 },
  )
  // wx.request({
  //   url: 'https://developers.weixin.qq.com/miniprogram/gitbook/images/list@2x.png',
  //   data: params,
  //   success: function (res) {
  //     console.log(res.data)
  //     getApp().globalData.session_id = res.data.session_id;
  //     getApp().globalData.uid = res.data.uid;
  //     getApp().globalData.isLogin = true;
  //     console.log('my  login successd........');
  //   }
  // })


}

// 检查是否授权
exports.checkAuth = function ({ callback } = {}) {
  wx.getSetting({
    success(res) {
      if (!res['scope.userInfo']) {
        wx.authorize({
          scope: 'scope.userInfo',
          fail: function (err) {
            callback && callback({ auth: false });
            console.log('认证失败' + JSON.stringify(err));
            wx.showModal({
              content: '检测到您未打开微信用户信息授权，开启后即可进行登录',
              confirmText: '去开启',
              cancelText: '取消',
              confirmColor: '#000000',
              success: function (res) {
                if (res.confirm) {
                  openSetting();
                } else if (res.cancel) {
                  // wx.navigateBack();
                }
              }
            });
          },
          success: function () {
            callback && callback({ auth: true });
          }
        })
      } else {
        callback && callback({ auth: true });
      }
    },
    fail: function (err) {
      console.log('checkAuth fail!!!!')
    }
  })
}
