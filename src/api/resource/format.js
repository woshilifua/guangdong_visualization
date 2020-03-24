import { provinceData, cityData } from '@/data/resource/format'
import { tranNumber } from '@/utils/format'

const regex = /^440.*/
const TITLE = '重点行业农商客户数量'
const STRUCTURETITLE = '农商客户数量'

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

  getProvinceData: function () {
    let data = {}
    let count = 0
    provinceData.forEach(item => {
      let amount = Number(item[2])
      let structureKey = this.setStructureKey(item[1])
      count += amount
      if (!data[item[0]]) {
        data[item[0]] = {
          total: Number(item[2]),
          structure: {}
        }
        data[item[0]].structure[structureKey] = amount
      } else {
        data[item[0]].total += Number(item[2])
        if (!data[item[0]].structure[structureKey]) {
          data[item[0]].structure[structureKey] = amount
        } else {
          data[item[0]].structure[structureKey] += amount
        }
      }
    })
    let title = this.setTitle(count)
    return Promise.resolve({ title, data })
  },

  getCityData: function () {
    let data = {}
    let count = 0
    cityData.forEach(item => {
      let amount = Number(item[4])
      count += amount
      let structureKey = this.setStructureKey(item[3])
      if (!data[item[2]]) {
        data[item[2]] = {
          total: Number(item[4]),
          structure: {}
        }
        data[item[2]].structure[structureKey] = amount
      } else {
        data[item[2]].total += Number(item[4])
        if (!data[item[2]].structure[structureKey]) {
          data[item[2]].structure[structureKey] = amount
        } else {
          data[item[2]].structure[structureKey] += amount
        }
      }
    })
    let title = this.setTitle(count)
    return Promise.resolve({ title, data })
  },

  getDistrictData: function () {
    return Promise.resolve({ title: '', data: null })
  },

  setTitle: function (count) {
    return `${this.region.name}${TITLE}: ${tranNumber(count)}`
  },

  setStructureKey: function (name) {
    return `${name}${STRUCTURETITLE}`
  }
}