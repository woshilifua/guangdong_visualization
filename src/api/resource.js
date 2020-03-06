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

const provinceData = [
  ['写字楼', '11686', '951355'],
  ['园区', '11060', '542518'],
  ['高端聚类', '5202', '328075'],
  ['专业市场', '12906', '556332']
]

const provinceSubdivisionData = [
  ['写字楼', 'A', '1350', '222317'],
  ['写字楼', 'B', '3513', '345290'],
  ['写字楼', 'C', '6823', '383748'],
  ['园区', '产业园区', '2440', '165555'],
  ['园区', '工业园区', '7828', '325676'],
  ['园区', '化工园区', '16', '2738'],
  ['园区', '双创园区', '569', '35593'],
  ['园区', '物流园区', '207', '12956'],
  ['高端聚类', '商业街区', '1898', '51349'],
  ['高端聚类', '商业综合体', '3304', '276726'],
  ['专业市场', '农贸市场', '2045', '44969'],
  ['专业市场', '批发市场', '9944', '447715'],
  ['专业市场', '综合市场', '917', '63648'],
]

const getProvinceStructure = (key, scene) => {
  console.log(scene)
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
