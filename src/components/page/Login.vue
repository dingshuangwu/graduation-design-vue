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
           <el-button type="primary" style="width:100%;position:relative;top:20%;margin:0" v-on:click="login()">登录</el-button>
           <router-link to="/sign"><el-button type="primary" style="width:100%;position:relative;top:21%;margin:0" >注册</el-button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      this.$axios.post(
        'api/api/login/login',
        {
          name: this.name,
          password: this.password
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.data.code == '200') {
            this.$store.commit('setToken', response.data.token)
            this.$store.commit('setName', response.data.name)
            this.$store.commit('setJurisdiction', response.data.jurisdiction)
            this.$router.push({ path: '/' })
            console.log(response)
          // eslint-disable-next-line eqeqeq
          } else if (response.data.code == '400') {
            alert(response.data.message)
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/Login.css'
</style>
