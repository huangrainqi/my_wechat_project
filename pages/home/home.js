// pages/home/home.js
const $root = require('../../proto/msg.js');
const $node_root = require('../../proto/brain_net_data_v5.js');
const pb = $root.pb
const node_pb = $node_root.brain_net_data_v3


function connectWebSocket(page) {
  const socketTask = wx.connectSocket({
    // url: 'wss://zq159840gp6.vicp.fun',
    url: 'ws://127.0.0.1:8765',  // 改为本地地址
    success: function(res) {
      console.log('WebSocket连接成功');
    },
    fail: function(err) {
      console.error('WebSocket连接失败', err);
      // 可以在这里添加重连逻辑
      setTimeout(() => {
        connectWebSocket(page);
      }, 3000);
    }
  });

  // 监听WebSocket连接打开事件
  socketTask.onOpen(function(res) {
    console.log('WebSocket连接已打开');
    //////////////////////
    // const node_payload = new node_pb.brain_node_data();   // 或 pb.LoginReq.create()
    // node_payload.basetime = 123
    // const u8      = node_pb.brain_node_data.encode(node_payload).finish();
    // const ab      = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
    //////////////////////
    const node_payload = new node_pb.vector_type();   // 或 pb.LoginReq.create()
    const u8      = node_pb.vector_type.encode(node_payload).finish();
    const ab      = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
    //////////////////////
    socketTask.send({ data: ab, success: () => console.log('LoginReq 已发送') });
  });

  // 监听WebSocket接收消息事件
  socketTask.onMessage(function(res) {
    console.log('~~~~接收到服务器消息:', res.data);
    ///////////////////////////
    // const u8  = new Uint8Array(res.data);      // 转成 Uint8Array
    // const rsp = node_pb.brain_node_data.decode(u8);        // 反序列化
    // console.log('收到 basetime =',rsp.basetime);
    ///////////////////////////
    const u8  = new Uint8Array(res.data);      // 转成 Uint8Array
    const rsp = node_pb.vector_type.decode(u8);        // 反序列化
    console.log('收到 basetime =',rsp.x);
    ///////////////////////////
  });

  // 监听WebSocket关闭事件
  socketTask.onClose(function(res) {
    console.log('WebSocket连接已关闭', res);
    page.setData({
      websocketStatus: 'closed'
    });
  });

  // 监听WebSocket错误事件
  socketTask.onError(function(err) {
    console.error('WebSocket连接出错', err);
    page.setData({
      websocketStatus: 'error'
    });
  });

  // 将socketTask保存到page中，方便其他地方使用
  page.socketTask = socketTask;
  page.setData({
    websocketStatus: 'connecting'
  });

  return socketTask;
}

Page({
  data: {
    result: ''
  },

  onLoad() {
    this.socketTask = connectWebSocket(this);
    console.log("~~~~~~~~~");



    const payload = new pb.LoginReq();   // 或 pb.LoginReq.create()

  // 2. 逐个字段赋值（名字必须和 .proto 里保持一致）
  payload.uid   = '123';
  payload.token = 'abc';
  console.log("msg:",payload)
    // const payload = pb.LoginReq.create({ uid: '123', token: 'abc' });
    const u8  = pb.LoginReq.encode(payload).finish();
    const ab  = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength); // 转 ArrayBuffer

  }


})