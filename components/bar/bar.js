
const URL = require('../../modules/api-list.js');
const ajax = require('../../modules/ajax.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        active: {
            type: Boolean,
            value: false
        },
        currentData: {
            type: Object,
            value: {home:{home:'主页','myPay':'微信支付'}}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    ready(){

    },

    /**
     * 组件的方法列表
     */
    methods: {
        skipHome: function(){
          let pages = getCurrentPages();    //获取加载的页面
          let currentPage = pages[pages.length-1];    //获取当前页面的对象
          let url = currentPage.route;    //当前页面url
          let target = '/pages/index/index', prev = '';
          console.log(url)
          if(target.indexOf(url) > 0) {
            return;
          }
          if (pages.length > 1) {
            prev = pages[pages.length-2].route;
            if(target.indexOf(prev) > 0){
              wx.navigateBack();
              return;
            }
          }
          if(target){
            wx.navigateTo({
              url: target,
            })
          }    
        },
        skipPay: function(){
          let url = `${URL.default.pay.url}`;
          ajax.request(
            url,
            {},
            function(data){
              if(data.code === 200) {
                let code = data.data.code;
                if(code){
                  wx.openCard({
                    cardList: [
                      {
                        cardId: data.data.cardapiConfig.cardId,
                        code: code
                      }
                    ],
                    success: function(res) {
                      console.log(res)
                    }
                  })
                } else {
                  wx.addCard({
                    cardList: [
                      {  
                        cardId: data.data.cardapiConfig.cardId,
                        cardExt: JSON.stringify(data.data.cardapiConfig.cardExt)
                          //cardId: 'pDRa7jn8bf-LsjT1XXnd_e_JZbfc',
                         // cardExt: '{"code": "", "openid": "", "timestamp": "1527923255", "nonce_str":"776f42ed-cc24-4e1a-b681-bce2118bb9e0","signature":"13b269085ef156148843ffd4ea0fdc4206f23872"}'
    
                      }
                    ],
                    success: function(res) { 
                      console.log(res)
                    },
                    fail: function (res){
                      console.log(res)
                    }
                  })

                }
                
              }
            }
           )          
         }
    }
})
