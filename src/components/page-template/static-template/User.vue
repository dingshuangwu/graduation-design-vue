<template>
 <div class="dropdown">
        <img  class="avatar-img" src="../../../assets/wk.jpg">
        <div class="dropdown-content">
                <router-link to="management">管理界面</router-link>
                <router-link to="my-info">个人资料</router-link>
                <router-link to="update-password">修改密码</router-link>
                <router-link to="exit-user">退出登录</router-link>
        </div>
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
