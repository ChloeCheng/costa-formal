

// { "code":200, "data":[{ "summary": "开业当天任意消费，即送新年贺卡期待您的光临", "img": "/default/upload/banner-1.jpg", "banner": true, "title": "上海大宁国际广场店开业啦～", "content": "", "url": "", "released": 1525917600000 }, { "summary": "夏季第一波好礼诚意上线，喝夏日新品享积杯精美好礼，快到COSTA门店参与吧~", "img": "/default/upload/banner-3.jpg", "banner": true, "title": "积杯有礼", "content": "", "url": "/wechat/jibei?scheme=https", "released": 1525921200000 }], "message":"成功" }



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
           getApp().global.activityShareData = e.currentTarget.dataset.bannerItem;
           if(url){
             url = getApp().global.h5HostUrl + url;  //'/pages/activity/summer/index'
             wx.navigateTo({
                url: ('/pages/special/special?url=' + encodeURIComponent(url))
              })
           } 
        }
    }
})
