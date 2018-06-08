// pages/userInfo/index.js
const app = getApp()
const ajax = require('./_modules.js')
const dateFormat = require('../../modules/dateFormat.js')
const Dialog = require('../../components/vendor/dist/dialog/dialog');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: app.global[app.global['currentLanguage']].userInfo,
    currentDataTotal: app.global[app.global['currentLanguage']],
    name: app.global.wxUserInfo.nickName,
    mobile:"",
    birthday: "",
    gender: '',
    city: '北京-北京',
    company: '',
    position: '',
    region: ['北京', '北京'],
    favorites: [],
    items: [],
    detail: {
      birthday: '',
      city: '',
      province: '',
      company: '',
      favorites: [],
      gender: 1,
      position: '',
      name: '',
      mobile:''
    },
    address: {},
    multiArray: [[], []],
    multiIndex: [0, 0],
    provinceId: '',
    cityID: '',
    selectedProvince: 0,
    selectedCity: 0,
    ts: (new Date()).getTime(),
  },
  bindMultiPickerChange: function (e) {
    // 确定按钮
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var multiIndex = this.data.multiIndex
    if (e.detail.column == 0) {
      multiIndex[0] = e.detail.value
      multiIndex[1] = 0
      this.setData({
        multiIndex: multiIndex
      })
      this.getMultiArrayByIndex(e.detail.value, 0)
    } else {
      multiIndex[1] = e.detail.value
      this.setData({
        multiIndex
      })
    }
  },
  submit: function () {
    if (this.data.name === "") {
      wx.showModal({
        title: '',
        showCancel: false,
        content: this.data.currentData.nameTips,
      })
    }  else {
      let favorites = this.getfavourites().join(',')
      let { cityID, provinceID } = this.getIDByIndex()
      ajax.update({
        'name': this.data.name,
        'mobile': this.data.mobile,
        'birthday': dateFormat.dateFormat(this.data.birthday, 'yyyy-MM-dd'),
        'gender': this.data.gender,
        //'province': provinceID,
        'city': provinceID + " " +cityID,
        'company': this.data.company,
        'position': this.data.position,
        'favorite': favorites,
      })
    }
  },
  toggleCheck: function (e) {
    var id = e.currentTarget.dataset.id
    var newItems = this.data.items.map(item => {
      if (item.id == id) {
        item.checked = !item.checked
      }
      return item
    })
    this.setData({
      items: newItems
    })
  },
  bindSexChange: function (e) {
    this.setData({
      gender: this.data.currentData.sex[e.detail.value],
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPositionInput: function (e) {
    this.setData({
      position: e.detail.value,
    })
  },
  bindCompanyInput: function (e) {
    this.setData({
      company: e.detail.value,
    })
  },
  bindUserNameInput: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.setData({
      currentData: app.global[app.global['currentLanguage']].userInfo,
      currentDataTotal: app.global[app.global['currentLanguage']]
    })

    ajax.getAddress((data) => {
      var _data = data
      this.setData({ address: data })
      ajax.getDetail((data) => {
        this.getMultiArray(_data, data.province, data.city)
        this.updateInfo(data)
        this.setData({ detail: data })
      })
    })
  },
  updateInfo(data) {
    var gender = data.gender || 1
    this.setData({
      gender: app.global[app.global['currentLanguage']].userInfo.sex[data.gender - 1],
      //city: '北京-北京',
      birthday: dateFormat.dateFormat(data.birthday, 'yyyy-MM-dd'),
      name: data.name || app.global.wxUserInfo.nickName,
      mobile: data.mobile,
      favorites: data.favorites,
      position: data.position,
      company: data.company,
      provinceID: data.province,
      cityID: data.city
    })

    ajax.getFavourities((data) => {
      var items = data.map((item, index) => {
        if (this.data.favorites.includes(item.id)) {
          item.checked = true
        }
        return item
      })
      this.setData({
        items: items
      })
    })
  },
  getfavourites() {
    var r = []
    this.data.items.map((item) => {
      if (item.checked) {
        r.push(item.id)
      }
    })
    return r
  },
  getMultiArray(data, provinceID, cityID) {
    if (data == null) {
      data = wx.getStorageSync('address')
    }
    var province = data.provinces || []
    var city = data.cities || []
    var currentProvince = '' //selectedData.province
    var currentCity = '' //city[provinceID][cityID].name
    var multiArray = [[], []]
    var multiIndex = []
    var multiProvince = []
    var multiCity = []
    province.map((item, index) => {
      if (item.code == provinceID) {
        currentProvince = index
      }
      multiProvince.push(item.name)
    })
    if(city[provinceID]){
      city[provinceID].map((item, index) => {
        if (item.code == cityID) {
          currentCity = index
        }
        multiCity.push(item.name)
      })
    }
    multiIndex = [currentProvince, currentCity]
    multiArray = [multiProvince, multiCity]

    this.setData({
      multiArray: multiArray,
      multiIndex,
      ts: (new Date()).getTime()
    });
    return {
      multiIndex,
      multiArray,
      provinceID,
      cityID,
      currentProvince,
      currentCity
    }
  },
  getMultiArrayByIndex(pIndex, cIndex) {
    var cityName = this.data.multiArray[1][cIndex]
    var provinceID = this.data.address.provinces[pIndex]['code']
    var multiCity = []

    this.data.address.cities[provinceID].map((item) => {
      multiCity.push(item.name)
    })
    var multiArray = this.data.multiArray
    multiArray[1] = multiCity
    this.setData({
      multiArray: multiArray,
      ts: (new Date()).getTime()
    })
  },
  getIDByIndex() {
    var pIndex = this.data.multiIndex[0]
    var cIndex = this.data.multiIndex[1]
    var cityName = this.data.multiArray[1][cIndex]
    var provinceID = (this.data.address.provinces[pIndex]&&this.data.address.provinces[pIndex]['code']) || ''
    var cityID = ''
    this.data.address.cities[provinceID]&&this.data.address.cities[provinceID].map((item) => {
      if (item.name == cityName) {
        cityID = item.code
      }
    })
    return {
      provinceID,
      cityID
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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