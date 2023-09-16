export const isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}

export const isString = isType('String')

export const isArray = isType('Array')

export const isObject = isType('Object')

export const isFunction = isType('Function')

export const isNumber = isType('Number')

export const isPlainObject = function (obj) {
  let prototype
  return (
    isObject(obj) &&
    ((prototype = Object.getPrototypeOf(obj)),
    prototype === null || prototype === Object.getPrototypeOf({}))
  )
}

export const isPromise = function (obj) {
  return (
    !!obj && // 有实际含义的变量才执行方法,变量null, undefined和''空串都为false
    (typeof obj === 'object' || typeof obj == 'function') &&
    typeof obj.then === 'function'
  )
}

/**
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
export const arrayEqual = (arr1, arr2) => {
  if (arr1 === arr2) return true
  if (arr1.length != arr2.length) return false
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

/**
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 * @return {Boolean}
 */
export const hasClass = (ele, cls) => {
  return new RegExp('(\\s|^)' + cls + '(\\s|$)').test(ele.className)
}

/**
 * @desc   为元素添加class
 * @param  {HTMLElement} ele
 * @param  {String} cls
 */
export const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls
  }
}

/**
 * @desc 为元素移除class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @desc 根据name读取cookie
 * @param  {String} name
 * @return {String}
 */
export const getCookie = (name) => {
  const arr = document.cookie.replace(/\s/g, '').split(';')
  for (let i = 0; i < arr.length; i++) {
    const tempArr = arr[i].split('=')
    if (tempArr[0] == name) {
      return decodeURIComponent(tempArr[1])
    }
  }
  return ''
}

/**
 * @desc 根据name删除cookie
 * @param  {String} name
 */
export const removeCookie = (name) => {
  // 设置已过期，系统会立刻删除cookie
  setCookie(name, '1', -1)
}

/**
 * @desc  设置Cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
export const setCookie = (name, value, days) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  document.cookie = name + '=' + value + ';expires=' + date
}

/**
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
export const getExplore = () => {
  let sys = {},
    ua = navigator.userAgent.toLowerCase(),
    s
  ;(s = ua.match(/rv:([\d.]+)\) like gecko/))
    ? (sys.ie = s[1])
    : (s = ua.match(/msie ([\d\.]+)/))
    ? (sys.ie = s[1])
    : (s = ua.match(/edge\/([\d\.]+)/))
    ? (sys.edge = s[1])
    : (s = ua.match(/firefox\/([\d\.]+)/))
    ? (sys.firefox = s[1])
    : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
    ? (sys.opera = s[1])
    : (s = ua.match(/chrome\/([\d\.]+)/))
    ? (sys.chrome = s[1])
    : (s = ua.match(/version\/([\d\.]+).*safari/))
    ? (sys.safari = s[1])
    : 0
  // 根据关系进行判断
  if (sys.ie) return 'IE: ' + sys.ie
  if (sys.edge) return 'EDGE: ' + sys.edge
  if (sys.firefox) return 'Firefox: ' + sys.firefox
  if (sys.chrome) return 'Chrome: ' + sys.chrome
  if (sys.opera) return 'Opera: ' + sys.opera
  if (sys.safari) return 'Safari: ' + sys.safari
  return 'Unkonwn'
}

/**
 * @desc 获取操作系统类型
 * @return {String}
 */
export const getOS = () => {
  const userAgent =
    ('navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase()) || ''
  const vendor =
    ('navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase()) || ''
  const appVersion =
    ('navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase()) || ''
  if (/mac/i.test(appVersion)) return 'MacOSX'
  if (/win/i.test(appVersion)) return 'windows'
  if (/linux/i.test(appVersion)) return 'linux'
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
  if (/android/i.test(userAgent)) return 'android'
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}

/**
 * @desc 获取滚动条距顶部的距离
 */
export const getScrollTop = () => {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
}

/**
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
export const offset = (ele) => {
  const pos = {
    left: 0,
    top: 0
  }

  while (ele) {
    pos.left += ele.offsetLeft
    pos.top += ele.offsetTop
    ele = ele.offsetParent
  }
  return pos
}

const requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

/**
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to
 * @param {Number} duration
 */
export const scrollTo = (to, duration) => {
  if (duration < 0) {
    setScrollTop(to)
    return
  }

  const diff = to - getScrollTop()
  if (diff === 0) return
  const step = (diff / duration) * 10
  requestAnimationFrame(function () {
    if (Math.abs(step) > Math.abs(diff)) {
      setScrollTop(getScrollTop() + diff)
      return
    }
    setScrollTop(getScrollTop() + step)
    if ((diff > 0 && getScrollTop() >= to) || (diff < 0 && getScrollTop() <= to)) {
      return
    }
    scrollTo(to, duration - 16)
  })
}

/**
 * @desc 设置滚动条距顶部的距离
 */
export const setScrollTop = (value) => {
  window.scrollTo(0, value)
  return value
}

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
export const deepClone = (values) => {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (null == values || 'object' != typeof values) return values

  // Handle Date
  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }

  // Handle Array
  if (values instanceof Array) {
    copy = []
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i])
    }
    return copy
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {}
    for (let attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr])
    }
    return copy
  }
  throw new Error("Unable to copy values! Its type isn't supported.")
}

/**
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
export const isEmptyObject = (obj) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false
  return !Object.keys(obj).length
}
