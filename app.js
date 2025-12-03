// app.js

const vinDict = require('./data/vin.js') 
App({
  // 全局数据池
  globalData: {
    clientId: 'vin_test_127',
     mqtt_username: 'xczn_car@2024',
    mqtt_password: 'Innov@2024',
    carTypeList: [],   // 车型列表
    aliasList: [],     // 所有「车型-别名」
    vinMap: {}         // 「车型-别名」-> 真实 VIN
  },
  getDeviceId() {
    let id = wx.getStorageSync('mqtt_client_id');
    if (!id) {
      id = 'dev_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
      wx.setStorageSync('mqtt_client_id', id);
    }
    return id;
  },
  
  onLaunch() {
    this.globalData.clientId = this.getDeviceId()
    console.log("clientid:",this.globalData.clientId)
    this._buildVinPickData()
  },

  _buildVinPickData() {
    const dict = vinDict
    const carTypeList = Object.keys(dict)
    const aliasList = []
    const vinMap = {}

    carTypeList.forEach(type => {
      Object.keys(dict[type]).forEach(alias => {
        const fullKey = `${type}-${alias}`   // 例：DR5-DR5-1
        aliasList.push(fullKey)
        vinMap[fullKey] = dict[type][alias]
      })
    })

    // ④ 直接写进 globalData
    Object.assign(this.globalData, { carTypeList, aliasList, vinMap })
  },
  // 全局读写方法（可选，但推荐）
  setGlobalData(key, val) {
    this.globalData[key] = val;
    // 如果页面需要实时刷新，可在页面侧手动 this.setData({ ...getApp().globalData })
  },
  getGlobalData(key) {
    return key ? this.globalData[key] : this.globalData;
  }
});