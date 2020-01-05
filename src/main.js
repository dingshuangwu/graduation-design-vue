// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './assets/iconfont/iconfont.css'
import store from './store'
import router from './router'
import axios from './axios/index'
import qs from 'qs'
import Top from './components/page-template/static-template/Top.vue'

window.Promise = Promise
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.component('Top', Top)
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
Vue.filter('valueFilter', function(val, value) {
  return (!value) ? 0 : (val || '---')
})
