<template>
  <div class="UpdatePasswordPage">
    <div class="UpdatePasswordUpdatePassword">
      <div class="Advertizement">
         <span class="icon iconfont icon-shixijingli" style="top:25%"></span><h2 style="top:25%">寻找兼职</h2>
         <span class="icon iconfont icon-jieshao1" style="top:35%"></span><h2 style="top:35%">发布需求</h2>
         <span class="icon iconfont icon-weixin2" style="top:45%"></span><h2 style="top:45%">线下沟通</h2>
      </div>
      <div class="UpdatePassword">
        <div class="Top"><h1>修改密码</h1></div>
        <div class="Context">
          <el-input placeholder="账号" v-model="userName" clearable style="position:relative;top:2%">
          </el-input>
          <el-input placeholder="原始密码" v-model="oldPassword" show-password clearable style="position:relative;top:10%">
          </el-input>
          <el-input placeholder="新密码" v-model="newPassword" show-password clearable style="position:relative;top:18%">
          </el-input>
          <el-input placeholder="确认新密码" v-model="affirmPassword" show-password clearable style="position:relative;top:25%">
          </el-input>
           <el-button type="primary" style="width:100%;position:relative;top:33%;margin:0" @click="updatePassword()">确定</el-button>
           <router-link to="/login"><el-button type="primary" style="width:100%;position:relative;top:35%;margin:0">登录</el-button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { clearLocalStorage, removeName, removeToken, removeJurisdiction, removeImageUrl } from '../../utils/auth'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      msg: '',
      userName: '',
      oldPassword: '',
      newPassword: '',
      affirmPassword: ''
    }
  },
  methods: {
    updatePassword: function() {
      // eslint-disable-next-line eqeqeq
      if (this.newPassword == this.affirmPassword && this.oldPassword != this.newPassword) {
        this.$axios.post(
          'api/api/sign/update-password',
          {
            name: this.userName,
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          },
          response => {
          // eslint-disable-next-line eqeqeq
            if (response.code == '200') {
              removeName()
              removeToken()
              removeImageUrl()
              removeJurisdiction()
              this.$store.commit('SET_NAME', '')
              this.$store.commit('SET_TOKEN', '')
              this.$store.commit('SET_JURISDICTION', {})
              this.$store.commit('SET_IMAGEURL', '')
              clearLocalStorage()
              this.$router.push({ path: '/login' })
              Message.success(response.message)
            }
          }
        )
      // eslint-disable-next-line eqeqeq
      } else if (this.oldPassword == this.newPassword) {
        Message.error('新密码与旧密码相同！')
      } else {
        Message.error('新密码两次输入不一致！')
      }
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/UpdatePassword.css'
</style>
