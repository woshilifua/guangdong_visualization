import { cityData, provinceData, provinceSubdivisionData } from '@/data/resource/company'
import { industryData } from '@/data/resource/industry'
import { tranNumber } from '@/utils/format'

const regex = /^440.*/

const TITLE = '农商客户总量'
const STRUCTURETITLE = '入驻农商客户数量'

export default {

  getData: function (region) {
    this.region = region
    this.adcode = String(region.adcode)

    if (!this.adcode.match(regex)) {
      return Promise.resolve({
        title: null,
        data: null
      })
    }

    switch (this.adcode) {
      case '440000':
        return this.getProvinceData()
      case '440100':
        return this.getCityData()
      default:
        return this.getDistrictData()
    }
  },

  // 第二个 pie
  getProvinceStructureOne: function (key) {
    let data = {}
    industryData.forEach(item => {
      if (key === item[1]) {
        if (!data[item[2]]) {
          data[item[2]] = {
            value: Number(item[3])
          }
        } else {
          data[item[2]].value += Number(item[3])
        }
      }
    })
    if (Object.keys(data).length === 0) return null
    return { items: data, type: 'single' }
  },

  // 第一个 pie 
  getProvinceStructure: function (key) {
    let data = {}
    provinceSubdivisionData.forEach(item => {
      if (item[0] === key) {
        let buildings = item[2]
        let company = item[3]
        data[this.setStructureKey(item[1])] = {
          value: company,
          building: {
            name: buildings ? `${item[1]}数量: ${buildings}` : null
          }
        }
      }
    })
    if (Object.keys(data).length === 0) return null
    return { items: data, type: 'nest' }
  },


  getProvinceData: function () {
    let data = {}
    let count = 0
    provinceData.forEach(item => {
      let key = item[0]
      count += Number(item[1])
      data[key] = {
        total: item[1],
        structure: this.getProvinceStructure(key),
        structureOne: this.getProvinceStructureOne(key)
      }
    })
    let title = this.setTitle(count)
    return Promise.resolve({ title, data })
  },

  getCityStructure: function (data, item) {
    let industry = item[1]
    let key = this.setStructureKey(item[2])
    let buildingsNumber = item[3] ? Number(item[3]) : 0
    let companyNumber = Number(item[4])
    if (!data[industry]) {
      data[industry] = {
        [key]: {
          total: companyNumber,
          total1: buildingsNumber,
          total1Name: item[2]
        }
      }
    } else {
      if (data[industry][key]) {
        data[industry][key].total += companyNumber
        data[industry][key].total1 += buildingsNumber
      } else {
        data[industry][key] = {
          total: companyNumber,
          total1: buildingsNumber,
          total1Name: item[2]
        }
      }
    }
  },

  getCityData: function () {
    let dataTmp = {}
    let count = 0
    let data = {}
    Object.keys(cityData).forEach((key) => {
      cityData[key].forEach(item => {
        this.getCityStructure(dataTmp, item)
      })
    })
    Object.keys(dataTmp).forEach((key) => {
      data[key] = {
        total: 0,
        structure: {
          type: 'nest',
          items: {}
        }
      }
      Object.keys(dataTmp[key]).forEach(subKey => {
        data[key].total += dataTmp[key][subKey].total
        count += dataTmp[key][subKey].total
        let builidngCount = dataTmp[key][subKey].total1
        data[key].structure.items[subKey] = {
          value: dataTmp[key][subKey].total,
          building: {
            name: builidngCount ? `${dataTmp[key][subKey].total1Name}数量: ${builidngCount}` : null
          }
        }
      })
    })
    let title = this.setTitle(count)
    return Promise.resolve({ title, data })
  },

  getDistrictData: function () {
    if (!cityData[this.adcode]) {
      return Promise.resolve({ title: '', data: null })
    }
    let data = {}
    let count = 0
    cityData[this.adcode].forEach(item => {
      let amount = Number(item[4])
      count += amount
      let structureKey = this.setStructureKey(item[2])
      if (!data[item[1]]) {
        data[item[1]] = {
          total: amount,
          structure: {
            type: 'nest',
            items: {
              [structureKey]: {
                value: item[4],
                building: {
                  name: item[3] ? `${item[2]}数量: ${item[3]}` : null
                }
              }
            }
          }
        }
      } else {
        data[item[1]].total += amount
        data[item[1]].structure.items[structureKey] = {
          value: item[4],
          building: {
            name: item[3] ? `${item[2]}数量: ${item[3]}` : null
          }
        }
      }
    })
    let title = this.setTitle(count)
    return Promise.resolve({ title, data })
  },

  setTitle: function (count) {
    return `${this.region.name}${TITLE}: ${tranNumber(count)}`
  },

  setStructureKey: function (name) {
    return `${name}${STRUCTURETITLE}`
  }
}