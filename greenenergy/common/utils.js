//现网正式环境
const BASEURL = "https://www.mazsn.cn/mazsnexample"
const BASEURLImg = "http://www.mazsn.cn"
//const BASEURL = "http://121.4.58.57:8080/mazsnexample"
/**
 * 时间戳返回 时:分:秒 \
 * */
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return [hour, minute, second]
    .map(function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    })
    .join(':')
}
/**
 * 地址位置保留两位有效数组
 * */
function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.'),
  }
}
/**
 * 时间显示形式由humanize、format、parse三种方法
 * */
var dateUtils = {
  UNITS: {
    年: 31557600000,
    月: 2629800000,
    天: 86400000,
    小时: 3600000,
    分钟: 60000,
    秒: 1000,
  },
  humanize: function (milliseconds) {
    var humanize = ''
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前'
        break
      }
    }
    return humanize || '刚刚'
  },
  format: function (dateStr) {
    var date = this.parse(dateStr)
    var diff = Date.now() - date.getTime()
    if (diff < this.UNITS['天']) {
      return this.humanize(diff)
    }
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    return (
      date.getFullYear() +
      '/' +
      _format(date.getMonth() + 1) +
      '/' +
      _format(date.getDay()) +
      '-' +
      _format(date.getHours()) +
      ':' +
      _format(date.getMinutes())
    )
  },
  parse: function (str) {
    //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/)
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
  },
}

/**
 * 字符串转码
 * 微信上需要引用common中的base64.js
 * */
var transStr = {
  /**
   * 将字符串转成64位编码
   * */
  encodeBs64: function (str) {
    // 对字符串进行编码
    var encode = encodeURI(str)
    // 对编码的字符串转化base64
    var base64 = btoa(encode)
    return base64
  },
  /**
   * 将64位编码转成字符串
   * */
  decode: function (base64) {
    // 对base64转编码
    var decode = atob(base64)
    // 编码转字符串
    var str = decodeURI(decode)
    return str
  },
}


module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  dateUtils: dateUtils,
  transStr: transStr,
  BASEURL: BASEURL,
  BASEURLImg:BASEURLImg
}
