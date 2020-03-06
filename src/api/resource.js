import { allData, provinceRegionData, formatData } from '@/data/resource/guangdong'

// 地市分布数据
export function getRegionData(region, scene) {
  let res = {
    title: '',
    data: null
  }

  if (scene === 'Format') return Promise.resolve(res)

  const adcode = String(region.adcode)
  if (adcode === '440000') {
    Object.assign(res, getProvinceRegionData(region, scene))
  } else if (adcode === '440100') {
    Object.assign(res, getCityRegionData(region, scene))
  }
  return Promise.resolve(res)
}

const getProvinceRegionData = (region, scene) => {
  let data = {}
  let count = 0
  let SCENEKEYS = {
    Company: {
      key: 1,
      title: '企业总量'
    },
    Building: {
      key: 2,
      title: '楼宇总量'
    }
  }
  provinceRegionData.forEach(item => {
    let amount = Number(item[SCENEKEYS[scene].key])
    count += amount
    data[item[0]] = {
      total: amount
    }
  })
  let title = `${region.name}${SCENEKEYS[scene].title}: ${count}`
  return { title, data }
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
  if (adcode === '440100') {
    Object.assign(res, getCityFormatData(region, scene))
  }

  return Promise.resolve(res)
}

const getCityFormatData = (region, scene) => {
  let data = {}
  let count = 0
  formatData.forEach(item => {
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

const getProvinceData = (region, scene) => {
  return {
    title: getDataTitle(scene, region, 40854),
    data: {
      写字楼: {
        total: 11686,
        structure: {}
      },
      园区: {
        total: 11060,
        structure: {}
      },
      专业市场: {
        total: 12906,
        structure: {}
      },
      高端聚类: {
        total: 5202,
        structure: {}
      }
    }
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
