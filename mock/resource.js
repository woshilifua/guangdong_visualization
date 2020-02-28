var dataAxis = ['写字楼', '园区', '聚类', '市场']
var data = [220, 182, 191, 234]

export default [
  {
    url: '/resource/trade',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: { dataAxis, data }
      }
    }
  }
]