// images/addword.js.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage: options.currentPage
    })
    //console.log(this.data.currentPage+"is over here")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit: function (e) {
    var word = e.detail.value.word;
    var answer = e.detail.value.answer;
    var currentPage = this.data.currentPage;
    console.log(this.data.currentPage + "是currentPage")
    var that = this;
    
    if (word && answer) {//如果用户输入了东西
      wx.showLoading({
        title: '加载中',
      }),
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              console.log(res.code+"是发送的代码")
              
              wx.request({
                url: 'https://chikeshi.applinzi.com/wechat/createUserTable.php',
                data: {
                  code: res.code,
                  nickName: app.globalData.nickName,
                  word: word,
                  answer: answer,
                  currentPage: currentPage
                },
                method: 'POST',
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                  console.log(res);
                  wx.hideLoading();
                  //提交后隐藏表单
                  that.setData({
                    inputValue: ''//将data的inputValue清空

                  })
                }
              })
            }
            else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });

    }
    else {
      wx.showToast({
        title: '不能为空或您未更改',
        icon: 'none',
        duration: 2000
      });
    }
  }
})