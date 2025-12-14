// index.js
// const amapFile = require('../../utils/AMapWX_SDK_V1.3.0.js')
const amapFile = require('../../utils/AMapWX_SDK_V1.3.0/amap-wx.130.js')
Page({
  data: {
    lat: 39.90923,
    lng: 116.39747,
    markers: [],
    address: '',
    mapHeight: '70vh',   // 默认小图
    x: 60,          // 初始位置
    y: 60,
    scale: 1 ,       // 初始缩放
    isFull: false,          // 当前是否全屏
    winWidth: 300,          // 小窗尺寸
    winHeight: 300
  },
   /* 监听双指缩放 */
   onScale(e) {
    this.setData({ scale: e.detail.scale });
  },

  /* 一键还原 */
  reset() {
    this.setData({ x: 60, y: 60, scale: 1 });
  },
  toggleMapSize() {
    console.log("toggle")
    this.setData({
      mapHeight: this.data.mapHeight === '70vh' ? '90vh' : '70vh'
    })
  },
  toggleFull() {
    const next = !this.data.isFull;
    this.setData({
      isFull: next,
      x: next ? 0 : 60,
      y: next ? 0 : 60,
      scale: 1,
      // 关键：全屏时给 100（=100%），小窗时给 300（=300rpx）
      winWidth: next ? 100 : 300,
      winHeight: next ? 100 : 300
    });
  },
  zoomIn() {
    let s = this.data.scale + 0.1;
    console.log("slcale:",this.data.scale)
    if (s > 2) s = 2;
    this.setData({ scale: s });
  },
  zoomOut() {
    console.log("slcale:",this.data.scale)
    let s = this.data.scale - 0.1;
    if (s < 0.1) s = 0.1;
    this.setData({ scale: s });
  },
  onMapTap(e) {
    // 官方已换算好
    const { longitude, latitude } = e.detail
    console.log('点击处坐标:', longitude, latitude)
    // 如果想把箭头移到该点
    this.setData({
      'markers[0].longitude': longitude,
      'markers[0].latitude': latitude
    })
  },
  onRegionChange(e) {
    if (e.type === 'end' || e.type === 'drag') {   // 只要拖动中/拖动结束
      this.mapCtx = this.mapCtx || wx.createMapContext('gaodeMap')
      this.mapCtx.getCenterLocation({            // 官方接口，毫秒级
        success: res => {
          console.log('中心点经纬度:', res.longitude, res.latitude)
        }
      })
    }
  },
  onLoad() {
    // 1. 实例化高德接口
    this.amapPlugin = new amapFile.AMapWX({ key: '0a0ac2a2c7f1615b99070b18ddded0c2' })
    // 2. 先拿到用户位置（微信授权）
    this.getLocation()
  },
  /* 微信定位 */
  getLocation() {
    // const { lat, lng } = this.data;
    var m_lat = 39.90923
    var m_lon = 116.39747
    this.setData({ lat:m_lat, lng: m_lon})
    this.reverseGeo(m_lat, m_lon)
    this.setData({
      lat: m_lat,
      lng: m_lon,
      markers: [{
        id: 1,
        latitude: m_lat,   // ← 原来是 m_lat
        longitude: m_lon,  // ← 原来是 m_lon
        iconPath: '../../resource/north.png',
        width: 30,
        height: 30,
        rotate: 80,         // 如果想让箭头指北就写 0
        anchor: { x: 0.5, y: 0.5 }
      }]
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
    // this.amapPlugin.getPoiAround({
    //   location: `${this.data.lng},${this.data.lat}`,
    //   querytypes: '010000',   // 加油站
    //   radius: 500,
    //   success: data => {
    //     const mks = data.pois.map(p => ({
    //       id: p.id,
    //       latitude: p.location.lat,
    //       longitude: p.location.lng,
    //       iconPath: '/img/marker.png',  // 32×32
    //       width: 32, height: 32,
    //       callout: { content: p.name, display: 'ALWAYS' }
    //     }))
    //     this.setData({ markers: mks })
    //   }
    // })
  }
})