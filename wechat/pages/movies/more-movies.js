// pages/movies/more-movies/more-movies.js
var app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: {},
    requestUrl: "",
    totalCount: 0,
    // 表示当前的movies变量是否为空
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch(category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBaseUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBaseUrl + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250榜":
        dataUrl = app.globalData.doubanBaseUrl + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processMovieData);
  },

  // 向下滑动加载更多
  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processMovieData);
    // 在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
  },

  // onReachBottom: function (event) {
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
  //   util.http(nextUrl, this.processMovieData);
  //   // 在当前页面显示导航条加载动画
  //   wx.showNavigationBarLoading();
  // },

  // 下拉刷新 有问题
  onPullDownRefresh: function(event) {
    console.log("刷新")
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processMovieData);
    // 在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
  },

  // 处理数据进行绑定
  processMovieData: function (data) {
    var movies = []
    for (var index in data.subjects) {
      var subject = data.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var tmp = {
        stars: util.convertStarToArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(tmp)
    }
    var totalMovies = {}
    // 加载更多的逻辑 有点不太明白
    // 如果要绑定新加载的数据，那么需要同旧有的数据绑定到一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
    this.data.totalCount += 20
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 设置动态标题
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  // 跳转到电影详情页
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: 'movie-detail?id=' + movieId,
    })
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