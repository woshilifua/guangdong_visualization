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
      text: obj.title,
    },
    dataZoom: [],
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
    barWidth: 30,
    series: []
  }

  if (obj.option) {
    Object.assign(option, obj.option)
  }

  if (values.length !== 0) {
    option.series.push(Object.assign({}, dataTmp,
      {
        data: values,
        name: obj.dataName ? obj.dataName : ''
      })
    )
  }
  // 有相关数据的时候
  if (correlationValues.length !== 0) {
    option.series.push(
      Object.assign({}, dataTmp, {
        data: correlationValues,
        name: obj.correlationDataName ? obj.correlationDataName : '',
        itemStyle: { color: '#fdbf36' }
      })
    )
  }

  return option
}