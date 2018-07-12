
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 500,
        circular: true
    },

    ready(){
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleBannerItemTap: function(e){
           let url = e.currentTarget.dataset.bannerItem.url;
           if(url){
             url = getApp().global.h5HostUrl + url;  //'/pages/activity/summer/index'
             wx.navigateTo({
                url: ('/pages/special/special?url=' + encodeURIComponent(url))
              })
           } 
        }
    }
})
