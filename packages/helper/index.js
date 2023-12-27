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
 * @desc 获取操作系统类型
 * @return {String}
 */
export const getOS = function () {
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
 * @desc 防抖
 * @param {Function} fn
 * @param {Number} delay
 * @returns
 */
export function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    setTimeout(() => {
      fn.call(this, ...args)
      // fn.apply(this, args)
    }, delay)
  }
}

/**
 * @desc 节流
 * @param {Function} fn
 * @param {Number} time
 * @returns
 */
export function throttle(fn, time) {
  let start = 0
  return function (...args) {
    let now = new Date()
    if (now - start > time) {
      fn.call(this, ...args)
      // fn.apply(this, args)
      start = now
    }
  }
}
