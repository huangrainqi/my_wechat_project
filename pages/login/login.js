// pages/login/login.js
Page({
  onShareAppMessage() {
    return {
      title: 'login_starj',
      path: '/pages/login/login',
      imageUrl: '/static/share.jpg' // 可选
    }
  },
  data: {
    username: '',
    password: '',
    showPassword: false,
    usernameError: '',
    passwordError: '',
    isFormValid: false,
    isLoading: false ,
    is_show: false 
  },
  onLoad() {
    // 约定：登录成功后把 token 或任意标记写到本地
    const hasLogin = wx.getStorageSync('hasLogin');
    if (hasLogin) {
      // 已经登录过，直接跳走
      wx.switchTab({ url: '/pages/starj/starj' });
    }
  },
  onUsernameInput(e) {
    const username = e.detail.value;
    this.setData({ username });
    this.validateForm();
  },

  onPasswordInput(e) {
    const password = e.detail.value;
    this.setData({ password });
    this.validateForm();
  },

  togglePassword() {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },

  validateForm() {
    const { username, password } = this.data;
    let usernameError = '';
    let passwordError = '';
    let isFormValid = false;

    // 用户名验证
    if (!username.trim()) {
      usernameError = '请输入用户名';
    } 

    // 密码验证
    if (!password) {
      passwordError = '请输入密码';
    } else if (password.length < 6) {
      passwordError = '密码至少6个字符';
    }

    // 表单整体验证
    if (!usernameError && !passwordError && username.trim() && password) {
      isFormValid = true;
    }

    this.setData({
      usernameError,
      passwordError,
      isFormValid
    });
  },

  formSubmit(e) {
    const { username, password } = e.detail.value;
    
    if (!this.data.isFormValid) {
      wx.showToast({
        title: '请填写正确的登录信息',
        icon: 'none'
      });
      return;
    }
    this.doLogin();
  },

  doLogin() {
    const { username, password } = this.data;
    if (username === 'test' ) {
      wx.showToast({title: '登录成功', icon: 'success'});
      wx.reLaunch({ url: '/pages/demo/demo' });
      
    } else if ( username == 'starj'){
      wx.showToast({title: '登录成功', icon: 'success'});
      wx.setStorageSync('hasLogin', true);
      // ★★★ 跳 tabBar 页必须用 switchTab ★★★
      wx.switchTab({url: '/pages/starj/starj'});

    }
    else {
      wx.showToast({title: '账号或密码错误', icon: 'error'});
    }
  }
})