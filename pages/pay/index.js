// pages/points/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addCardTap();
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.addCardTap();
  },
  getAppId(callback){
    wx.login({
      success: function (res) {
        if (res.code) {
          //获取openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
  　　　　　　　//小程序唯一标识
              appid: 'wxaef59cece1fa6124',
  　　 　　 　　//小程序的 app secret
              secret: '20ecd1dc71ee0273d7e2ae5a6a018f0c',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json'},
            success: function(openIdRes){
                console.log(openIdRes.data.openid)
                console.log(res.code)
                callback && callback(openIdRes.data.openid, res.code)
            },
            fail: function(error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    });
  },
  addCardTap(){
    this.getAppId(function(id, code){
      let time = Math.floor(new Date().getTime()/1000);
     wx.addCard({
      cardList: [
        {
          // cardId: 'piOxp1mVprjRHcshqAKU5d2jZl4U', //'pJYr5jsXWx5ckp82dPu6pVRqPfws', //'piOxp1mVprjRHcshqAKU5d2jZl4U',
          // cardExt:	`{"api_ticket":"HoagFKDcsGMVCIY2vOjf9ofcj2a8F5lHBS_Es91nJNj3_oDjKXET2NVfLn4UQHbMROObtZi9UXn8_-ZSFRLHcQ","code": ${code},"openid": ${id},"nonce_str":"5b0b968ad2049","signature":"d9e0a3c12811e8066631b3a21e08741d016689f7","timestamp":${time}}`
          
            cardId: 'pDRa7jn8bf-LsjT1XXnd_e_JZbfc',
            cardExt: '{"code": "", "openid": "", "timestamp": "1527759976", "nonce_str":"8328b961-0412-4637-ad82-c9521fe6f9c1","signature":"a0946e27269672afd51346206fdd8a1098013716"}'
          
        }
      ],
      success: function(res) { 
        console.log(res)
      },
      fail: function (res){
        console.log(res)
      }
    }) 
    })
    
  /* wx.navigateToMiniProgram({
    appId: 'wxeb490c6f9b154ef9', //固定为此 appid，不可改动
    extraData: {
      'encrypt_card_id': encodeURIComponent('piOxp1mVprjRHcshqAKU5d2jZl4U'),
      'outer_str': '123',
      'biz': encodeURIComponent('wxcf7530198830ffdb')  //gh_83588d72d29b
    }, // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数
    success: function(res) {
      console.log('111')
      console.log(res)
    },
    fail: function(res) {
      console.log('222')
      console.log(res)
    },
    complete: function(res) {
      console.log('333')
      console.log(res)
    }
  })*/
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.addCardTap();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})