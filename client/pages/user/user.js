// pages/user/user.js
var app = getApp();
function initUnfold() {
  return [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
};

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    deck:[],
    showForm: true,
    unfold: initUnfold(),
    renameUnfold: initUnfold()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this;
    wx.setNavigationBarTitle({
      title: '我的单词'
    })
    wx.showLoading({
      title: 'Loading',
    }),
    
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
           wx.request({
            url: 'https://chikeshi.applinzi.com/wechat/loaddeck.php',
             data: {
               code: res.code
             },
             method: 'POST',
             header: {
               "content-type": "application/x-www-form-urlencoded"
             },
            success: function (res) {
             var rawdata=res.data;
              that.setData({
               deck: rawdata
              })
              wx.hideLoading();
            console.log(res.data);
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
  //下拉刷新
onPullDownRefresh: function () {
    this.onLoad();
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
  /*显示和隐藏添加表*/
  setForm: function(){
    this.setData({
      showForm: !this.data.showForm
    })
  },
  formReset: function () {
    this.setData({
      showForm: !this.data.showForm
    })
  },
  formSubmit: function (e) {
    var tableName = e.detail.value.name
    //提交后隐藏表单
    this.setData({
      showForm: !this.data.showForm,
      inputValue: ''//将data的inputValue清空
     
    })
    if(tableName){//如果用户输入了东西
      wx.showLoading({
        title: 'Loading',
      }),
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            console.log(res.code)
            wx.request({
              url: 'https://chikeshi.applinzi.com/wechat/createTable.php',
              data:{
                code: res.code,
                nickName: app.globalData.nickName,
                tableName: tableName
              },
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                var rawdata = res.data;
                console.log(rawdata)
                if (getCurrentPages().length != 0) {
                  //刷新当前页面的数据
                  getCurrentPages()[getCurrentPages().length - 1].onLoad()
                }
                wx.hideLoading();
              }
            })
          }
          else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
      
    }
    else{
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 1000
      });
    }
  },
    revealChoices: function(e){//fold/unfodl
      var temp = initUnfold();
      if (this.data.unfold[e.currentTarget.dataset.index]==false){
        this.setData({
          unfold: temp,
          renameUnfold:temp
        })
      }
      else{
        temp[e.currentTarget.dataset.index]=false;
        this.setData({
          unfold: temp,
          renameUnfold: initUnfold()

        })
      }
    },
    review: function(){
      wx.navigateTo({
        url: "../review/review?currentPage={{item}}",
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    deleteDeck: function(e){
      var tableName=e.currentTarget.dataset.name;
      var that=this;
      wx.showModal({
        title: '删除词表',
        content: '确定删除'+tableName+"吗？",
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定');
            wx.login({
              success: function (res) {
                if (res.code) {
                  //发起网络请求
                  console.log(res.code);
                  wx.request({
                    url: 'https://chikeshi.applinzi.com/wechat/dropTable.php',
                    data: {
                      code: res.code,
                      nickName: app.globalData.nickName,
                      tableName: tableName
                    },
                    method: 'POST',
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                      console.log("deleted");
                      wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000
                      })
                      that.onLoad();
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
          else {//这里是点击了取消以后

            console.log('用户点击取消');
            wx.showToast({
              title: '已取消',
              icon: 'none',
              duration: 1000
            })
          }

        }

      })
    },
    renameDeck: function(e){
      var temp = initUnfold();
      if (this.data.renameUnfold[e.currentTarget.dataset.index] == false) {
        this.setData({
          renameUnfold: temp
        })
      }
      else {
        temp[e.currentTarget.dataset.index] = false;
        this.setData({
          renameUnfold: temp
        })
      }
    },
  renameformReset: function () {
    this.setData({
      renameUnfold: initUnfold()
    })
  },
  renameformSubmit: function (e) {
    var newTableName = e.detail.value.newname
    var oldTableName = e.currentTarget.dataset.oldname
    console.log("old: "+oldTableName+" new: "+ newTableName);
    //提交后隐藏表单
    this.setData({
      renameUnfold: initUnfold(),
      inputValue: ''//将data的inputValue清空

    })
    if (newTableName) {//如果用户输入了东西
      wx.showLoading({
        title: 'Loading',
      }),
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              console.log(res.code)
              wx.request({
                url: 'https://chikeshi.applinzi.com/wechat/renameTable.php',
                data: {
                  code: res.code,
                  nickName: app.globalData.nickName,
                  newTableName: newTableName,
                  oldTableName: oldTableName
                },
                method: 'POST',
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                  var rawdata = res.data;
                  console.log(rawdata)
                  if (getCurrentPages().length != 0) {
                    //刷新当前页面的数据
                    getCurrentPages()[getCurrentPages().length - 1].onLoad()
                  }
                  wx.hideLoading();
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
        title: '不能为空',
        icon: 'none',
        duration: 1000
      });
    }
  }
})

