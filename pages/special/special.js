const app = getApp();
Page({
    data:{
        webviewUrl:'',
        currentData: app.global[app.global['currentLanguage']]
    },
    onLoad: function (options) {
        // wx.hideShareMenu();
        this.setData({ 
            currentData: app.global[app.global['currentLanguage']]
        });
        if(options.url){
            this.setData({
                webviewUrl: decodeURIComponent(options.url)
            });
        }
    },

   

    onUnload: function () {
       
    },

    onShareAppMessage: function () {
        let shareData = app.global.activityShareData;
        return {
            title: shareData.share_title || '活动',
            imageUrl: shareData.share_imageurl,
            path: '/pages/index/index?$route=' + encodeURIComponent('/pages/special/special?url=' + encodeURIComponent(this.data.webviewUrl))
          }
    }


  

})

