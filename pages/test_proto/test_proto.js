const protobuf = require('../../proto/tools/weichatPb/protobuf.js');

var  node_js = require('../../proto/starj_proto/brain_net_data_v5.js');
var NodeRoot = protobuf.Root.fromJSON(node_js);

var  dispatch_js = require('../../proto/starj_proto/dispatch_msg');
var DispatchRoot = protobuf.Root.fromJSON(dispatch_js);




function connectWebSocket(page) {
  const socketTask = wx.connectSocket({
    // url: 'wss://zq159840gp6.vicp.fun',
    url: 'ws://127.0.0.1:8765',  // 改为本地地址
    success: function (res) {
      console.log('WebSocket连接成功');
    },
    fail: function (err) {
      console.error('WebSocket连接失败', err);
      // 可以在这里添加重连逻辑
      setTimeout(() => {
        connectWebSocket(page);
      }, 3000);
    }
  });

  // 监听WebSocket连接打开事件
  socketTask.onOpen(function (res) {
    console.log('WebSocket连接已打开');
    //////////////////////
    // const node_payload = new node_pb.brain_node_data();   // 或 pb.LoginReq.create()
    // node_payload.basetime = 123
    // const u8      = node_pb.brain_node_data.encode(node_payload).finish();
    // const ab      = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
    //////////////////////
    // const node_payload = new node_pb.vector_type();   // 或 pb.LoginReq.create()
    // node_payload.x = 1.2 
    // const u8 = node_pb.vector_type.encode(node_payload).finish();

    // const ab = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);

    var node_pb = NodeRoot.lookupType("brain_net_data_v3.brain_node_data");
    var node_msg = node_pb.create(); // 创建空对象
    node_msg.basetime = 11
    var buffer = node_pb.encode(node_msg).finish();

    //////////////////////
    socketTask.send({ data: buffer, success: () => console.log('LoginReq 已发送') });
  });

  // 监听WebSocket接收消息事件
  socketTask.onMessage(function (res) {
    console.log('~~~~接收到服务器消息:', res.data);
    const u8 = new Uint8Array(res.data);      // 转成 Uint8Array
    var node_pb = NodeRoot.lookupType("brain_net_data_v3.brain_node_data");
    var deMessage = node_pb.decode(u8);
    console.log("接收到的protomsg :", deMessage);

    ///////////////////////////
  });

  // 监听WebSocket关闭事件
  socketTask.onClose(function (res) {
    console.log('WebSocket连接已关闭', res);
    page.setData({
      websocketStatus: 'closed'
    });
  });

  // 监听WebSocket错误事件
  socketTask.onError(function (err) {
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
  convertLongToNumber(longObj) {
    if (longObj && typeof longObj === 'object' && 'low' in longObj) {
      return longObj.low + (longObj.high * 0x100000000);
    }
    return longObj;
  },
  
  btn_funtion() {
    console.log("btn click")
    
    var dispatch_info_pb = NodeRoot.lookupType("starj_dispatch.dispatch_info");
    var dispatch_info_msg = dispatch_info_pb.create(); // 创建空对象
    dispatch_info_msg.max_speed = 1.2

    var car_info_type_pb = NodeRoot.lookupType("starj_dispatch.car_info_type");
    var car_info_type_msg = car_info_type_pb.create(); // 创建空对象
    car_info_type_msg.basetime = 11111;
    car_info_type_msg.carVin = "aaaaaaaaaaa";
    car_info_type_msg.cloudTime = 1111112123;
    
    var dispatch_info_type_pb = NodeRoot.lookupType("starj_dispatch.dispatch_info_type");
    var dispatch_info_type_msg = dispatch_info_type_pb.create(); // 创建空对象
    // dispatch_info_msg.command = 1
    dispatch_info_type_msg.dispatchStatus = dispatch_info_msg
    dispatch_info_type_msg.others = []
    dispatch_info_type_msg.others.push(car_info_type_msg);
    console.log("~~~~~~dispatch_info_type_msg~~:",dispatch_info_type_msg)
    var dispatch_info_type_pb_buffer = dispatch_info_type_pb.encode(dispatch_info_type_msg).finish();
    var aaaaaaaaaaa = dispatch_info_type_pb.decode(dispatch_info_type_pb_buffer);
    console.log("~~~~~aaaaaaaaaaa~~:",aaaaaaaaaaa)
    console.log('dispatch_info_type_pb_buffer序列化后字节长度 =', dispatch_info_type_pb_buffer.length);

    var task_status_info_pb = NodeRoot.lookupType("brain_net_data_v3.task_status_info");
    var task_status_info_msg = task_status_info_pb.create(); // 创建空对象
    task_status_info_msg.taskId = 1
    task_status_info_msg.dispatchInfo = dispatch_info_type_msg

    var node_pb = NodeRoot.lookupType("brain_net_data_v3.brain_node_data");
    var node_msg = node_pb.create(); // 创建空对象
    node_msg.basetime = 123
    node_msg.taskStatus = task_status_info_msg
    console.log("node_msg   :",node_msg)

    // encode 
    var buffer = node_pb.encode(node_msg).finish();
    console.log('序列化后字节长度 =', buffer.length);
    //decode
    var deMessage = node_pb.decode(buffer);
    console.log("deMessage:", deMessage);

  }, 
  onLoad() {
    this.socketTask = connectWebSocket(this);
    
    // this.btn_funtion()
  }
})