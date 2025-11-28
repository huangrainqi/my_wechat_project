// mqtt 
import mqtt from '../../utils/mqtt/mqtt.min.js'
// // proto 
const protobuf = require('../../utils/proto/weichatPb/protobuf.js');
var  node_js = require('../../proto/starj_proto/brain_net_data_v5.js');
var NodeRoot = protobuf.Root.fromJSON(node_js);
var  dispatch_js = require('../../proto/starj_proto/dispatch_msg');
var DispatchRoot = protobuf.Root.fromJSON(dispatch_js);
var node_pb = NodeRoot.lookupType("brain_net_data_v3.brain_node_data");

let client = null
Page({
  data: {
    vinList: ['a','b','c'],
    vinIdx: 0,
    pubTopic: '',
    pubMsg: '{"msg":"hello"}',
    received: '',
    connected: false,
    logCount: 0
  },
  onSelectVin() {
    wx.showActionSheet({
      itemList: this.data.vinList,          // 数组即选项
      success: (res) => {
        const idx = res.tapIndex;
        this.setData({
          vinIdx: idx,
          subTopic: `node_msg_topic/${this.data.vinList[idx]}`
        });
      }
    });
  },
  onVinPick(e) {
    const idx = e.detail.value;
    this.setData({ vinIdx: idx, subTopic: `node_msg_topic/${this.data.vinList[idx]}` });
  },
  onVinPick(e) {
    const idx = e.detail.value;               // 下标
    const vin = this.data.vinList[idx];       // 选中的 vin
    const topic = `node_msg_topic/${vin}`;    // 按业务规则拼 topic
    this.setData({ vinIdx: idx, subTopic: topic });
  },
  convertLongToNumber(longObj) {
    if (longObj && typeof longObj === 'object' && 'low' in longObj) {
      return longObj.low + (longObj.high * 0x100000000);
    }
    return longObj;
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
      // that.log(`[${topic}] ${payload.toString()}`)
      const u8 = new Uint8Array(payload);  
      var deMessage = node_pb.decode(u8);
      console.log("接收到的protomsg :", this.convertLongToNumber(deMessage.basetime) , " , buffer 长度: ", u8.length);
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