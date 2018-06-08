let URL = {
    login: {
      login: 'https://costa.slashsoft.cn/wechat-mp/oauth/',
    },
    pay: {
       url: 'https://costa.slashsoft.cn/wechat-mp/wechat/get-card-api-'  //获取卡券签名接口
    },
    home: {
        userInfo: 'https://costa.slashsoft.cn/wechat-mp/customer/get-userinfo',   //获取用户信息
        status: 'httpss://api.union.vip.com/vsp/user/join/b2clogin',   //获取提醒设置状态
        bannerList: 'https://costa.slashsoft.cn/wechat-mp/campaign/get-banner',
        bannerAll: 'https://costa.slashsoft.cn/wechat-mp/campaign/get-all',
        activity: 'https://costa.slashsoft.cn/wechat-mp/campaign/dianliang/get-cups'
    },
    store: {
        storeList: 'https://costa.slashsoft.cn/wechat-mp/store/by-geo/',  // 获取门店信息
        searchStore: 'https://costa.slashsoft.cn/wechat-mp/store/by-search/'  //搜索门店信息
    },
    card: {
        list: 'https://costa.slashsoft.cn/wechat-mp/coupon/get-all',  //获取卡券列表  
        detail: 'https://costa.slashsoft.cn/wechat-mp/coupon/get-by-id/',  //获取优惠券详情
        share: 'https://costa.slashsoft.cn/wechat-mp/coupon/set-share/', //获取优惠券分享码 
        shareDatail: 'https://costa.slashsoft.cn/wechat-mp/coupon/get-by-hash/', //分享的优惠券详情
        getShare: 'https://costa.slashsoft.cn/wechat-mp/coupon/receive-share/' //领取分享的优惠券
    }
}

export default URL;