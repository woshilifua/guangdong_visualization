export default function (obj) {
  return {
    title: {
      text: obj.title,
      left: 'center'
    },
    series: [{
      type: 'treemap',
      nodeClick: false,
      roam: false,
      breadcrumb: {
        show: false
      },
      label: {
        show: true,
        formatter: '{b}'
      },
      itemStyle: {
        borderColor: '#fff'
      },
      levels: [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 1,
          },
          upperLabel: {
            show: false
          }
        },
        {
          itemStyle: {
            borderColor: '#FFF',
            borderWidth: 0,
            gapWidth: 1,
          },
          upperLabel: {
            show: true,
            height: 30,
            color: '#000',
            fontWeight: 600,
            fontSize: 14
          },
          emphasis: {
            itemStyle: {
              color: '#000',
            },
            upperLabel: {
              color: '#000',
            }
          }
        },
      ],
      data: obj.data
    }]
  }
}