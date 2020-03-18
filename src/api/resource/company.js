import { cityData, provinceData, provinceSubdivisionData } from '@/data/resource/company'
import { industryData } from '@/data/resource/industry'
import { tranNumber } from '@/utils/format'

const regex = /^440.*/

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
    return data
  },

  getProvinceStructure: function (key) {
    let data = {}
    provinceSubdivisionData.forEach(item => {
      if (item[0] === key) {
        data[item[1]] = item[3]
      }
    })
    return data
  },

  formatProvinceData: function () {
    let data = {}
    provinceData.forEach(item => {
      let key = item[0]
      data[key] = {
        total: item[2],
        structure: this.getProvinceStructure(key),
        structureOne: this.getProvinceStructureOne(key)
      }
    })
    return data
  },

  getProvinceData: function () {
    return Promise.resolve({
      title: `${this.region.name}企业总量: ${tranNumber(2378280)}`,
      data: this.formatProvinceData()
    })
  },

  getCityData: function () {
    let data = {}
    let count = 0
    Object.keys(cityData).forEach(key => {
      cityData[key].forEach(item => {
        let amount = Number(item[4])
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
    let title = `${this.region.name}企业总量: ${tranNumber(count)}`
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
    let title = `${this.region.name}企业总量: ${tranNumber(count)}`
    return Promise.resolve({ title, data })
  }

}