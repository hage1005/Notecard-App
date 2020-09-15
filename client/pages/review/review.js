// pages/review/review.js
var app = getApp(); 
function getRandomArrayElements(arr, count) {//如果列表小于选项数，加上wyx❤️zkw
  while (count > arr.length) {
    arr.push("赵柯文❤️王逸馨");
  }
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: "",
    currentWord:"",
    words: [],
    answers: [],
    choices:[],
    index: 0,
    flag: true,
    flag2: false,
    iconTest: [true, true, true, true, true, true, true, true]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(this.data.flag){//首次加载
      console.log(options.currentPage)
      var currentPage = options.currentPage;
      
      this.setData({
        currentPage: options.currentPage
      })
      wx.showLoading({
        title: 'wyx么么哒',
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
                currentPage: currentPage
              },
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                //显示words console.log(res.data[0]); 
                //显示answers console.log(res.data[1]);
                var tempAnswers = res.data[1];
                var tempAnswers = getRandomArrayElements(tempAnswers, 4);
                  if (tempAnswers.indexOf(res.data[1][0]) == -1) {
                    var correctAnswerIndex = Math.floor(Math.random() * 4);
                  }
                  else {
                    var correctAnswerIndex = tempAnswers.indexOf(res.data[1][0]);
                  }
                tempAnswers[correctAnswerIndex] = res.data[1][0];
                if (res.data[0] == undefined || res.data[1] == undefined) {
                  wx.hideLoading();//如果用户表里面还没有东西
                }
              
                that.setData({
                  words: res.data[0],
                  answers: res.data[1],
                  wordsCount: res.data[0].length,
                  choices: tempAnswers,
                  currentWord: res.data[0][0] ,
                  correctAnswerIndex:correctAnswerIndex,
                  flag:false  //吧flag设置为false，只加载一次
                })
                wx.hideLoading();

              }
            })

          }
          else {
            console.log('登录失败！' + res.errMsg);
            wx.hideLoading();
          }            
        }
      });
    }
    //下面是对choices的修改
    if(this.data.flag2){
      var i=this.data.index;
      var tempAnswers = this.data.answers;
      i++;
      var tempAnswers = getRandomArrayElements(tempAnswers, 4);
        if(tempAnswers.indexOf(this.data.answers[i]) == -1){
          var correctAnswerIndex = Math.floor(Math.random() * 4);
        }
        else{
          var correctAnswerIndex = tempAnswers.indexOf(this.data.answers[i]);
        }
      tempAnswers[correctAnswerIndex]=this.data.answers[i];//有一个正确答案
      this.setData({
      choices: tempAnswers,
      currentWord:this.data.words[i],
      correctAnswerIndex: correctAnswerIndex,
      iconTest: [true, true, true, true, true, true, true, true],
      index: i,
      })
      console.log("现在的i是"+i);
    }
    this.setData({
      flag2:true//第一次不运行，第二次开始运行choices的修改
    })
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
  next:function(){
    this.onLoad();
  },
  judge: function(e){//判断用户选项是否正确
    var chosenIndex= e.currentTarget.dataset.index;
    var correctIndex= this.data.correctAnswerIndex;
    if (chosenIndex != correctIndex){//如果用户选择了错误的选项
      var temp = this.data.iconTest;
        if(chosenIndex==0){
          temp[1]=false;
          this.setData({
            iconTest: temp
          })
        }

      if (chosenIndex == 1) {
        temp[3] = false;
        this.setData({
          iconTest: temp
        })
      }

      if (chosenIndex == 2) {
        temp[5] = false;
        this.setData({
          iconTest: temp
        })
      }

      if (chosenIndex == 3) {
        temp[7] = false;
        this.setData({
          iconTest: temp
        })
      }
    }
    if (chosenIndex == correctIndex) {//如果用户选择了正确的选项
      var temp = this.data.iconTest;
      if (chosenIndex == 0) {
        temp[0] = false;
        this.setData({
          iconTest: temp
        })
      }

      if (chosenIndex == 1) {
        temp[2] = false;
        this.setData({
          iconTest: temp
        })
      }

      if (chosenIndex == 2) {
        temp[4] = false;
        this.setData({
          iconTest: temp
        })
      }

      if (chosenIndex == 3) {
        temp[6] = false;
        this.setData({
          iconTest: temp
        })
      }
    }
  }
})