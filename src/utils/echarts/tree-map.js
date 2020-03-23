import { tranNumber } from '@/utils/format'

export default function (obj) {
  return {
    title: {
      show: false,
      left: 'center',
    },
    series: [{
      type: 'treemap',
      top: 0,
      left: 0,
      right: 0,
      nodeClick: false,
      roam: false,
      breadcrumb: {
        show: false
      },
      label: {
        show: true,
        fontSize: '14',
        fontWeight: '600',
        formatter: (obj) => {
          return `${obj.name}:  ${tranNumber(obj.value)}`
        }
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
            show: false,
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
        }
      ],
      data: obj.data
    }]
  }
}