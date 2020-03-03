export default function initOption(dataAxis, data, region) {
  let option = {
    title: {
      text: `${region.name}楼宇分布情况`
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
        data: data
      }
    ]
  }
  return option
}