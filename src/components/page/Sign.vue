<template>
  <div class="SignPage">
    <div class="SignSign">
      <div class="Advertizement">
         <span class="icon iconfont icon-shixijingli" style="top:25%"></span><h2 style="top:25%">寻找兼职</h2>
         <span class="icon iconfont icon-jieshao1" style="top:35%"></span><h2 style="top:35%">发布需求</h2>
         <span class="icon iconfont icon-weixin2" style="top:45%"></span><h2 style="top:45%">线下沟通</h2>
      </div>
      <div class="Sign">
        <div class="Top"><h1>注册</h1></div>
        <div class="Context">
          <el-input placeholder="请输入账号" v-model="userName" maxlength="20" minlength="3" clearable style="position:relative;top:2%">
          </el-input>
          <el-input placeholder="请输入密码" v-model="password" maxlength="20" minlength="6" show-password clearable style="position:relative;top:10%">
          </el-input>
          <el-input placeholder="确认密码" v-model="affirmPassword" maxlength="20" minlength="6" show-password clearable style="position:relative;top:18%">
          </el-input>
           <el-button type="primary" style="width:100%;position:relative;top:33%;margin:0" @click="comparePassword()">注册</el-button>
           <el-button type="primary" style="width:100%;position:relative;top:35%;margin:0" @click="routerTo()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
  data() {
    return {
      msg: 'Sign',
      userName: '',
      password: '',
      affirmPassword: ''
    }
  },
  methods: {
    sign: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userName.indexOf(' ') != -1) {
        Message.error('用户名不能有空格')
      // eslint-disable-next-line eqeqeq
      } else if (this.password.indexOf(' ') != -1) {
        Message.error('密码不能有空格')
      } else if (this.userName.length > 20 || this.userName < 3) {
        Message.error('用户名长度应在3~20之间')
      } else if (this.password.length > 20 || this.password.length < 6) {
        Message.error('密码长度应在6~20之间')
      } else {
        this.$axios.post(
          'api/api/sign/sign-in',
          {
            name: this.userName,
            password: this.password
          },
          response => {
          // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              Message.success('注册成功')
              this.$router.push({ path: '/' })
            // eslint-disable-next-line eqeqeq
            }
          }
        )
      }
    },
    comparePassword: function() {
      // eslint-disable-next-line eqeqeq
      if (this.password == this.affirmPassword) {
        this.sign()
      } else {
        Message.error('两次输入密码不一致')
      }
    },
    routerTo: function() {
      this.$router.push({ path: '/' })
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/Sign.css'
</style>
