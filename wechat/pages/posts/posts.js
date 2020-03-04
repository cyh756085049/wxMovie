// pages/posts/posts.js
var postsData = require('../data/posts-data.js')
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
    //this.data.posts_key = postsData.postsList
    this.setData({
      post_key: postsData.postslist
    });
  },

  onDetailTap: function (event) {
    var postsId = event.currentTarget.dataset.postsId;
    console.log(postsId);
    wx.navigateTo({
      url: 'posts-detail/detail?id=' + postsId,
    })
  },

  // 单个点击跳转
  onSwiperItemTap: function(event){
    var postsId = event.currentTarget.dataset.postsId;
    console.log(postsId);
    wx.navigateTo({
      url: 'posts-detail/detail?id=' + postsId,
    })
  },

  // 冒泡
  onSwiperTap: function(event){
    // target 和 currentTarget
    // target指的是当前点击的组件，而currentTarget指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postsId = event.target.dataset.postsId;
    console.log(postsId);
    wx.navigateTo({
      url: 'posts-detail/detail?id=' + postsId,
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
    
  }
})
