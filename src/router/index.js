import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/page/HelloWorld'
import Home from '../components/page/Home'
import Find from '../components/page/Find'
import MyFind from '../components/page/MyFind'
import Apply from '../components/page/Apply'
import MyApply from '../components/page/MyApply'
import MyInfo from '../components/page/MyInfo'
import MyResume from '../components/page/MyResume'
import MyMessage from '../components/page/MyMessage'
import Management from '../components/management-page/Management'
import Sign from '../components/page/Sign'
import Login from '../components/page/Login'
import UpdatePassword from '../components/page/UpdatePassword'
import ExitUser from '../components/page/ExitUser.vue'
import Test from '../components/Test'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    {
      path: '/my-find',
      name: 'MyFind',
      component: MyFind
    },
    {
      path: '/my-apply',
      name: 'MyApply',
      component: MyApply
    },
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/my-info',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/my-message',
      name: 'MyMessage',
      component: MyMessage
    },
    {
      path: '/my-resume',
      name: 'MyResume',
      component: MyResume
    },
    {
      path: '/management',
      name: 'Management',
      component: Management
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/update-password',
      name: 'UpdatePassword',
      component: UpdatePassword
    },
    {
      path: '/exit-user',
      name: 'ExitUser',
      component: ExitUser
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
