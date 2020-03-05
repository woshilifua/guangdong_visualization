export default function initOption(obj) {
  let values = []
  let dataAxis = []
  Object.keys(obj.data).forEach(key => {
    dataAxis.push(key)
    values.push(obj.data[key].total)
  })
  let option = {
    title: {
      text: obj.title
      // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
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
            position: 'top'
          }
        },
        barWidth: 24,
        data: values
      }
    ]
  }
  return option
}