import { tranNumber } from '@/utils/format'

export default function initOption(obj) {
  let values = []
  let dataAxis = []
  let data = []
  Object.keys(obj.data).forEach(key => {
    data.push({
      key: key,
      data: obj.data[key]
    })
  })
  data.sort((a, b) => {
    return b.data.total - a.data.total
  })
  data.forEach((item) => {
    dataAxis.push(item.key)
    values.push(item.data.total)
  })

  let option = {
    title: {
      text: obj.title
    },
    xAxis: {
      data: dataAxis
    },
    yAxis: {
      nameLocation: 'end',
      nameTextStyle: {
        color: '#000',
        lineHeight: 32,
        padding: [0, 0, 0, -16]
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },

    series: [
      {
        float: 'left',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: (a) => {
              return tranNumber(a.value)
            }
          }
        },
        barWidth: 30,
        barCategoryGap: 50,
        data: values
      }
    ]
  }

  if (values.length > 4) {
    option['dataZoom'] =
      [
        {
          type: 'inside',
          show: true,
          realtime: false,
          start: 0,
          end: 50,
          zoomLock: true,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          moveOnMouseWheel: true
        }
      ]
  }
  return option
}