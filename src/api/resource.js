import { allData, provinceRegionData, cityFormatData, provinceData, provinceSubdivisionData, provinceFormatData, provinceMarketingData, provinceTypeKeys, provinceMarketingStructureData, industrialDistribution } from '@/data/resource/guangdong'

/*
* region 区域
* type 业态类型
* industry 行业类型
* scene 场景
*/

// 业务类型数据
export function getMarketingData(region, type) {
  let res = {
    title: '',
    data: null
  }
  let adcode = String(region.adcode)
  if (adcode === '440000') {
    Object.assign(res, getProvinceMarketingData(region, type))
  }
  return Promise.resolve(res)
}

const getProvinceMarketingData = (region, type) => {
  let data = {}
  let count = 0
  provinceMarketingData.forEach(item => {
    let amount = Number(item[provinceTypeKeys[type]])
    count += amount
    data[item[0]] = {
      total: amount
    }
  })
  let title = `${region.name}客户总量: ${count}`
  return { title, data }
}

export function getMarkeitngStructureData(city, type) {
  let res = {
    title: '',
    data: null
  }
  if (provinceMarketingStructureData[city]) {
    if (provinceMarketingStructureData[city][type]) {
      res.data = provinceMarketingStructureData[city][type]
    }
  }
  res.title = `${city}: ${type}`
  return Promise.resolve(res)
}
// 地市分布数据
export function getRegionData(region, scene, industry) {
  let res = {
    title: '',
    data: null,
    correlationData: null
  }

  const adcode = String(region.adcode)
  if (adcode === '440000') {
    Object.assign(res, getProvinceRegionData(region, scene, industry))
  } else if (adcode === '440100') {
    if (scene === 'Format') return Promise.resolve(res)
    Object.assign(res, getCityRegionData(region, scene))
  }
  return Promise.resolve(res)
}

const getProvinceRegionData = (region, scene, industry) => {
  let data = {}
  let correlationData = null
  let count = 0
  let SCENEKEYS = {
    Company: {
      key: 1,
      title: '企业总量'
    },
    Building: {
      key: 2,
      title: '楼宇总量'
    },
    Format: {
      key: 2,
      title: '客户总量'
    }
  }
  provinceRegionData.forEach(item => {
    let amount = Number(item[SCENEKEYS[scene].key])
    count += amount
    data[item[0]] = {
      total: amount
    }
  })

  // 除去业态分布的场景
  if (scene !== 'Format' && industrialDistribution[industry]) {
    correlationData = {
      title: industry,
      data: {}
    }

    industrialDistribution[industry].forEach(item => {
      let amount = Number(item[SCENEKEYS[scene].key])
      correlationData.data[item[0]] = {
        total: amount
      }
    })
  }


  let title = `${region.name}${SCENEKEYS[scene].title}: ${count}`
  return { title, data, correlationData }
}

const getCityRegionData = (region, scene) => {
  let data = {}
  let count = 0
  Object.keys(allData).forEach(key => {
    allData[key].forEach(item => {
      let amount = Number(item[SCENEKEYS[scene].key])
      count += amount
      if (!data[item[0]]) {
        data[item[0]] = {
          total: Number(item[SCENEKEYS[scene].key])
        }
      } else {
        data[item[0]].total += Number(item[SCENEKEYS[scene].key])
      }
    })
  })
  let title = getDataTitle(scene, region, count)
  return { title, data }
}

export function getData(region, scene) {
  let res = {
    data: null,
    title: ''
  }
  if (scene === 'Format') return getFormatData(region, scene)

  let regex = /^440.*/
  // 非广东省的数据
  const adcode = String(region.adcode)
  if (!adcode.match(regex)) {
    res.data = null
  } else if (adcode === '440000') {
    Object.assign(res, getProvinceData(region, scene))
  } else if (adcode === '440100') {
    Object.assign(res, getCityData(region, scene))
  } else {
    Object.assign(res, getDistrictData(region, scene))
  }
  return Promise.resolve(res)
}

