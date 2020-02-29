import request from '@/utils/request'

export function getChecklist() {
  return request({
    url: '/checklist',
    method: 'get'
  })
}
