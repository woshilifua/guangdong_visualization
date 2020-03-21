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

  getProvinceStructureOne: function (key) {
    let data = {}
    industryData.forEach(item => {
      if (key === item[1]) {
        if (!data[item[2]]) {
          data[item[2]] = Number(item[3])
        } else {
          data[item[2]] += Number(item[3])
        }
      }
    })
    if (Object.keys(data).length === 0) return null
    return data
  },

  getProvinceStructure: function (key) {
    let data = {}
    provinceSubdivisionData.forEach(item => {
      if (item[0] === key) {
        data[this.setStructureKey(item[1])] = item[3]
      }
    })
    if (Object.keys(data).length === 0) return null
    return data
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

  getCityData: function () {
    let data = {}
    let count = 0
    Object.keys(cityData).forEach(key => {
      cityData[key].forEach(item => {
        let amount = Number(item[4])
        let structureKey = this.setStructureKey(item[2])
        count += amount
        if (!data[item[1]]) {
          data[item[1]] = {
            total: amount,
            structure: {}
          }
          data[item[1]].structure[structureKey] = amount
        } else {
          data[item[1]].total += amount
          if (!data[item[1]].structure[structureKey]) {
            data[item[1]].structure[structureKey] = amount
          } else {
            data[item[1]].structure[structureKey] += amount
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
          structure: {}
        }
        data[item[1]].structure[structureKey] = amount
      } else {
        data[item[1]].total += amount
        if (!data[item[1]].structure[structureKey]) {
          data[item[1]].structure[structureKey] = amount
        } else {
          data[item[1]].structure[structureKey] += amount
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