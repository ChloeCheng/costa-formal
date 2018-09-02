

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
    hiddenDialog: function (e) {
      if (e.target.dataset.target != 'hide') {
        return
      }
      this.triggerEvent('hiddenDialog');
    },
    
  }
})
