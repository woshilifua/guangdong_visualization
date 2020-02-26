import request from '@/utils/request'

export function getDistrict(params) {
  return request({
    url: '/v3/config/district',
    params,
    method: 'get',
    baseURL: '/map'
  })
}

