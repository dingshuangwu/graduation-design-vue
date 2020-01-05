<template>
  <div class="UpdatePasswordPage">
    <div><Top></Top></div>
    <div class="UpdatePasswordUpdatePassword">
      <div class="Advertizement">
         <span class="icon iconfont icon-shixijingli" style="top:25%"></span><h2 style="top:25%">寻找兼职</h2>
         <span class="icon iconfont icon-jieshao1" style="top:35%"></span><h2 style="top:35%">发布需求</h2>
         <span class="icon iconfont icon-weixin2" style="top:45%"></span><h2 style="top:45%">线下沟通</h2>
      </div>
      <div class="UpdatePassword">
        <div class="Top"><h1>修改密码</h1></div>
        <div class="Context">
          <el-input placeholder="原始密码" v-model="userName" clearable style="position:relative;top:2%">
          </el-input>
          <el-input placeholder="新密码" v-model="password" show-password clearable style="position:relative;top:10%">
          </el-input>
          <el-input placeholder="确认新密码" v-model="password" show-password clearable style="position:relative;top:18%">
          </el-input>
           <el-button type="primary" style="width:100%;position:relative;top:33%;margin:0" >确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'UpdatePassword',
      userName: 'admin',
      password: 'admin'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/UpdatePassword.css'
</style>
