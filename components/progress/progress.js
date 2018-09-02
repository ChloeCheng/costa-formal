

const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
    },
    isShow:{
      type:Boolean,
      observer: function(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        this.changeAnimation(newVal);
     }
    },
    text: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentLanguage: app.global.currentLanguage || 'zh',
    currentData: app.global[app.global['currentLanguage']].process,
    showAnimation: false
  },
  ready() {
    setInterval(()=>{
      let currentLanguage = app.global['currentLanguage']
      if (this.data.currentLanguage != currentLanguage){
        this.setData({
          currentLanguage: currentLanguage,
          currentData: app.global[currentLanguage].process
        });
      }
    },1000)
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail:function(){
      this.triggerEvent('hiddenDialog');
      wx.navigateTo({
        url: '/pages/member/index',
      })
    },
    changeAnimation(newVal){
      
      if(newVal){
        let self = this;
        setTimeout(function(){
          self.setData({
            showAnimation: true
          })
        },200)
      }
      
     
    },
    closeAnimation(){
      this.setData({
        showAnimation: false
      });
      this.triggerEvent('hiddenDialog');
    },
    hiddenDialog: function (e) {
      if (e.target.dataset.target != 'hide') {
        return
      }
      this.triggerEvent('hiddenDialog');
    },
    
  }
})
