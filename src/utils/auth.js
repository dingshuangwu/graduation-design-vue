import Cookies from 'js-cookie'
const TokenKey = 'admin'
const UserKey = 'user'
const systemKey = 'window.config.systemKey' || 'system'

export function setUser(user) {
  return Cookies.set(UserKey, user)
}
export function getUser() {
  return Cookies.get(UserKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getToken() {
  return Cookies.get(TokenKey)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeUser() {
  return Cookies.remove(UserKey)
}
export function removeCookieRoutes() {
  return Cookies.remove('routes')
}
export function getLocalStorage(key) {
  const obj = JSON.parse(localStorage.getItem(systemKey)) || {}
  return obj[key] || ''
}

export function setLocalStorage(key, value) {
  const obj = JSON.parse(localStorage.getItem(systemKey)) || {}
  obj[key] = value
  localStorage.setItem(systemKey, JSON.stringify({ [systemKey]: obj }))
}

export function clearLocalStorage() {
  localStorage.setItem(systemKey, '{}')
}
// 模拟增加路由
export function mergeMockRoutes(cookieRoutes, accessedMap) {
  const cookies = Cookies.get()
  const user = cookies.admin ? 'admin' : 'client'
  if (!cookieRoutes) return {}
  if (cookieRoutes.permissionType === user) return cookieRoutes
  return {}
}
