<template>
 <div class="dropdown">
        <img  class="avatar-img" v-bind:src="this.$store.state.imageUrl" alt="显示错误" v-if="typeof (this.$store.state.token) != 'undefined'&&this.$store.state.token!=null&&this.$store.state.token!=''">
        <div class="dropdown-content" v-if="typeof (this.$store.state.token) !== 'undefined'&&this.$store.state.token!=null&&this.$store.state.token!=''">
                <router-link to="my-info">个人资料</router-link>
                <router-link to="update-password">修改密码</router-link>
                <router-link to="exit-user">退出登录</router-link>
                <router-link to="management" v-if="this.$store.state.jurisdiction.management==true" style="color:red">管理员界面</router-link>
        </div>
       <router-link to="sign"  style="margin:0;padding:14% 0 0 0;" v-else><el-button type="primary" size="mini">注册</el-button></router-link>
</div>
</template>
<script>
export default {
  data() {
    return {
      msg: '用户信息'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../styles/page-template/static-template/User.css"
</style>
