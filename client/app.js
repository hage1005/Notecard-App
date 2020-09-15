//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  globalData: {
    userInfo: {},
    avatarUrl: '',
    nickName:''
  },
    onLaunch: function () {
      var that = this;
     /* wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            console.log(res.code)
            wx.request({
              url: '',
            })
          }
          else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });*/
      wx.authorize({
        scope: 'scope.userInfo',
        success(res) {
          console.log('授权成功')
        },
        fail() {
          console.log('授权失败')
        }
      })
      wx.getUserInfo({
        
        success: function (res) {
          that.globalData.userInfo= res.userInfo;
          that.globalData.avatarUrl= res.userInfo.avatarUrl;
          that.globalData.nickName= res.userInfo.nickName;
        }
      })
    }
})