// 按照业态分布
const getFormatData = (region, scene) => {
  let res = {
    title: '',
    data: null
  }

  const adcode = String(region.adcode)
  if (adcode === '440000') {
    Object.assign(res, getProvinceFormatData(region, scene))
  } else if (adcode === '440100') {
    Object.assign(res, getCityFormatData(region, scene))
  }

  return Promise.resolve(res)
}

const getProvinceFormatData = (region, scene) => {
  let data = {}
  let count = 0
  provinceFormatData.forEach(item => {
    let amount = Number(item[2])
    count += amount
    if (!data[item[0]]) {
      data[item[0]] = {
        total: Number(item[2]),
        structure: {}
      }
      data[item[0]].structure[item[1]] = amount
    } else {
      data[item[0]].total += Number(item[2])
      if (!data[item[0]].structure[item[1]]) {
        data[item[0]].structure[item[1]] = amount
      } else {
        data[item[0]].structure[item[1]] += amount
      }
    }
  })
  let title = getDataTitle(scene, region, count)
  return { data, title }
}

const getCityFormatData = (region, scene) => {
  let data = {}
  let count = 0
  cityFormatData.forEach(item => {
    let amount = Number(item[4])
    count += amount
    if (!data[item[2]]) {
      data[item[2]] = {
        total: Number(item[4]),
        structure: {}
      }
      data[item[2]].structure[item[3]] = amount
    } else {
      data[item[2]].total += Number(item[4])
      if (!data[item[2]].structure[item[3]]) {
        data[item[2]].structure[item[3]] = amount
      } else {
        data[item[2]].structure[item[3]] += amount
      }
    }
  })
  let title = getDataTitle(scene, region, count)
  return { data, title }
}

const SCENEKEYS = {
  Building: {
    key: 3,
    title: '楼宇总量'
  },
  Company: {
    key: 4,
    title: '企业总量'
  },
  Format: {
    title: '客户总量'
  }
}

const getDataTitle = (scene, region, count) => {
  return `${region.name}${SCENEKEYS[scene].title}: ${count}`
}


const getProvinceStructure = (key, scene) => {
  let data = {}
  provinceSubdivisionData.forEach(item => {
    if (item[0] === key) {
      data[item[1]] = scene === 'Building' ? item[2] : item[3]
    }
  })
  return data
}
const formatProvinceData = (scene) => {
  let data = {}
  provinceData.forEach(item => {
    data[item[0]] = {
      total: scene === 'Building' ? item[1] : item[2],
      structure: getProvinceStructure(item[0], scene)
    }
  })
  return data
}
const getProvinceData = (region, scene) => {
  let count = scene === 'Building' ? 40854 : 2378280
  return {
    title: getDataTitle(scene, region, count),
    data: formatProvinceData(scene)
  }
}


// 企业，楼宇按行业分布数据
const getCityData = (region, scene) => {
  let data = {}
  let count = 0
  Object.keys(allData).forEach(key => {
    allData[key].forEach(item => {
      let amount = Number(item[SCENEKEYS[scene].key])
      count += amount
      if (!data[item[1]]) {
        data[item[1]] = {
          total: amount,
          structure: {}
        }
        data[item[1]].structure[item[2]] = amount
      } else {
        data[item[1]].total += amount
        if (!data[item[1]].structure[item[2]]) {
          data[item[1]].structure[item[2]] = amount
        } else {
          data[item[1]].structure[item[2]] += amount
        }
      }
    })
  })
  let title = getDataTitle(scene, region, count)
  return { data, title }
}

const getDistrictData = (region, scene) => {
  let data = {}
  let count = 0
  let adcode = String(region.adcode)
  if (!allData[adcode]) {
    return { title: '', data: null }
  }
  allData[adcode].forEach(item => {
    let amount = Number(item[SCENEKEYS[scene].key])
    count += amount
    if (!data[item[1]]) {
      data[item[1]] = {
        total: amount,
        structure: {}
      }
      data[item[1]].structure[item[2]] = amount
    } else {
      data[item[1]].total += amount
      if (!data[item[1]].structure[item[2]]) {
        data[item[1]].structure[item[2]] = amount
      } else {
        data[item[1]].structure[item[2]] += amount
      }
    }
  })
  let title = getDataTitle(scene, region, count)
  return { data, title }
}
