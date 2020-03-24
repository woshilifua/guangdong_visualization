import { data, subData } from '@/data/dashboard/index'

export default {
  getData: function (region) {
    this.region = region

    let result = {}

    data.items.forEach(item => {
      if (item[0] === this.region.name) {
        Object.keys(data.keys).forEach(key => {
          result[key] = {
            name: key,
            value: item[data.keys[key]],
            list: this.getItems(key)
          }
        })
      }
    })

    let arr = []
    Object.keys(result).forEach(key => {
      arr.push(result[key])
    })
    return Promise.resolve({ data: arr })
  },

  getItems: function (key) {
    let result = []
    if (subData[key]) {
      subData[key].items.forEach(item => {
        if (item[0] === this.region.name) {
          Object.keys(subData[key].keys).forEach(subKey => {
            result.push({
              name: subKey,
              proportion: subData[key].proportion[subKey],
              value: item[subData[key].keys[subKey]]
            })
          })
        }
      })
    }
    return result
  }
}