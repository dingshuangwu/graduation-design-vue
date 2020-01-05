import request from '@/utils/request'
// import Cookies from 'js-cookie'
// import { accessedRouterMap } from '@/mock/mockData'
export function login(username, password) {
  return request({
    url: '/api/login/login?name=' + username + '&password=' + password,
    method: 'post'
  })
}
export function loginByToken(tokenId) {
  return request({
    url: '/api/auth/hexinSso/token',
    method: 'get',
    params: {
      tokenId: tokenId
    }
  })
}

export function logout() {
  return request({
    url: 'api/login/loginOut',
    method: 'post'
  })
}

export function getServerTime() {
  return request({
    url: '/api/date',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

export function getRoutes() {
  return request({
    url: '/api/user/routes',
    method: 'get'
  })
}
