import request from '@/utils/request'

export function login() {
  return Promise.resolve({
    code: 200,
    data: {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
  })
}

export function getInfo() {
  return Promise.resolve({
    code: 200,
    data: {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
