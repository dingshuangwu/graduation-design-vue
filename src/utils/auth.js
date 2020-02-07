import Cookies from 'js-cookie'
const TokenKey = 'tokenKey'
const UserKey = 'nameKey'
const JurisdictionKey = 'jurisdictionkey'
const ImageUrlKey = 'imageUrlKey'
const systemKey = 'window.config.systemKey' || 'system'

export function setName(name) {
  return Cookies.set(UserKey, name)
}
export function getName() {
  return Cookies.get(UserKey)
}
export function removeName() {
  return Cookies.remove(UserKey)
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
export function setJurisdiction(jurisdiction) {
  return Cookies.set(JurisdictionKey, jurisdiction)
}
export function getJurisdiction() {
  return Cookies.get(JurisdictionKey)
}
export function removeJurisdiction() {
  return Cookies.remove(JurisdictionKey)
}
export function setImageUrl(imageUrl) {
  // return Cookies.set(ImageUrlKey, imageUrl)
  return localStorage.setItem(ImageUrlKey, imageUrl)
}
export function getImageUrl() {
  // return Cookies.get(ImageUrlKey)
  return localStorage.getItem(ImageUrlKey)
}
export function removeImageUrl() {
  // return Cookies.remove(ImageUrlKey)
  return localStorage.setItem(ImageUrlKey, {})
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
