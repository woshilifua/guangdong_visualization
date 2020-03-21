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
  let legendData = []
  Object.keys(obj.data).forEach((key, index) => {
    seriesData.push({
      name: key,
      value: obj.data[key],
      itemStyle: { color: echartsThemeColors[index] }
    })
    legendData.push(key)
  })

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
      position: 'right',
      left: 'right',
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
  return option
}