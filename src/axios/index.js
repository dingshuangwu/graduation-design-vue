import axios from 'axios'
import { Message } from 'element-ui'
let token = ''
let name = ''
let http = axios.create({
  baseURL: process.env.baseURL, // api的base_url
  timeout: 20000, // 请求超时时间
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'token': token,
    'name': name
  },
  transformRequest: [function(data) {
    let newData = ''
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }]
})

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  }).then(function(res) {
    response(res)
  }).catch(function(err) {
    response(err)
  })
}
// request拦截器
axios.interceptors.request.use(config => {
  const token = this.$store.state.token
  const name = this.$store.state.name
  alert('name' + name)
  alert('token' + token)
  if (token) {
    config.headers['Authorization'] = token
    config.headers['token'] = token
    config.headers['name'] = name
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
axios.interceptors.response.use(
  response => {
    const resp = response.data
    // eslint-disable-next-line eqeqeq
    if (resp.code == -1) { // 会话过期
      this.$router.push({ path: '/' })
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
export default {
  get: function(url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function(url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function(url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function(url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
