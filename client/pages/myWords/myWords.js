// pages/myWords/myWords.js
var app = getApp(); 
function initUnfold(){

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage:"",
    words:[],
    answers:[],
    unfold:[],
    wordsCount:100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var currentPage = options.currentPage;
    this.setData({
      currentPage: options.currentPage
    })
    wx.showLoading({
      title: 'wyx么么哒' ,
    }),

      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://chikeshi.applinzi.com/wechat/loadWords.php',
              data: {
                code: res.code,
                nickName: app.globalData.nickName,
                currentPage: currentPage
              }, 
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
               
                console.log(res.data);
                if (res.data==undefined || res.data==undefined){
                  wx.hideLoading();//如果用户表里面还没有东西
                  console.log("表里面没有东西")
                }
                else{
                  var temp=[];
                  for(var i=0;i<res.data[0].length;i++){
                      temp[i]=true;//所有unfold为true
                  }
                  that.setData({
                    words: res.data[0],
                    answers: res.data[1],
                    unfold: temp,
                    wordsCount: res.data[0].length
                  })
                  wx.hideLoading();
                }  
              }
            })

          }
          else {
            console.log('登录失败！' + res.errMsg);
            wx.hideLoading();

          }
        }


      });
   // console.log(this.data.currentPage+"ishere")
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
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://chikeshi.applinzi.com/wechat/loadWords.php',
            data: {
              code: res.code,
              nickName: app.globalData.nickName,
              currentPage: that.data.currentPage
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {

              console.log(res.data);
              console.log(res);
              if (res.data == undefined || res.data == undefined) {
                wx.hideLoading();//如果用户表里面还没有东西
                console.log("表里面没有东西")
              }
              else {
                var temp = [];
                for (var i = 0; i < res.data[0].length; i++) {
                  temp[i] = true;//所有unfold为true
                }
                that.setData({
                  words: res.data[0],
                  answers: res.data[1],
                  unfold: temp,
                  wordsCount: res.data[0].length
                })
                wx.hideLoading();
              }
            }
          })

        }
        else {
          console.log('登录失败！' + res.errMsg);
          wx.hideLoading();

        }
      }


    });
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
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
          wx.request({
            url: 'https://chikeshi.applinzi.com/wechat/loadWords.php',
            data: {
              code: res.code,
              nickName: app.globalData.nickName,
              currentPage: that.data.currentPage
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {

              console.log(res.data);
              console.log(res);
              if (res.data == undefined || res.data == undefined) {
                wx.hideLoading();//如果用户表里面还没有东西
                console.log("表里面没有东西")
              }
              else {
                var temp = [];
                for (var i = 0; i < res.data[0].length; i++) {
                  temp[i] = true;//所有unfold为true
                }
                that.setData({
                  words: res.data[0],
                  answers: res.data[1],
                  unfold: temp,
                  wordsCount: res.data[0].length
                })
                wx.hideLoading();
              }
            }
          })

        }
        else {
          console.log('登录失败！' + res.errMsg);
          wx.hideLoading();

        }
      }


    });
    wx.stopPullDownRefresh();
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
  revealAnswers: function (e) {//fold/unfodl
    var temp = [];
    for (var i = 0; i < this.data.wordsCount; i++) {
      temp[i] = true;//所有unfold为true
    }
    if (this.data.unfold[e.currentTarget.dataset.index] == false) {
      this.setData({
        unfold: temp
      })
    }
    else {
      temp[e.currentTarget.dataset.index] = false;
      this.setData({
        unfold: temp
      })
    }
  },
  deleteWord: function(e){
    var wordName = e.currentTarget.dataset.word;
    var tableName = this.data.currentPage;
    var that=this;
    console.log(wordName+" in "+tableName);
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code);
          wx.request({
            url: 'https://chikeshi.applinzi.com/wechat/deleteWord.php',
            data: {
              code: res.code,
              nickName: app.globalData.nickName,
              tableName: tableName,
              wordName: wordName
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res);
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              //that.onLoad();
            }
          })
        }
        else {
          console.log('登录失败！' + res.errMsg)
          wx.showToast({
            title: '失败',
            icon: 'success',
            duration: 2000
          })
        }
      }
    });
  }
})