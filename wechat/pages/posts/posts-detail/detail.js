// pages/posts/posts-detail/detail.js
var postsData = require('../../data/posts-data.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayImgMusic: false,
    currentPostsId:'',
    postsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   * 如果在onload方法中，不是异步的去执行一个数据绑定，则不需要使用this.setData方法
   * 只需要对this.data赋值即可实现数据绑定
   */
  onLoad: function (options) {
    var globalData = app.globalData;
    var postsId = options.id;
    // 为下边收藏获取ID
    this.currentPostsId = postsId;
    this.postsList = postsData.postslist;
    var detailData = postsData.postslist[postsId];
    this.setData({
      detailData: detailData
    });

    if (app.globalData.g_isPlayImgMusic && app.globalData.g_currentMusicPostId === postsId){
      this.setData({
        isPlayImgMusic: true
      }) 
    }
    this.setMusicMonitor();
    // 缓存 可以是string,Object，缓存最大上限不能超过10MB
    // wx.setStorageSync('key', '名称');
    // wx.setStorageSync('key', {
    //   title: "题目",
    //   name: "名称"
    // });
    // wx.setStorageSync('key1', {
    //   title: "题目",
    //   name: "名称"
    // })
  },

  setMusicMonitor: function(){
    // 播放音乐改变同下方的音乐播放暂停同步
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayImgMusic: true
      })
      app.globalData.g_isPlayImgMusic = true;
      app.globalData.g_currentMusicPostId = that.currentPostsId;
    }),
      wx.onBackgroundAudioPause(function () {
        that.setData({
          isPlayImgMusic: false
        })
      app.globalData.g_isPlayImgMusic = false;
      app.globalData.g_currentMusicPostId = null;
      }),
      wx.onBackgroundAudioStop(function () {
        that.setData({
          isPlayImgMusic: false
        })
        app.globalData.g_isPlayImgMusic = false;
        app.globalData.g_currentMusicPostId = null;
      })
  },

  // 异步缓存
  getPostsCollectedAsy: function(){
    var that = this;
    wx.getStorage({
      key: 'collectionstatus',
      success: function(res) {
        var postsCollected = res.data;
        var collection = postsCollected[that.currentPostsId];
        collection = !collection;
        postsCollected[that.currentPostsId] = collection;
        that.showToast(postsCollected, collection);
      },
    })
  },

  // 同步缓存
  getPostsCollectedSyc: function(){
    // 获取缓存中的数据
    var postsCollected = wx.getStorageSync("collectionstatus");
    // 通过文章ID获取对应点击的文章收藏状态
    var collection = postsCollected[this.data.currentPostsId];
    // 把收藏变未收藏，未收藏变收藏
    collection = !collection;
    // 把改变之后的收藏状态赋值给当前的缓存
    postsCollected[this.data.currentPostsId] = collection;
    // 提示信息
    this.showToast(postsCollected, collection);
    // 弹出模态框
    // this.showModal(postsCollected,collection);
  },

  // 收藏
  onCollectionTap: function(){
    this.getPostsCollectedSyc();
    // this.getPostsCollectedAsy();
  },
   // 弹出模态框
  showModal: function (postsCollected, collection){
    var that = this;
    wx.showModal({
      title: '收藏',
      content: collection?'收藏该文章？':'取消收藏该文章？',
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          // 更新文章是否被收藏的缓存值
          wx.setStorageSync('collectionstatus', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: collection
          })
        }
      }
    })
  },

  // 提示信息
  showToast: function (postsCollected, collection){
    // 更新文章是否被收藏的缓存值
    wx.setStorageSync('collectionstatus', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: collection
    })
    wx.showToast({
      title: collection ? '收藏成功' : '取消收藏',
      duration: 1000,
      icon: "success"
    })
  },

  // 分享信息
  onShareTap: function(){
    var itemList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        // cancle 用户是否点击了取消按钮
        // tabIndex 数组元素的序号，从0开始
        wx.showModal({
          title: itemList[res.tapIndex],
          content: '确认'+itemList[res.tapIndex] +'?',
          success: function(res){
            if(res.confirm){
              wx.showToast({
                title: '分享成功',
              })
            }else{
              wx.showToast({
                title: '取消分享',
              })
            }
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 播放音乐
  onMusicTap: function(){
    var postsData = this.postsList[this.currentPostsId];
    var isPlayImgMusic = this.data.isPlayImgMusic
    if (isPlayImgMusic){
      // 暂停
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayImgMusic: false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postsData.music.url,
        title: postsData.music.title,
        coverImgUrl: postsData.music.coverImg,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      this.setData({
        isPlayImgMusic: true
      })
    }
  },



  // onCollectionTap: function(){
  //   // 获取缓存
  //   var info = wx.getStorageSync('key');
  //   console.log(info)
  // },
  // onShareTap: function(){
  //   // 移除单个缓存
  //   // wx.removeStorageSync('key');
  //   // 清理所有缓存
  //   wx.clearStorageSync();
  // },

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
    
  }
})