// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 父
  onContainerTap: function () {
    //console.log('onContainerTap')

    // 跳转到子页面，最多5级
    // 该跳转函数执行onHide，保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
    // wx.navigateTo({
    //   url: '../posts/posts',
    // })

    // 该跳转函数执行onUnload，关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
    // wx.redirectTo({
    //   url: '../posts/posts',
    // })

    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: '../posts/posts'
    })


  },
  // 子，冒泡事件：bindTap:点击子，子父都会触发;catchTap:点击子，不会触发父
  onSubTap: function () {
    //console.log("onSubTap");
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
    // console.log("welcome page is unload")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("welcome page is hide")
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