export const treeMapData = {
  title: '广东省农商客户规模分布视图',
  data: [
    {
      name: '零星场景',
      value: 10,
      itemStyle: {
        color: '#ea6b57'
      },
      children: [
        {
          name: '镇乡村 12.72万',
          value: 3
        },
        {
          name: '城市 27.67万',
          value: 6
        }
      ]
    },
    {
      name: '聚集场景',
      value: 20,
      children: [
        {
          name: '写字楼 95.13万',
          value: 20
        },
        {
          name: '园区 54.25万',
          value: 10
        },
        {
          name: '商业综合体 32.80万',
          value: 6
        },
        {
          name: '专业市场 55.63万',
          value: 11
        }
      ]
    }
  ]
}

export const barData = {
  option: {
    title: {
      text: '广东省农商客户价值分布图',
      left: 'center'
    },
    barWidth: 80,
    yAxis: {
      show: false
    }
  },
  data: {
    写字楼: {
      total: 111123000000
    },
    园区: {
      total: 31123000000
    },
    专业市场: {
      total: 221123000000
    },
    商业综合体: {
      total: 121123000000
    },
    城市: {
      total: 31123000000
    },
    镇乡村: {
      total: 14123000000
    }
  }
}