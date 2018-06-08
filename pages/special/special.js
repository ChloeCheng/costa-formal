Page({
    data:{
        webviewUrl:''
    },
    onLoad: function (options) {
        wx.hideShareMenu();

        if(options.url){
            this.setData({
                webviewUrl: decodeURIComponent(options.url)
            });
        }
    },

   

    onUnload: function () {
       
    },

    onShareAppMessage: function () {
        
    },


  

})

