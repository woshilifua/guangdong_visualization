import { tranNumber } from '@/utils/format'
import _ from 'lodash'

const echartsThemeColors = [
  '#8776e6',
  '#fdbf36',
  '#67c4e5',
  '#7ae6b2',
  '#ec6a52',
  '#e7c45b',
  '#4b8afa'
]

export default function formatPieEchartsData(obj) {
  let legends = []
  let option = {
    title: {
      left: 'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      show: true,
      data: []
    },
    tooltip: {
      position: 'inside',
      left: 'bottom',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
    },
    series: setSeriesData(obj, legends)
  }
  option.legend.data = legends
  return option
}

const DATATMP = {
  label: {
    show: true,
    formatter: (obj) => {
      return tranNumber(obj.value)
    }
  },
  name: '分布情况',
  type: 'pie',
  center: ['50%', '55%'],
  data: null,
}

const setSeriesData = (obj, legends) => {
  let result = []
  if (obj.data.type === 'single') {
    let dataOne = []
    let items = obj.data.items
    Object.keys(items).forEach((key, index) => {
      dataOne.push({
        name: key,
        value: items[key].value,
        itemStyle: { color: echartsThemeColors[index] }
      })
      legends.push({ name: key })
    })
    let dataTmp = _.cloneDeep(DATATMP)
    result.push(Object.assign(dataTmp, {
      data: dataOne,
      radius: ['0', '76%'],
    }))
  } else if (obj.data.type === 'nest') {
    let dataOne = []
    let dataTwo = []
    let items = obj.data.items
    Object.keys(items).forEach((key, index) => {
      dataOne.push({
        name: key,
        value: items[key].value,
        itemStyle: { color: echartsThemeColors[index] }
      })
      legends.push({ name: key })
      // 如果有 building 的数据
      if (items[key].building.name) {
        dataTwo.push({
          name: items[key].building.name,
          value: items[key].value,
          itemStyle: { color: echartsThemeColors[index] }
        })
      }
    })
    let dataTmp = _.cloneDeep(DATATMP)
    result.push(Object.assign(dataTmp, {
      data: dataOne,
      radius: ['48%', '76%'],
    }))
    let dataTmpTwo = _.cloneDeep(DATATMP)
    result.push(Object.assign(dataTmpTwo, {
      data: dataTwo,
      radius: ['0%', '40%'],
      label: {
        show: false,
      },
      tooltip: {
        position: 'inside',
        left: 'bottom',
        formatter: '{b}'
      }
    }))
  } else {
    let dataOne = []
    let items = obj.data
    Object.keys(items).forEach((key, index) => {
      dataOne.push({
        name: key,
        value: items[key],
        itemStyle: { color: echartsThemeColors[index] }
      })
      legends.push({ name: key })
    })
    let dataTmp = _.cloneDeep(DATATMP)
    result.push(Object.assign(dataTmp, {
      data: dataOne,
      radius: ['0', '76%']
    }))
  }
  return result
}