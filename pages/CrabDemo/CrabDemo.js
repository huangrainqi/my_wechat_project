import mqtt from '../../utils/mqtt/mqtt.min.js'

let client = null
const app = getApp();

Page({
  data: {
    subTopic: 'demo_task',
    pubTopic: 'demo_task',
    pub_start: "start",
    pubMsg: 'start',
    received: '',
    connected:false
  },

  onUnload() {
    console.log('mqtt onUnload');

    // 真正退出才销毁
    if (client && client.end) {
      client.end()
      client = null
    }
  },
  onShow() {
    console.log('starj页面show');
  },
  onHide() {
    console.log('starj页面hide');
   this.doDisconnect()
  },
  onLoad() {

    console.log(' mqtt onLoad');
    // 页面第一次创建时连接
    // if (!client) this.doConnect()
  },
  onSubTopic(e) {
    this.setData({ subTopic: e.detail.value.replace(/[^a-zA-Z0-9/_]/g, '') })
  },
  onPubTopic(e) {
    this.setData({ pubTopic: e.detail.value.replace(/[^a-zA-Z0-9/_]/g, '') })
  },
  onPubMsg(e) {
    this.setData({ pubMsg: e.detail.value })
  },
  onUnload() {
    console.log('onUnload');
    if (client && client.end) client.end();
  },
  doConnect() {
    console.log('doconnect');
    const { subTopic } = this.data
    if (!subTopic) {
      wx.showToast({ title: 'Sub Topic 不能为空', icon: 'none' })
      return
    }
    if (client && client.connected) return

    const that = this
    client = mqtt.connect('wxs://mqtt.starjai.com/mqtt', {
          clientId: app.globalData.clientId,
          username: app.globalData.mqtt_username,
          password: app.globalData.mqtt_password,
          reconnectPeriod: 5000,
          connectTimeout: 5000 
        })

    client.on('connect', () => {
      console.log('MQTT 已连接');
      
      wx.showToast({ title: 'MQTT 已连接', icon: 'success' })
      this.setData({ connected: true }); // 连上

      client.subscribe(subTopic, err => {
        if (!err) that.log(`已订阅：${subTopic}`)
      })
    })

    client.on('message', (topic, payload) => {
      that.log(`[${topic}] ${payload.toString()}`)
    })

    client.on('error', err => {
      that.log('连接出错：' + err)
    })
  },
  doPubStop(){
    const { pubTopic, pubMsg } = this.data

    if (!client || !client.connected) {
      wx.showToast({ title: 'MQTT 未连接', icon: 'none' })
      return
    }

    client.publish(pubTopic, "stop", { qos: 1 }, err => {
      if (err) {
        wx.showToast({ title: '发布失败', icon: 'error' })
      } else {
        wx.showToast({ title: '发布成功', icon: 'success' })
        this.log(`[PUB ${pubTopic}] ${pubMsg}`)
      }
    })
  },
  doPubStart() {
    const { pubTopic, pubMsg } = this.data
    if (!pubTopic) {
      wx.showToast({ title: 'Pub Topic 不能为空', icon: 'none' })
      return
    }
    if (!client || !client.connected) {
      wx.showToast({ title: 'MQTT 未连接', icon: 'none' })
      return
    }

    client.publish(pubTopic, pubMsg, { qos: 1 }, err => {
      if (err) {
        wx.showToast({ title: '发布失败', icon: 'error' })
      } else {
        wx.showToast({ title: '发布成功', icon: 'success' })
        this.log(`[PUB ${pubTopic}] ${pubMsg}`)
      }
    })
  },
  
  doDisconnect() {
    if (client) {
      client.end(true);   // true = 强制关闭
      client = null;
      this.setData({ connected: false });
      this.log('已手动断开');
    }
  },
  log(str) {
    const stamp = new Date().toLocaleTimeString('en-GB')
    this.setData({
      // received: `${this.data.received}[${stamp}] ${str}\n`
      received: `[${stamp}]\n ${str}`
    }, () => {
      wx.createSelectorQuery()
        .select('.scroll')
        .boundingClientRect(rect => {
          if (rect) wx.pageScrollTo({ scrollTop: rect.height + 999 })
        })
        .exec()
    })
  }
})