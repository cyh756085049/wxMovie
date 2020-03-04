const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 把星星✨的值转化为数组形式：[1,1,1,0,0]
function convertStarToArray(stars) {
  var array = [];
  var num = stars.toString().substring(0,1);
  // var num2 = stars.substring(1,2);
  for (var i = 1; i<=5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0)
    }
  }
  return array;
}

function covertToCastString(casts) {
  var castsjoin = "";
  for (var index in casts) {
    castsjoin = castsjoin + casts[index].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function covertToCastsInfo(casts) {
  var castsArray = [];
  for (var index in casts) {
    var cast = {
      img: casts[index].avatars ? casts[index].avatars.large : "",
      name: casts[index].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

// 获取请求
function http(url, callback) {
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
     callback(res.data)
    },
    fail: function (res) {
      console.log("fail")
    },
  })
}

module.exports = {
  formatTime: formatTime,
  convertStarToArray: convertStarToArray,
  http: http,
  covertToCastString: covertToCastString,
  covertToCastsInfo: covertToCastsInfo
}
