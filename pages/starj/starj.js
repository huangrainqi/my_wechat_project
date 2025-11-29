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
   // ① 分享给好友 / 群聊
   onShareAppMessage() {
    return {
      title: '自定义标题',
      path: '/pages/index/index',
      imageUrl: '/static/share.jpg' // 可选
    }
  },

  // ② 分享到朋友圈（需基础库 ≥ 2.11.3）
  onShareTimeline() {
    return {
      title: '朋友圈标题',
      query: 'from=timeline'
    }
  },
  data: {
    // vinList: app.globalData.vinList,
    vinIdx: 0,
    pubTopic: '',
    pubMsg: '{"msg":"hello"}',
    received: '',
    connected: false,
    logs: [],      // 最多 10 条
    log_max_cnt: 20,
    logCounter: 0,  // 全局序号
    showPub: false,   // 默认隐藏
    aliasListShow: [],
     // 选择相关
     carTypeList: [],   // 车型
     aliasList: [],     // 当前车型下的别名
     carTypeIdx: 0,     // 车型下标
     aliasIdx: 0,       // 别名下标
     selectShowText: '请选择车辆',  // 按钮文字
     sub_vin: ''        // 真正要用的 VIN
  },
  onShow() {
    console.log('starj页面show');
  },
  onHide() {
    console.log('starj页面hide');
   this.doDisconnect()
  },
  /* 1. 手输 VIN */
  onSubVinInput(e) {
    const vin = e.detail.value.trim()
    this.setData({
      sub_vin: vin,
      subTopic: vin ? `node_msg_topic/${vin}` : ''
    })
  },
  onVinPick(e) {
    const idx = e.detail.value;               // 下标
    // const vin = this.data.vinList[idx];       // 选中的 vin
    const topic = `node_msg_topic/${vin}`;    // 订阅 topic
    this.setData({
      vinIdx: idx,
      sub_vin: vin,      // 同步到输入框
      subTopic: topic    // 订阅用
    });
  },
  
  convertLongToNumber(longObj) {
    if (longObj && typeof longObj === 'object' && 'low' in longObj) {
      return longObj.low + (longObj.high * 0x100000000);
    }
    return longObj;
  },
 /* 修复后的 onColumnChange */
 onColumnChange(e) {
  const col = e.detail.column
  const idx = e.detail.value
  if (col === 0) {          // 车型变了
    const filtered = this._filterAlias(idx)
    this.setData({
      carTypeIdx: idx,
      aliasList: filtered.aliasList,
      aliasListShow: filtered.aliasListShow,
      aliasIdx: 0           // 第二列滚回第一项
    })
  } else {                  // 别名这一列也记录
    this.setData({ aliasIdx: idx })
  }
},

