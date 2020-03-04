var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchList: {},
    containerShow: true,
    searchPanelShow: false,
    value: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBaseUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBaseUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBaseUrl + "/v2/movie/top250" + "?start=0&count=3";

    // 传参数这块不太明白
    this.getMovieListData(inTheatersUrl, "inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon","即将上映");
    this.getMovieListData(top250Url, "top250","豆瓣Top250榜");
  
  },

  
  // 获取电影数据
  getMovieListData: function(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      data: '',
      header: {
        "Content-Type": "application/xml"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.processMovieData(res.data, settedKey, categoryTitle)
      },
      fail: function (res) { 
        console.log("fail")
      },
    })
  },

  // 取消搜索操作
  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchList: {},
      value: ""
    })
  },

  // 搜索框获取焦点操作
  onBindFocus: function(event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  // 搜索接口调用及绑定  接口不能用了 9-1,2
  onBindConfirm: function(event) {
    var text = event.detail.value;
    this.data.value = text;
    var searchUrl = app.globalData.doubanBaseUrl + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchList", "")
  },


  // 处理数据进行绑定
  processMovieData: function (data, settedKey, categoryTitle) {
    var movies = []
    for (var index in data.subjects) {
      var subject = data.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0,6) + "...";
      }
      var tmp = {
        stars: util.convertStarToArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(tmp)
      // 不太明白 7-14
      var readyData = {};
      readyData[settedKey] = {
        movies: movies,
        categoryTitle: categoryTitle
      };
      this.setData(readyData)
    }
  },

  // 跳转到更多页
  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category;
    console.log(category);
    wx.navigateTo({
      url: 'more-movies?category=' + category,
    })
  },

  // 跳转到电影详情页
  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: 'movie-detail?id=' + movieId,
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