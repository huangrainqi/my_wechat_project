import mqtt from '../../utils/mqtt/mqtt.min.js'

let client = null

Page({
  data: {
    subTopic: '/test',
    pubTopic: '/test',
    pubMsg: 'hello',
    received: ''
  },

  onUnload() {
    console.log('mqtt onUnload');

    // 真正退出才销毁
    if (client && client.end) {
      client.end()
      client = null
    }
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
    console.log('btn -> doconnect');

    wx.showToast({ title: 'btn', icon: 'none' });
    const { subTopic } = this.data
    if (!subTopic) {
      wx.showToast({ title: 'Sub Topic 不能为空', icon: 'none' })
      return
    }

    if (client && client.connected) return

    const that = this
    client = mqtt.connect('wxs://monitor.xbrainnet.cn/mqtt', {
          clientId: 'vim_test_073' ,
          username: 'xczn_car@2024',
          password: 'Innov@2024',
          reconnectPeriod: 5000,
          connectTimeout: 5000 
    })

    client.on('connect', () => {
      console.log('MQTT 已连接');
      wx.showToast({ title: 'MQTT 已连接', icon: 'success' })
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

  doConnect2() {
    console.log('btn -> doconnect22');

    wx.showToast({ title: 'btn', icon: 'none' });
    const { subTopic } = this.data
    if (!subTopic) {
      wx.showToast({ title: 'Sub Topic 不能为空', icon: 'none' })
      return
    }
    if (client && client.connected) return

    const that = this
    client = mqtt.connect('wxs://zq159840gp6.vicp.fun/mqtt', {
          clientId: 'vim_test_072' ,
          reconnectPeriod: 5000,
          connectTimeout: 5000 
        })

    client.on('connect', () => {
      console.log('MQTT 已连接');
      
      wx.showToast({ title: 'MQTT 已连接', icon: 'success' })
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
  doPublish() {
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