onPickerConfirm(e) {
  const [typeIdx, aliIdx] = e.detail.value
  this.setData({
    carTypeIdx: typeIdx,
    aliasIdx: aliIdx
  })
  this._confirmPick()
},_confirmPick() {
  const { aliasList, aliasIdx } = this.data
  if (!aliasList || !aliasList.length) return   // 空数组直接 return
  const fullKey = aliasList[aliasIdx] || aliasList[0]
  const vin = getApp().globalData.vinMap[fullKey]
  
  // 更新选择按钮文字和VIN值
  this.setData({
    selectShowText: `${fullKey} (${vin})`,
    sub_vin: vin,  // 确保这个值会同步到文本框
    subTopic: `node_msg_topic/${vin}`
  })
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
    const app = getApp()
    const { carTypeList, vinMap } = app.globalData
  
    // 使用修复后的 _filterAlias 方法获取初始数据
    const filtered = this._filterAlias(0)
  
    this.setData({
      carTypeList,
      aliasList: filtered.aliasList,
      aliasListShow: filtered.aliasListShow,
      vinMap
    }, () => this._confirmPick())
  },

  /* 根据车型下标，过滤出对应的别名数组 */
  _filterAlias(carTypeIdx) {
    const app = getApp()
    const type = app.globalData.carTypeList[carTypeIdx] // 例 'CR3'
    const fullKeys = app.globalData.aliasList.filter(k => {
      const [kType] = k.split('-') // 取出车型部分
      return kType === type
    })
  
    const map = app.globalData.vinMap
  
    const showList = fullKeys.map(k => {
      const alias = k.replace(type + '-', '')
      return `${alias} (${map[k]})`
    })
  
    return {
      aliasList: fullKeys,
      aliasListShow: showList
    }
  },
  /* 第一列：选车型 */
  bindCarTypeChange(e) {
    const col = e.detail.column
    const idx = e.detail.value
    if (col === 0) {          // 第一列变了才处理
      this.setData({
        carTypeIdx: idx,
        aliasList: this._filterAlias(idx),
        aliasIdx: 0            // 关键：第二列滚回 0
      })
      this._confirmPick()     // 立即把 VIN 算出来
    }
  },

  /* 第二列：选别名 */
  bindAliasChange(e) {
    this.setData({ aliasIdx: +e.detail.value })
    this._confirmPick()
  },

  /* 统一把选中的「车型-别名」-> VIN */
  _confirmPick() {
    const { aliasList, aliasIdx } = this.data
    if (!aliasList || !aliasList.length) return   // 空数组直接 return
    const fullKey = aliasList[aliasIdx] || aliasList[0]
    const vin = getApp().globalData.vinMap[fullKey]
    this.setData({
      selectShowText: `${fullKey} (${vin})`,
      sub_vin: vin,
      subTopic: `node_msg_topic/${vin}`
    })
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
    if (client) {
      client.end(true);   // true = 强制关闭
      client = null;
      this.setData({ connected: false });
      this.log('已手动断开');
    }
  },
  doConnect() {
    const { connected } = this.data;
    if (connected == true) {
    console.log("当前已连接，如需要连接其它vin，请先断开连接")

      wx.showToast({ title: '当前已连接，如需要连接其它vin，请先断开连接', icon: 'none' })
      return
    }
    console.log('btn -> doconnect');

    const { sub_vin } = this.data;
    const trimmedVin = sub_vin ? sub_vin.trim() : '';
    if (!trimmedVin) {
      wx.showToast({ title: '请先输入或选择 VIN 码 ', icon: 'none' });
      return;
    }
    const subTopic = `node_msg_topic/${sub_vin}`
    console.log("订阅的vin码是:",subTopic)
    this.setData({ subTopic })   // 保证页面显示正确
    if (client && client.connected) return
    const that = this
    // const timeStr = Date.now().toString(36);          // 时间戳转 36 进制，较短
    // const randStr = Math.random().toString(36).slice(2, 6); // 4 位随机
    // const clientId_randan = app.globalData.clientId + `_${timeStr}_${randStr}`;

    client = mqtt.connect('wxs://monitor.xbrainnet.cn/mqtt', {
      clientId: app.globalData.clientId,
      username: app.globalData.mqtt_username,
      password: app.globalData.mqtt_password,
      reconnectPeriod: 5000,
      connectTimeout: 5000
    })
    console.log("connect,self client_id:", app.globalData.clientId)
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
      var bmsSoc = deMessage.chasisData.chassisDiagnosis.bmsSoc ; 
      var taskId = deMessage.taskStatus.taskId ; 
      var VehicleStatus = deMessage.taskStatus.VehicleStatus ;   // 0.空闲 3. 达到目地的(规控单路线终点)
      var taskStatus = deMessage.taskStatus.taskStatus ; // (0.空闲 1.运送中 2.达到途经点 3.完成任务)
      var isTrapped = deMessage.taskStatus.isTrapped ; 
      var taskMode = deMessage.taskStatus.taskMode ; 

      var vehConntrolIsStop = deMessage.taskStatus.vehConntrolStopStatus.vehConntrolIsStop ; 
      var isStopByHotkeyStatus = deMessage.taskStatus.vehConntrolStopStatus.isStopByHotkeyStatus ; 
      var schedulingStatus = deMessage.taskStatus.vehConntrolStopStatus.schedulingStatus ; 

      var longitude = deMessage.carInfo.brainGps.longitude ; 
      var latitude = deMessage.carInfo.brainGps.latitude ; 
      var gpsStatus = deMessage.carInfo.brainGps.gpsStatus ; // gps 初始化 0 为失败, 1为成功
      var positionCovarianceType = deMessage.carInfo.brainGps.positionCovarianceType ;  //浮点解 等于3正常
      // var horn = deMessage.taskStatus.vehStateInTask.horn ; 
      // var clean = deMessage.taskStatus.vehStateInTask.clean ; 

      var rdmodulecom_1State = deMessage.taskStatus.smSignal.rdmodulecom_1State ; 
// 任务完成状态：
// 0: 空闲 1: 任务完成 2: 任务中
    var rdmodulecom_2State = deMessage.taskStatus.smSignal.rdmodulecom_2State ; 
    // 值   状态名称                             说明
    // 0    NORMAL                             正常状态
    // 1    LOCATION_NOT_READY                 定位未就绪
    // 2    MAP_NOT_READY                      地图未就绪
    // 3    REFERENCE_LINE_NOT_READY           参考线未就绪
    // 4    PARKING_SLOT_OCCUPIED              停车位被占用
    // 5    EMERGENCY_STOP                     紧急停车
    // 6    COLLISION_BOUNDARY                 碰撞边界
    // 7    FAR_AWAY_FROM_REFERENCE_LINE       远离参考线
    // 8    DESTINATION_OCCUPIED               目标点被占用
    // 9    ROAD_OCCUPIED                      道路被占用
    // 10   MAP_NOT_MATCHED                    地图不匹配
    // 11   FAR_AWAY_FROM_TARGET_POINT         远离目标点
    // 12   TRAPPED                            车辆被困
      var rdmodulecom_3State = deMessage.taskStatus.smSignal.rdmodulecom_3State ;
// # 清扫状态： 
// # 0: 不清扫 1: 清扫
      var rdmodulecom_4State = deMessage.taskStatus.smSignal.rdmodulecom_4State ;
// 当前任务类型：
// 值   状态名称                             说明
// -1   DEFAULT                            默认值
// 0    PATH                               沿路径行驶
// 1    EDGE_SWEEPING                      贴边清扫
// 2    COVERAGE_SWEEPING                  覆盖清扫
// 3    ORIENTED_POI                       有向POI泊入
// 4    PARKING                            泊车
// 5    ADJUST_ORIENTATION                 调整朝向
// 6    PATH_SWEEPING                      路径清扫

const logs_temp = [
  `bmsSoc = ${bmsSoc}`,
  `taskId = ${taskId}`,
  `VehicleStatus = ${VehicleStatus}  （0.空闲 3. 达到目地的(规控单路线终点) `,
  `taskStatus = ${taskStatus}   (0.空闲 1.运送中 2.达到途经点 3.完成任务)` ,
  `isTrapped = ${isTrapped}`,
  `taskMode = ${taskMode}`,
  `vehConntrolIsStop = ${vehConntrolIsStop}`,
  `isStopByHotkeyStatus = ${isStopByHotkeyStatus}`,
  `schedulingStatus = ${schedulingStatus}`,
  `longitude = ${longitude}`,
  `latitude = ${latitude}`,
  `gpsStatus = ${gpsStatus}  （gps 初始化 0 为失败, 1为成功） `,
  `positionCovarianceType = ${positionCovarianceType} （浮点解 等于3正常）`,
  `rdmodulecom_1State = ${rdmodulecom_1State}`,
  `rdmodulecom_2State = ${rdmodulecom_2State}`,
  `rdmodulecom_3State = ${rdmodulecom_3State}`,
  `rdmodulecom_4State = ${rdmodulecom_4State}`
];
    const log_str = '\n'+ logs_temp.join('\n');
      // const logStr = ` basetime=${this.convertLongToNumber(deMessage.basetime)}  length=${u8.length}`;
      that.log(log_str);
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