

// 获取用户授权
function getUserInfo() {
    autoLogin.tryLogin(true, function() {
        var saturn = storage.get('saturn');
        vipLoading.hideLoading();
        if (saturn) {
            // loginModules.loginCompelete({
            //     type: 'gotoLastPath'
            // });
        }
    });
}

// 打开授权设置
function openSetting() {
    wx.openSetting({
        success: function(res) {
            if (res && res.authSetting && res.authSetting['scope.userInfo']) {
               
                getUserInfo();
            }
        }
    });
}

// 检查是否授权
exports.checkAuth = function({callback} = {}) {
    wx.getSetting({
        success(res) {
            if (!res['scope.userInfo']) {
                wx.authorize({
                    scope: 'scope.userInfo',
                    fail: function(err) {
                        callback && callback({auth: false});
                        console.log('认证失败' + JSON.stringify(err));
                        wx.showModal({
                            content: '检测到您未打开微信用户信息授权，开启后即可进行登录',
                            confirmText:'去开启',
                            cancelText:'取消',
                            confirmColor: '#000000',
                            success: function(res) {
                                if (res.confirm) {
                                    openSetting();
                                } else if (res.cancel) {
                                    // wx.navigateBack();
                                }
                            }
                        });
                    },
                    success: function(){
                        callback && callback({auth: true});
                    }
                })
            } else {
                callback && callback({auth: true});
            }
        },
        fail: function(err){
            console.log('checkAuth fail!!!!')
        }
    })
}
