import { provinceRegionData, industrialDistribution, industrialDistributionByFormat } from '@/data/resource/region'
import { tranNumber } from '@/utils/format'
import { cityData } from '@/data/resource/company'

const SCENEKEYS = {
  Company: {
    key: 1,
    title: '农商客户总量',
    dataName: '农商客户分布情况',
    correlationDataName: '内入驻农商客户分布情况'
  },
  Building: {
    key: 2,
    title: '农商客户入驻建筑物数量',
    dataName: '农商客户入驻建筑物分布情况',
    correlationDataName: '分布情况'
  },
  Format: {
    key: 3,
    title: '重点行业农商客户分布',
    dataName: '重点行业农商客户分布情况',
    correlationDataName: '行业农商客户分布情况'
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
      let amount = 0
      if (this.scene === 'Company') {
        amount = item[SCENEKEYS[this.scene].key] + item[4]
      } else {
        amount = item[SCENEKEYS[this.scene].key]
      }
      count += amount
      data[item[0]] = {
        total: amount
      }
    })
    // 业态分布场景 
    if (this.scene === 'Format') {
      correlationData = {
        title: this.industry,
        data: {}
      }
      industrialDistributionByFormat.forEach(item => {
        if (item[1] === this.industry) {
          let key = item[0]
          if (!correlationData.data[key]) {
            correlationData.data[key] = {
              total: Number(item[2])
            }
          } else {
            correlationData.data[key].total += Number(item[2])
          }
        }
      })
    }

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

    let title = this.setTitle(count)
    let dataName = this.setDataName()
    let correlationDataName = this.setCorrelationDataName()
    return Promise.resolve({ title, data, dataName, correlationData, correlationDataName })
  },

  getCityData: function () {
    if (this.scene === 'Format') {
      return Promise.resolve({ title: null, data: null, correlationData: null })
    }
    let data = {}
    let count = 0
    let correlationData = null
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
    if (this.scene !== 'Format') {
      correlationData = {
        title: this.industry,
        data: {}
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
        if (this.scene !== 'Format') {
          if (this.industry === item[1]) {
            if (!correlationData.data[item[0]]) {
              correlationData.data[item[0]] = {
                total: Number(item[SCENEKEYS[this.scene].key])
              }
            } else {
              correlationData.data[item[0]].total += Number(item[SCENEKEYS[this.scene].key])
            }
          }
        }
      })
    })

    let title = this.setTitle(count)
    let dataName = this.setDataName()
    let correlationDataName = this.setCorrelationDataName()
    return Promise.resolve({ title, data, dataName, correlationData, correlationDataName })
  },

  getDistrictData: function () {

  },

  setDataName: function () {
    return `${this.region.name}${SCENEKEYS[this.scene].dataName}`
  },

  setCorrelationDataName: function () {
    return `${this.industry}${SCENEKEYS[this.scene].correlationDataName
      }`
  },

  setTitle: function (count) {
    return `${this.region.name}${SCENEKEYS[this.scene].title}: ${tranNumber(count)}`
  }
}