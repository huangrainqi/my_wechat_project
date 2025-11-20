// pages/home/home.js
const pb = require('../../proto/message.js');

Page({
  data: {
    result: ''
  },

  onLoad() {
    console.log("~~~~~~~~~")
    if (pb.User) {
      console.log('直接使用 pb.User');
      
    }else{
      console.log('nnnnnnnn');

    }

    const PushMessage = pb['User']
    console.log('pb["User"]:', PushMessage);

  }
})