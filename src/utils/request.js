import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import Cookies from 'js-cookie'
// import router from 'router'
import { getUser } from '@/utils/auth'

// 创建axios实例
// axios.defaults.headers.post['Content-Type'] = 'application/json'
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  const token = store.getters.token
  if (token) {
    config.headers['Authorization'] = token
    config.headers['token'] = token
    config.headers['name'] = getUser()
    // 这里主要是为了兼容IE9
    var browser = navigator.appName
    var b_version = navigator.appVersion
    if (browser === 'Netscape' && b_version.indexOf(';') < 0) { // 火狐
    } else {
      if (b_version.indexOf(';') < 0) {
        return config
      }
      var version = b_version.split(';')
      var trim_Version = version[1].replace(/[ ]/g, '')
      if (browser === 'Microsoft Internet Explorer' && trim_Version === 'MSIE9.0') {
        if (config.url.indexOf('?') > 0) {
          config.url = config.url + '&token=' + token
        } else {
          config.url = config.url + '?token=' + token
        }
      }
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const resp = response.data
    if (resp.code === -1) { // 会话过期
      Cookies.remove('admin')
      location.reload()
      return resp
    }
    if (resp.code > 299) {
      Message.error(resp.message)
      return Promise.reject(new Error('error'))
    }
    return resp
  },
  error => {
    console.log('err' + error)// for debug
    const resp = error.response.data
    const message = resp ? resp.message || error.message : error.message
    Message({
      message: message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
