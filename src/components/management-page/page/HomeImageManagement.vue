<template>
<div class="HomeImageManagementPage">
  <el-dropdown>
  <span class="el-dropdown-link">
    超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">管理员权限申请</el-dropdown-item>
    <el-dropdown-item command="b">管理员权限分配</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</div>
</template>
<script>
export default {
  data() {
    return {
      msg: '主页图片管理模块'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../styles/management-page/page/HomeImageManagement.css'
</style>
