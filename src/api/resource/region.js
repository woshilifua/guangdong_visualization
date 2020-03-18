import { provinceRegionData, industrialDistribution } from '@/data/resource/region'
import { tranNumber } from '@/utils/format'
import { cityData } from '@/data/resource/company'

const SCENEKEYS = {
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

export default {

  getData: function (region, scene, industry) {
    this.region = region
    this.adcode = String(region.adcode)
    this.scene = scene
    this.industry = industry

    switch (this.adcode) {
      case '440000':
        return this.getProvinceData()
      case '440100':
        return this.getCityData()
      default:
        return Promise.resolve({ title: null, data: null, correlationData: null })
    }
  },

  getProvinceData: function () {
    let data = {}
    let correlationData = null
    let count = 0

    provinceRegionData.forEach(item => {
      let amount = Number(item[SCENEKEYS[this.scene].key])
      count += amount
      data[item[0]] = {
        total: amount
      }
    })

    // 除去业态分布的场景
    if (this.scene !== 'Format' && industrialDistribution[this.industry]) {
      correlationData = {
        title: this.industry,
        data: {}
      }

      industrialDistribution[this.industry].forEach(item => {
        let amount = Number(item[SCENEKEYS[this.scene].key])
        correlationData.data[item[0]] = {
          total: amount
        }
      })
    }

    let title = `${this.region.name}${SCENEKEYS[this.scene].title}: ${tranNumber(count)}`
    return Promise.resolve({ title, data, correlationData })
  },

  getCityData: function () {
    if (this.scene === 'Format') {
      return Promise.resolve({ title: null, data: null, correlationData: null })
    }
    let data = {}
    let count = 0
    let SCENEKEYS = {
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
    Object.keys(cityData).forEach(key => {
      cityData[key].forEach(item => {
        let amount = Number(item[SCENEKEYS[this.scene].key])
        count += amount
        if (!data[item[0]]) {
          data[item[0]] = {
            total: Number(item[SCENEKEYS[this.scene].key])
          }
        } else {
          data[item[0]].total += Number(item[SCENEKEYS[this.scene].key])
        }
      })
    })
    let title = `${this.region.name}${SCENEKEYS[this.scene].title}: ${tranNumber(count)}`
    return Promise.resolve({ title, data })
  },

  getDistrictData: function () {

  }

}