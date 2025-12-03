// index.js
// const amapFile = require('../../utils/AMapWX_SDK_V1.3.0.js')
const amapFile = require('../../utils/AMapWX_SDK_V1.3.0/amap-wx.130.js')
Page({
  data: {
    lat: 39.90923,
    lng: 116.39747,
    markers: [],
    address: ''
  },
  onLoad() {
    // 1. 实例化高德接口
    this.amapPlugin = new amapFile.AMapWX({ key: '0a0ac2a2c7f1615b99070b18ddded0c2' })
    // 2. 先拿到用户位置（微信授权）
    this.getLocation()
  },
  /* 微信定位 */
  getLocation() {
    wx.getLocation({ type: 'gcj02', success: res => {
        this.setData({ lat: res.latitude, lng: res.longitude })
        this.reverseGeo(res.latitude, res.longitude)
      }
    })
  },
  /* 逆地理 */
  reverseGeo(lat, lng) {
    this.amapPlugin.getRegeo({
      location: `${lng},${lat}`,
      success: data => {
        const addr = data[0].regeocodeData.formatted_address
        this.setData({ address: addr })
      }
    })
  },
  /* 周边搜索 */
  getPOI() {
    this.amapPlugin.getPoiAround({
      location: `${this.data.lng},${this.data.lat}`,
      querytypes: '010000',   // 加油站
      radius: 500,
      success: data => {
        const mks = data.pois.map(p => ({
          id: p.id,
          latitude: p.location.lat,
          longitude: p.location.lng,
          iconPath: '/img/marker.png',  // 32×32
          width: 32, height: 32,
          callout: { content: p.name, display: 'ALWAYS' }
        }))
        this.setData({ markers: mks })
      }
    })
  }
})