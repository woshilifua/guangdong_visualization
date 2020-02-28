import request from '@/utils/request'

export function getTrade(params) {
  return request({
    url: '/resource/trade',
    method: 'get',
    params
  })
}
