
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
    
  },

  ready() {
    
    console.log(this.info)
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
    hiddenDialog: function () {
      this.triggerEvent('hiddenDialog');
    },
  }
})
