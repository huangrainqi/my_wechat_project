// mqtt 
import mqtt from '../../utils/mqtt/mqtt.min.js'
// // proto 
const protobuf = require('../../utils/proto/weichatPb/protobuf.js');
var node_js = require('../../proto/starj_proto/brain_net_data_v5.js');
var NodeRoot = protobuf.Root.fromJSON(node_js);
var dispatch_js = require('../../proto/starj_proto/dispatch_msg');
var DispatchRoot = protobuf.Root.fromJSON(dispatch_js);
var node_pb = NodeRoot.lookupType("brain_net_data_v3.brain_node_data");

let client = null
const app = getApp();
Page({
  data: {
    vinList: app.globalData.vinList,
    vinIdx: 0,
    pubTopic: '',
    pubMsg: '{"msg":"hello"}',
    received: '',
    connected: false,
    logs: [],      // 最多 10 条
    log_max_cnt: 20,
    logCounter: 0,  // 全局序号
    showPub: false   // 默认隐藏
  },
  /* 1. 手输 VIN */
  onSubVinInput(e) {
    const vin = e.detail.value.trim()
    this.setData({
      sub_vin: vin,
      subTopic: vin ? `node_msg_topic/${vin}` : ''
    })
  },
  /* 3. 底部 ActionSheet 选择 */
  onSelectVin() {
    wx.showActionSheet({
      itemList: this.data.vinList,
      success: (res) => {
        const idx = res.tapIndex
        const vin = this.data.vinList[idx]
        this.setData({
          vinIdx: idx,
          sub_vin: vin,            // 同步到输入框
          subTopic: `node_msg_topic/${vin}`
        })
      }
    })
  },
  onVinPick(e) {
    const idx = e.detail.value
    const vin = this.data.vinList[idx]
    this.setData({
      vinIdx: idx,
      sub_vin: vin,              // 同步到输入框
      subTopic: `node_msg_topic/${vin}`
    })
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
  doDisconnect() {
    if (client && client.end) {
      client.end(true);   // true = 强制关闭
      client = null;
      this.setData({ connected: false });
      this.log('已手动断开');
    }
  },
  doConnect() {
    const { connected } = this.data;
    if (connected == true) {
      showToast("当前 已连接，如需要连接其它vin，请先断开连接")
      return
    }
    console.log('btn -> doconnect');

    // wx.showToast({ title: 'btn', icon: 'none' });
    const { sub_vin } = this.data
    if (!sub_vin) {
      wx.showToast({ title: '请先输入或选择 VIN', icon: 'none' })
      return
    }
    const subTopic = `node_msg_topic/${sub_vin}`
    this.setData({ subTopic })   // 保证页面显示正确

    if (client && client.connected) return

    const that = this

    const timeStr = Date.now().toString(36);          // 时间戳转 36 进制，较短
    const randStr = Math.random().toString(36).slice(2, 6); // 4 位随机
    const clientId_randan = app.globalData.clientId + `_${timeStr}_${randStr}`;

    client = mqtt.connect('wxs://monitor.xbrainnet.cn/mqtt', {
      clientId: clientId_randan,
      username: app.globalData.mqtt_username,
      password: app.globalData.mqtt_password,
      reconnectPeriod: 5000,
      connectTimeout: 5000
    })
    console.log("connect,self client_id:", clientId_randan)
    client.on('connect', () => {
      console.log('MQTT 已连接');
      this.setData({ connected: true }); // 连上
      wx.showToast({ title: 'MQTT 已连接', icon: 'success' })
      client.subscribe(subTopic, err => {
        if (!err) that.log(`开始已订阅`)
      })
    })

    client.on('message', (topic, payload) => {
      // that.log(`[${topic}] ${payload.toString()}`)
      const u8 = new Uint8Array(payload);
      var deMessage = node_pb.decode(u8);
      // console.log("接收到的protomsg :", this.convertLongToNumber(deMessage.basetime) , " , buffer 长度: ", u8.length);
      const logStr = ` basetime=${this.convertLongToNumber(deMessage.basetime)}  length=${u8.length}`;
      that.log(logStr);
    })

    client.on('error', err => {
      this.setData({ connected: false }); // 断开

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
    // const stamp = new Date().toLocaleTimeString('zh-CN', {
    //   hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit'
    // });
    const stamp = new Date().toLocaleTimeString('zh-CN', {
      hour12: true,
      hour: '2-digit',   // 12 小时双位
      minute: '2-digit',
      second: '2-digit'
    });

    const { logCounter, logs , log_max_cnt } = this.data;

    // 新纪录：带全局序号
    const newItem = `${logCounter + 1}. [${stamp}] ${str}`;

    // 倒序插入，只保留 10 条
    const newLogs = [newItem, ...logs].slice(0, log_max_cnt);

    this.setData({
      logs: newLogs,
      logCounter: logCounter + 1
    }, () => wx.pageScrollTo({ scrollTop: 0 }));
  }

})