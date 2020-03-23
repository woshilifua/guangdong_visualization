const dataTmp = {
  name: '',
  value: 20,
  itemStyle: {
    color: '#ea6b57'
  },
}
const getData = () => {
  let result = {}
  let data = []
  treeData.forEach(item => {
    const key = item[0]
    if (!result[key]) {
      result[key] = { ...dataTmp }
      result[key].name = key
      result[key]['children'] = [
        {
          name: item[1],
          value: item[2]
        }
      ]
    } else {
      result[key]['children'].push({
        name: item[1],
        value: item[2]
      })
    }
  })
  Object.keys(result).forEach(item => {
    data.push(result[item])
  })
  return data
}

const treeData = [
  ['商铺及零星', '网吧', '10240'],
  ['商铺及零星', '药店', '15169'],
  ['商铺及零星', '餐饮', '42655']
]
export const data = [
  {
    name: '写字楼',
    list: [
      ['写字楼', '租赁和商务服务业', '192208', '160px'],
      ['写字楼', '房地产业', '30360', '120px'],
      ['写字楼', '科学研究和技术服务业', '9987', '100px'],
      ['写字楼', '建筑业', '43527', '140px'],
      ['写字楼', '文化、体育和娱乐业', '18872', '100px'],
    ],
  },
  {
    name: '园区',
    list: [
      ['园区', '租赁和商务服务业', '53287', '160px'],
      ['园区', '住宿和餐饮业', '46647', '140px'],
      ['园区', '建筑业', '17371', '120px'],
      ['园区', '科学研究和技术服务业', '5846', '100px'],
      ['园区', '房地产业', '9822', '100px']
    ]
  },
  {
    name: '专业市场',
    list: [
      ['专业市场', '批发和零售业', '481511', '200px'],
      ['专业市场', '居民服务、修理和其他服务业', '10599', '120px'],
      ['专业市场', '农、林、牧、渔业', '4211', '100px'],
    ]
  },
  {
    name: '商业综合体',
    list: [
      ['商业综合体', '批发和零售业', '207042', '200px'],
      ['商业综合体', '住宿和餐饮业', '41924', '120px']
    ]
  }
]

export const treeMapData = {
  data: getData()
}