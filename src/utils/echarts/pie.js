import { tranNumber } from '@/utils/format'

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

  let seriesData = []
  let seriesDataOne = []
  let legendData = []
  Object.keys(obj.data).forEach((key, index) => {
    if (typeof obj.data[key] === 'object') {
      seriesData.push({
        name: key,
        value: obj.data[key][1],
        itemStyle: { color: echartsThemeColors[index] }
      })
      seriesDataOne.push({
        name: obj.data[key][0],
        value: obj.data[key][1],
        itemStyle: { color: echartsThemeColors[index] }
      })
    } else {
      seriesDataOne = []
      seriesData.push({
        name: key,
        value: obj.data[key],
        itemStyle: { color: echartsThemeColors[index] }
      })
    }
    legendData.push(key)
  })

  let dataTmp = {
    label: {
      show: false,
      position: 'inner',
      formatter: (obj) => {
        return obj.name
      }
    },
    tooltip: {
      position: 'bottom',
      left: 'bottom',
      formatter: '{b}'
    },
    type: 'pie',
    radius: ['20%', '40%'],
    center: ['50%', '55%'],
    data: [],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
    }
  }

  let option = {
    title: {
      left: 'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      show: true,
      data: legendData,
    },
    tooltip: {
      position: 'bottom',
      left: 'bottom',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        label: {
          show: true,
          formatter: (obj) => {
            return tranNumber(obj.value)
          }
        },
        name: '分布情况',
        type: 'pie',
        radius: ['30%', '76%'],
        center: ['50%', '55%'],
        data: seriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
        }
      }
    ]
  }

  if (seriesDataOne.length !== 0) {
    option.series[0].radius = ['50%', '70%']
    let seriesData = Object.assign({}, dataTmp, { data: seriesDataOne })
    option.series.push(seriesData)
  }
  return option
}