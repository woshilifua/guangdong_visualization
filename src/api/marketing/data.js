import { marketingData, marketingDataKeys, marketingStructureData } from '@/data/marketing/data'
export default {

  getData: function (type) {
    let data = {}
    let count = 0
    marketingData.forEach(item => {
      let amount = Number(item[marketingDataKeys[type]])
      count += amount
      data[item[0]] = {
        total: amount
      }
    })
    let title = `广东省客户总量: ${count}`
    return Promise.resolve({ title, data })
  },

  getStructData: function (city, type) {
    if (!marketingStructureData[city] || !marketingStructureData[city][type]) {
      return Promise.resolve({ title: null, data: null })
    }
    return Promise.resolve({
      title: `${city}: ${type}`,
      data: marketingStructureData[city][type]
    })
  }

}
