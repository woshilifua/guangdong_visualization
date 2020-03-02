import { provinceData, cityData, dataAxis, districtData } from '@/data/resource/guangdong'

export function getData(adcode) {
  const res = {
    dataAxis: dataAxis
  }
  let regex = /^440.*/
  if (!String(adcode).match(regex)) {
    res.data = []
  } else if (adcode === 440100) {
    res.data = cityData
  } else if (adcode === 440000) {
    res.data = provinceData
  } else {
    res.data = getDistrictData(adcode)
  }
  return Promise.resolve(res)
}

const getDistrictData = (adcode) => {
  const data = districtData[adcode]
  if (!data) return []
  let result = [0, 0, 0, 0]
  data.forEach(item => {
    switch (item[1]) {
      case '写字楼':
        result[0] += Number(item[3])
        break
      case '园区':
        result[1] += Number(item[3])
        break
      case '专业市场':
        result[2] += Number(item[3])
        break
      case '高端聚类':
        result[3] += Number(item[3])
        break
      default:
    }
  })
  return result
}