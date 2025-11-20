// // distance.js
var mqtt=require('../../utils/mqtt.min.js')
var client = null 


// WebSocket连接
function connectwebsocket(page) {
  const socketTask = wx.connectSocket({
    url: 'wss://zq159840gp6.vicp.fun',
    success: function(res) {
      console.log('WebSocket连接成功');
    },
    fail: function(err) {
      console.error('WebSocket连接失败', err);
    }
  });

  // 监听WebSocket连接打开事件
  socketTask.onOpen(function(res) {
    console.log('WebSocket连接已打开');
  });

  // 监听WebSocket接收消息事件
  socketTask.onMessage(function(res) {
    console.log('接收到服务器消息:', res.data);
    try {
      // 尝试解析为JSON
      const message = JSON.parse(res.data);
      if (message.distance) {
        console.log('接收到的距离:', message.distance);
        // 更新页面数据
        page.setData({
          distance: message.distance
        });
      }
    } catch (error) {
      // 如果解析失败，直接处理纯文本消息
      console.log('接收到的纯文本消息:', res.data);
      page.setData({
        receivedMessage: res.data
      });
      // 可以根据需要处理纯文本消息
    }
  });

  // 监听WebSocket关闭事件
  socketTask.onClose(function(res) {
    console.log('WebSocket连接已关闭');
  });

  // 监听WebSocket错误事件
  socketTask.onError(function(err) {
    console.error('WebSocket连接出错', err);
  });

  return socketTask;
}

function getDistance(ax, ay, bx, by) {
  const distance = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
  return distance;
}

// // 页面逻辑
Page({
  data: {
    ax: 0, // A点的X值
    ay: 0, // A点的Y值
    bx: 3, // B点的X值
    by: 4, // B点的Y值
    distance: 0 ,
    receivedMessage: '' // 接收到的消息
  },
  onLoad(){
    console.log('onload');
  },
  // 输入框绑定事件
  onAXInput(e) {
    this.setData({
      ax: parseFloat(e.detail.value)
    });
  },
  onAYInput(e) {
    this.setData({
      ay: parseFloat(e.detail.value)
    });
  },
  onBXInput(e) {
    this.setData({
      bx: parseFloat(e.detail.value)
    });
  },
  onBYInput(e) {
    this.setData({
      by: parseFloat(e.detail.value)
    });
  },

  // 计算距离
  calculateDistance() {
  
    const { ax, ay, bx, by } = this.data;
    const distance = getDistance(ax, ay, bx, by);
    this.setData({
      distance: distance.toFixed(2) // 保留两位小数
    });
  },
 
  /* ---------- 按钮回调 ---------- */
  publishTest() {

    this.socketTask = connectwebsocket(this);


    // if (!client || !client.connected) {
    //   wx.showToast({ title: 'MQTT未连接', icon: 'none' });
    //   return;
    // }
    // const msg = JSON.stringify({ ts: Date.now(), data: 'hello from mini-program' });
    // client.publish('/test', msg, { qos: 1 }, err => {
    //   if (err) {
    //     console.log('发布失败', err);
    //   } else {
    //     console.log('已发布 test/click', msg);
    //     wx.showToast({ title: '发布成功', icon: 'success' });
    //   }
    // });
  },


  scanCode: function() {
    wx.scanCode({
      scanType: ["qrCode"], // 只扫描二维码
      success: (res) => {
        console.log("扫描结果:", res.result);
        this.handleScanResult(res.result);
      },
      fail: (err) => {
        console.error("扫描失败:", err);
        wx.showToast({
          title: '扫描失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  handleScanResult: function(result) {
    // 根据扫描结果进行处理
    if (result) {
      // 示例：判断扫描结果是 URL 还是其他数据
      if (result.startsWith('http://') || result.startsWith('https://')) {
        // 如果是 URL，跳转到网页
        wx.navigateTo({
          url: '/pages/webview/webview?url=' + encodeURIComponent(result)
        });
      } else {
        // 如果是其他数据，显示提示
        wx.showToast({
          title: '扫描结果: ' + result,
          icon: 'none',
          duration: 2000
        });
      }
    } else {
      wx.showToast({
        title: '扫描结果为空',
        icon: 'none',
        duration: 2000
      });
    }
  },
  connectmqtt:function(){
        console.log('connectmqtt~~~~~~~~~~~');
        var that = this
      client = mqtt.connect('wxs://zq159840gp6.vicp.fun/mqtt', {
        clientId: 'weixintest',
        reconnectPeriod: 5000,
        connectTimeout: 5000
      });

      client.on('connect', () => {
        console.log('mqtt 服务器连接成功');
        // 订阅自己待会儿要发布的主题（可选）
        client.subscribe('/test', err => {
          if (!err) console.log('已订阅 test/click');
        });
      });


    //listen
    client.on('message', function(topic, message) {
      console.log('messag~~~~~~~~~~e: ',message.toString()  );
      that.setData({
        receivedMessage: message.toString()   // 直接显示原文
      });
    
    });
    
    client.on('error', (error) => {
        console.log('连接失败', error);
    });
  },

  mqtt_pub_msg() {
    const topic = '/test';           // 要发布的主题
    const payload = this.data.editText; // 用前面输入框里的文本当消息体
  
    if (!client || !client.connected) {
      wx.showToast({ title: 'MQTT 未连接', icon: 'none' });
      return;
    }
  
    // QoS 1 代表至少收到一次
    client.publish(topic, payload, { qos: 1 }, err => {
      if (err) {
        console.log('发布失败', err);
        wx.showToast({ title: '发布失败', icon: 'error' });
      } else {
        console.log(`已发布 topic=${topic}, payload=${payload}`);
        wx.showToast({ title: '发布成功', icon: 'success' });
      }
    });
  },

  //###################################//
  data: {
    editText: '这里可以放默认字符串', // ← 这就是你要的“编辑文本”
    /* 你原来的 ax、ay、distance … 继续留着 */
  },

  /* 输入框每次打字都会同步到 data */
  onEditTextInput(e) {
    this.setData({ editText: e.detail.value });
  },
  readText:function(){
    const str = this.data.editText; // 这就是你要的 string
    console.log('拿到的文本：', str);

    // 想干嘛就干嘛：弹窗 / 发网络请求 / 做计算 …
    wx.showToast({ title: `已拿到：${str}`, icon: 'none' });
  },


});