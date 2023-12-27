function toChineseNum(num) {
  if (typeof num !== 'number') throw new Error('num is not a number')
  const numArr = Number.prototype.toString
    .call(num)
    .replace(/(?=(\d{4})+$)/g, ',')
    .split(',')
    .filter(Boolean)

  let resultStr = ''
  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const units = ['', '十', '百', '千']
  const bigUnits = ['', '万', '亿']

  function _transform(numberStr) {
    let result = ''
    for (let i = 0; i < numberStr.length; i++) {
      const digit = +numberStr[i]
      const c = chars[digit]
      const u = units[numberStr.length - 1 - i]
      // todo
      if (digit === 0) {
        if (result[result.length - 1] !== chars[0]) {
          result += c
        }
      } else {
        // 针对 十 开头的数字
        if (digit === 1 && u === '十' && i === 0) result += u
        else result += c + u
        // result += c + u
      }
    }
    if (result[result.length - 1] === chars[0]) {
      result = result.slice(0, -1)
    }

    return result
  }
  numArr.forEach((numStr, i) => {
    const part = numStr
    const c = _transform(part)
    const u = c ? bigUnits[numArr.length - i - 1] : ''

    resultStr += c + u
  })

  console.log(resultStr)
  return resultStr
}

toChineseNum(112)
// 12,3123
