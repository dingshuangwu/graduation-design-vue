<template>
  <div class="LoginPage">
    <div class="LoginLogin">
      <div class="Advertizement">
         <span class="icon iconfont icon-shixijingli" style="top:25%"></span><h2 style="top:25%">寻找兼职</h2>
         <span class="icon iconfont icon-jieshao1" style="top:35%"></span><h2 style="top:35%">发布需求</h2>
         <span class="icon iconfont icon-weixin2" style="top:45%"></span><h2 style="top:45%">线下沟通</h2>
      </div>
      <div class="Login">
        <div class="Top"><h1>登录</h1></div>
        <div class="Context">
          <el-input placeholder="请输入账号" v-model="name" clearable style="position:relative;top:2%">
          </el-input>
          <el-input placeholder="请输入密码" v-model="password" show-password clearable style="position:relative;top:10%">
          </el-input>
           <el-button type="primary" style="width:100%;position:relative;top:30%;margin:0" v-on:click="login()">登录</el-button>
           <router-link to="/sign"><el-button type="primary" style="width:100%;position:relative;top:32%;margin:0" >注册</el-button></router-link>
           <router-link to="/update-password"><el-button type="primary" style="width:100%;position:relative;top:34%;margin:0" >修改密码</el-button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setToken, setName, setJurisdiction, setImageUrl, clearLocalStorage } from '../../utils/auth'
export default {
  data() {
    return {
      msg: 'Login',
      name: '',
      password: ''
    }
  },
  methods: {
    login: function() {
      localStorage.clear() // 登录前把本地缓存数据删除
      clearLocalStorage()
      this.$store.commit('SET_NAME', '')// 登录成功后重新获取用户信息
      this.$store.commit('SET_TOKEN', '')
      this.$store.commit('SET_JURISDICTION', {})
      this.$store.commit('SET_IMAGEURL', '')
      this.$axios.post(
        'api/login/login',
        {
          name: this.name,
          password: this.password
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.$store.commit('SET_NAME', response.data.name)
            this.$store.commit('SET_TOKEN', response.data.token)
            this.$store.commit('SET_JURISDICTION', response.data.jurisdiction)
            this.$store.commit('SET_IMAGEURL', response.data.imageUrl)
            setName(response.data.name)
            setToken(response.data.token)
            setJurisdiction(response.data.jurisdiction)
            setImageUrl(response.data.imageUrl)
            console.log(response)
            this.$router.push({ path: '/home' })
          // eslint-disable-next-line eqeqeq
          }
        }
      )
    }
  },
  mounted() {
    if (this.$store.state.token) {
      this.$router.push({ path: '/home' })
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/Login.css'
</style>
