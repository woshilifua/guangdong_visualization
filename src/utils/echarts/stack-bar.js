export default function () {
  let option = {
    title: {
      left: 'center',
      text: '广东省农商客户概况'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true

    },
    xAxis: {
      type: 'category',
      data: ['写字楼', '园区', '专业市场', '商业综合体']
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        name: '直接访问',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: [320, 302, 301, 334, 390, 330, 320]
      }
    ]
  }
  return option
}

// let dataTmp = {
//   name: '',
//   type: 'bar',
//   stack: '总量',
//   label: {
//     show: true,
//     position: 'insideRight'
//   },
//   data: []
// }

// const getData = () => {
//   let result = {}
//   barData.forEach(item => {
//     if (!result[item[0]]) {
//       result[item[0]]
//     }
//   })
// }

// const barData = [
//   ['写字楼', 'value-1', '租赁和商务服务业', '192208'],
//   ['写字楼', 'value-2', '房地产业', '30360'],
//   ['写字楼', 'value-3', '科学研究和技术服务业', '9987'],
//   ['写字楼', 'value-4', '建筑业', '43527'],
//   ['写字楼', 'value-5', '文化、体育和娱乐业', '18872'],
//   ['园区', 'value-1', '租赁和商务服务业', '53287'],
//   ['园区', 'value-2', '住宿和餐饮业', '46647'],
//   ['园区', 'value-3', '建筑业', '17371'],
//   ['园区', 'value-4', '科学研究和技术服务业', '5846'],
//   ['园区', 'value-5', '房地产业', '9822'],
//   ['专业市场', 'value-1', '批发和零售业', '481511'],
//   ['专业市场', 'value-2', '居民服务、修理和其他服务业', '10599'],
//   ['专业市场', 'value-3', '农、林、牧、渔业', '4211'],
//   ['商业综合体', 'value-1', '批发和零售业', '207042'],
//   ['商业综合体', 'value-2', '住宿和餐饮业', '41924']
// ]