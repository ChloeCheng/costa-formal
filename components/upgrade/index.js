
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
    },
    isShow: {
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowCover:false,
  },

  ready() {

    console.log(this.info)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hiddenDialogTrigger: function (e) {
      if (e.target.dataset.target != 'hide') {
        return
      }
      this.triggerEvent('hiddenDialog');
    },
    showCover: function () {
      this.setData({
        isShowCover: true
      })
    },
    hideCover: function () {
      this.setData({
        isShowCover: false
      })
      this.triggerEvent('hiddenDialog');
    },
  }
})
