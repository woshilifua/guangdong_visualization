const echartsThemeColors = [
  '#8776e6',
  '#fdbf36',
  '#67c4e5',
  '#7ae6b2',
  '#ec6a52',
  '#e7c45b',
  '#4b8afa'
]

export default function formatPieEchartsData(data) {
  let seriesData = []
  let legendData = []
  data.items.forEach((item, index) => {
    seriesData.push({
      name: item.name,
      value: item.value,
      itemStyle: { color: echartsThemeColors[index] }
    })
    legendData.push({
      name: item.name,
      icon: 'circle'
    })
  })
  return {
    title: {
      text: `${data.name}分布`,
      left: 'left'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        label: {
          position: 'inner',
        },
        name: '分布情况',
        type: 'pie',
        radius: ['30%', '70%'],
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
}