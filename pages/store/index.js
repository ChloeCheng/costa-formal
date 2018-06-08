// pages/points/index.js
const app = getApp()
const URL = require('../../modules/api-list.js');
const ajax = require('../../modules/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorizeLocation: true,
    location:{
      'latitude': '',
      'longitude': ''
    },
    city:'',
    currentData: app.global[app.global['currentLanguage']].store,
    currentDataTotal: app.global[app.global['currentLanguage']],
    list:[],
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      currentData: app.global[app.global['currentLanguage']].store,
      'currentDataTotal': app.global[app.global['currentLanguage']]
    })
      
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  initPage(){
    let _this = this;
    wx.getSetting({
      success(res) {
          if (res.authSetting['scope.userLocation']) {
            // 已经授权，可以直接调用 
            wx.getLocation({
              type: 'wgs84',
              success: function(res) {
                var latitude = (res.latitude + '').replace('.', '_');
                var longitude = (res.longitude + '').replace('.', '_');
                _this.getCity(res.latitude,res.longitude);
                _this.initData(latitude,longitude);
                _this.setData({
                  'location':{
                    'latitude': latitude,
                    'longitude': longitude
                  },
                  'authorizeLocation': true
                });
              }
            })
          } else {
            wx.getLocation({
              type: 'wgs84',
              success: function(res) {
                var latitude = (res.latitude + '').replace('.', '_');
                var longitude = (res.longitude + '').replace('.', '_');
                _this.getCity(res.latitude,res.longitude);
                _this.initData(latitude,longitude);
                _this.setData({
                  'location':{
                    'latitude': latitude,
                    'longitude': longitude
                  },
                  'authorizeLocation': true
                });
              },
              fail: function(res){
                _this.setData({
                  'authorizeLocation': false
                });
              }
            })
          }
      },
      fail: function(err){
          console.log('checkAuth fail!!!!')
      }
    })
  },
  openLocation(event) {
    const {currentTarget:{dataset:{item}}} = event
    wx.openLocation({
      latitude: item.lat,
      longitude: item.lng
    })          
  },
  searchListByKey(){
    if(!this.data.inputValue){
      wx.showModal({
        content: '请输入搜索内容',
        showCancel: false
      })
      return;
    }
    this.initData(this.data.location.latitude,this.data.location.longitude, true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initPage();
  },
  initData(latitude,longitude,search){
    let _this = this;
    let url = `${URL.default.store.storeList}${latitude}/${longitude}`;
    if(search){
       url = `${URL.default.store.searchStore}${latitude}/${longitude}/${_this.data.inputValue}`;
    }  
    ajax.request(
      url,
      {},
      function(data){
        if(data.code === 200) {
          let dataList = data.data;
          dataList.forEach(item=>{
            item.distance = parseFloat(item.distance/1000).toFixed(1)
          })
          _this.setData({
            'list': dataList
          });
        }
      }
     )
  },
  getCity(latitude,longitude) {
    let _this = this;
    let url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=QYQBZ-PJ7CF-GKMJP-NI4GO-EM7TQ-UDFQM`
    wx.request({
      url: url, 
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let city = res.data.result.address_component.city
        _this.setData({
          'city': city
        });
      }
    })
  },
  getSettingInfo(){
    let _this = this;
    let detail = e.detail;

    if (detail.errMsg == 'getLocation:ok') {
      this.setData({
        'authorizeLocation': true
      }); 
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          _this.getCity(latitude,longitude);
          _this.setData({
            'authorizeLocation': true
          });
        },
        fail: function(res){
          _this.setData({
            'authorizeLocation': false
          });
        }
      })    
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.initPage();
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
  
  }
})