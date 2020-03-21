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
    xAxis: [{
      data: dataAxis
    }],
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        saveAsImage: { show: true }
      }
    },
    yAxis: [{
      type: 'value'
    }],
    calculable: true,
    tooltip: {
      trigger: 'axis',
    },
    barWidth: '60%',
    barGap: '-100%',
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
        itemStyle: {
          color: '#fdbf36'
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            color: '#fdbf36',
            formatter: (a) => {
              return tranNumber(a.value)
            }
          }
        }
      })
    )
  }

  return option
}