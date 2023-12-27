// export
function toChineseNum(num) {
  const numArr = num
    .toString()
    .replace(/(?=(\d{4})+$)/g, ',')
    .split(',')
    .filter(Boolean)

  let resultStr = ''
  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const units = ['', '十', '百', '千']
  const bigUnits = ['', '万', '亿']

  function _transform(numberStr) {
    let str = ''
    for (let i = 0; i < numberStr.length; i++) {
      const digit = +numberStr[i]
      const c = chars[digit]
      const u = units[numberStr.length - 1 - i]
      // todo

      str += c + u
    }

    // console.log(str)
    return str
  }
  numArr.forEach((numStr, i) => {
    const part = numStr
    // console.log(part)
    const c = _transform(part)
    const u = c ? bigUnits[numArr.length - i - 1] : ''
    resultStr += c + u
  })

  console.log(resultStr)
  return resultStr
}

toChineseNum('123123')
// 12,3123
