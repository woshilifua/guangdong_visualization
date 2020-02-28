// const styles = {
//   themeName: 'customed',
//   activeItemColor: '#4b8afa',
//   inactiveItemStyle: {
//     barBorderRadius: 8,
//     color: '#c6d9fe',
//   },
//   itemStyle: {
//     barBorderRadius: 8
//   }
// }

export default function initOption(dataAxis, data) {
  let option = {
    xAxis: {
      data: dataAxis
    },
    yAxis: {
      name: '单位（栋）',
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