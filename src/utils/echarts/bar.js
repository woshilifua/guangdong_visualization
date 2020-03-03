export default function initOption(data) {
  let option = {
    title: {
      text: data.title
      // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    xAxis: {
      data: data.dataAxis
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
        data: data.data
      }
    ]
  }
  return option
}