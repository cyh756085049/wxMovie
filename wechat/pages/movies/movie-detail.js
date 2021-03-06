var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    var detailUrl = app.globalData.doubanBaseUrl + "/v2/movie/subject/" + movieId;
    util.http(detailUrl, this.processMovieData);
  },

  processMovieData: function(data) {
    console.log(data)
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      id: "",
      name: ""
    }
    if (data.directors[0]!=null ) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movieDetail = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentsCount: data.comments_count,
      year: data.year,
      genres: data.genres.join("、"),
      stars: util.convertStarToArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.covertToCastString(data.casts),
      castsInfo: util.covertToCastsInfo(data.casts),
      summary: data.summary
    }
    this.setData({
      movieDetail: movieDetail
    })
  },

  // 查看大图
  viewMoviePostImg: function(event) {
    var src = event.currentTarget.dataset.src;
    // 在新页面中全屏预览图片
    wx.previewImage({
      current: src,
      urls: [src],
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