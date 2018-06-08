let URL = {
    login: {
      login: 'https://miniprogramapi.costa.net.cn/wechat-mp/oauth/',
    },
    pay: {
       url: 'https://miniprogramapi.costa.net.cn/wechat-mp/wechat/get-card-api-'  //获取卡券签名接口
    },
    home: {
        userInfo: 'https://miniprogramapi.costa.net.cn/wechat-mp/customer/get-userinfo',   //获取用户信息
        bannerList: 'https://miniprogramapi.costa.net.cn/wechat-mp/campaign/get-banner',
        bannerAll: 'https://miniprogramapi.costa.net.cn/wechat-mp/campaign/get-all',
        activity: 'https://miniprogramapi.costa.net.cn/wechat-mp/campaign/dianliang/get-cups'
    },
    store: {
        storeList: 'https://miniprogramapi.costa.net.cn/wechat-mp/store/by-geo/',  // 获取门店信息
        searchStore: 'https://miniprogramapi.costa.net.cn/wechat-mp/store/by-search/'  //搜索门店信息
    },
    card: {
        list: 'https://miniprogramapi.costa.net.cn/wechat-mp/coupon/get-all',  //获取卡券列表  
        detail: 'https://miniprogramapi.costa.net.cn/wechat-mp/coupon/get-by-id/',  //获取优惠券详情
        share: 'https://miniprogramapi.costa.net.cn/wechat-mp/coupon/set-share/', //获取优惠券分享码 
        shareDatail: 'https://miniprogramapi.costa.net.cn/wechat-mp/coupon/get-by-hash/', //分享的优惠券详情
        getShare: 'https://miniprogramapi.costa.net.cn/wechat-mp/coupon/receive-share/' //领取分享的优惠券
    }
}

export default URL;