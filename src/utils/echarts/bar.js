import { tranNumber } from '@/utils/format'

const dataTmp = {
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
  barCategoryGap: 60,
  barGap: 0,
  data: null
}

export default function initOption(obj) {
  let values = []
  let dataAxis = []
  let data = []
  let correlationValues = []

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
    // 处理有对比数据的时候
    if (obj.correlationData && obj.correlationData.data[item.key]) {
      correlationValues.push(obj.correlationData.data[item.key].total)
    }
    values.push(item.data.total)
  })

  let option = {
    title: {
      text: obj.title
    },
    dataZoom: [],
    xAxis: {
      data: dataAxis
    },
    legend: {
      formatter: (name) => {
        return `${name}分布情况`
      },
      data: [],
      left: 'center'
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
      Object.assign({}, dataTmp, { data: values })
    ]
  }

  // 有相关数据的时候
  if (correlationValues.length !== 0) {
    option.legend.data.push(obj.correlationData.title)
    option.series.push(
      Object.assign({}, dataTmp, {
        name: obj.correlationData.title,
        itemStyle: { color: '#fdbf36' },
        data: correlationValues
      })
    )
  }


  // 数据多的时候添加 dataZoom
  if (values.length > 4) {
    option.dataZoom.push(
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
    )
  }
  return option
}