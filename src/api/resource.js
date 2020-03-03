import { provinceData, cityData, dataAxis, districtData } from '@/data/resource/guangdong'

export function getData(adcode) {
  let res = {
    dataAxis: dataAxis,
    data: [],
    structure: []
  }
  let regex = /^440.*/
  if (!String(adcode).match(regex)) {
    res.data = []
  } else if (adcode === 440100) {
    res.data = cityData
  } else if (adcode === 440000) {
    res.data = provinceData
  } else {
    let result = getDistrictData(adcode)
    if (result) {
      res = Object.assign({}, res, result)
    }
  }
  return Promise.resolve(res)
}

const getDistrictData = (adcode) => {

  const districts = districtData[adcode]
  if (!districts) return

  const keys = {
    '写字楼': 0,
    '园区': 1,
    '专业市场': 2,
    '高端聚类': 3
  }
  // 柱状的数据
  let data = [0, 0, 0, 0]

  // 饼状数据
  let structure = [
    { name: '写字楼', items: [] },
    { name: '园区', items: [] },
    { name: '专业市场', items: [] },
    { name: '高端聚类', items: [] }
  ]
  districts.forEach(item => {
    data[keys[item[1]]] += Number(item[3])
    structure[keys[item[1]]].items.push({
      name: item[2],
      value: item[3]
    })
  })
  return { data, structure }
}