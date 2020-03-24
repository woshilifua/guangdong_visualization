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
      ['写字楼', '租赁和商务服务业', '392782', '160px'],
      ['写字楼', '批发和零售业', '190271', '160px'],
      ['写字楼', '住宿和餐饮业', '90448', '140px'],
      ['写字楼', '建筑业', '88948', '140px'],
      ['写字楼', '房地产业', '62041', '120px'],
      ['写字楼', '居民服务、修理和其他服务业', '57572', '110px'],
      ['写字楼', '文化、体育和娱乐业', '38565', '104px'],
      ['写字楼', '科学研究和技术服务业', '20409', '100px'],
      ['写字楼', '农、林、牧、渔业', '7314', '100px'],
      ['写字楼', '水利、环境和公共设施管理业', '3004', '80px'],
    ],
  },
  {
    name: '园区',
    list: [
      ['园区', '批发和零售业', '379092', '160px'],
      ['园区', '租赁和商务服务业', '53287', '140px'],
      ['园区', '住宿和餐饮业', '46647', '140px'],
      ['园区', '居民服务、修理和其他服务业', '19842', '120px'],
      ['园区', '建筑业', '17371', '120px'],
      ['园区', '房地产业', '9822', '100px'],
      ['园区', '文化、体育和娱乐业', '6466', '100px'],
      ['园区', '科学研究和技术服务业', '5846', '100px'],
      ['园区', '农、林、牧、渔业', '3474', '100px'],
      ['园区', '水利、环境和公共设施管理业', '671', '100px']
    ]
  },
  {
    name: '专业市场',
    list: [
      ['专业市场', '批发和零售业', '481511', '160px'],
      ['专业市场', '住宿和餐饮业', '31821', '140px'],
      ['专业市场', '租赁和商务服务业', '14929', '120px'],
      ['专业市场', '居民服务、修理和其他服务业', '10599', '120px'],
      ['专业市场', '建筑业', '6093', '100px'],
      ['专业市场', '农、林、牧、渔业', '4211', '100px'],
      ['专业市场', '房地产业', '3707', '100px'],
      ['专业市场', '文化、体育和娱乐业', '2752', '100px'],
      ['专业市场', '科学研究和技术服务业', '493', '100px'],
      ['专业市场', '水利、环境和公共设施管理业', '216', '100px']

    ]
  },
  {
    name: '商业综合体',
    list: [
      ['商业综合体', '批发和零售业', '207042', '160px'],
      ['商业综合体', '住宿和餐饮业', '41924', '140px'],
      ['商业综合体', '租赁和商务服务业', '37260', '140px'],
      ['商业综合体', '居民服务、修理和其他服务业', '16436', '120px'],
      ['商业综合体', '建筑业', '9029', '100px'],
      ['商业综合体', '房地产业', '7487', '100px'],
      ['商业综合体', '文化、体育和娱乐业', '6674', '100px'],
      ['商业综合体', '科学研究和技术服务业', '1154', '100px'],
      ['商业综合体', '农、林、牧、渔业', '791', '100px'],
      ['商业综合体', '水利、环境和公共设施管理业', '278', '100px']
    ]
  }
]

export const treeMapData = {
  data: getData()
}