export function formatDataAxis(str) {
  if (str.length > 3) {
    return str.substring(0, 3)
  }
  return str
}


export function tranNumber(num) {
  let point = 2
  let numStr = num.toString()
  if (numStr.length < 5) {
    return numStr
  } else if (numStr.length >= 5 && numStr.length <= 8) {
    let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
    return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
  } else if (numStr.length > 8) {
    let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
    return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
  }
}

