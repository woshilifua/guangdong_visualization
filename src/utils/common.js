export function getFirstStructure(obj) {
  if (obj.data === null) return { title: '', data: null }
  let data = []
  Object.keys(obj.data).forEach(key => {
    data.push({
      key: key,
      data: obj.data[key]
    })
  })
  data.sort((a, b) => {
    return b.data.total - a.data.total
  })
  return { title: data[0].key, data: data[0].data.structure }
}