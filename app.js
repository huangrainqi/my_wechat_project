// app.js
App({
  // 全局数据池
  globalData: {
    vinList: ['test',
      'LSADDA2443Z000014',
      'LSADDA2423Z000125',
      'LSADDA2413Z000016',
      'LSADDA2493H000077',
      'vin_test_07'
    ],
    clientId: 'vin_test_127',
    mqtt_username: 'xczn_car@2024',
    mqtt_password: 'Innov@2024',
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