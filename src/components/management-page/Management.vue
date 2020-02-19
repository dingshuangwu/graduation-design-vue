<template>
  <div class="ManagementPage">
   <div class="ManagementTop"><Top></Top></div>
    <el-tabs tab-position="left" class="ManagementContext">
      <el-tab-pane class="ManagementContextPart">
         <span slot="label" class="ManagementLable">
            首页图片管理
          </span>
        <HomeImageManagement></HomeImageManagement>
      </el-tab-pane>

      <el-tab-pane class="ManagementContextPart">
        <span slot="label" class="ManagementLable">
            用户权限管理
        </span>
        <UserJurisdictionManagement></UserJurisdictionManagement>
      </el-tab-pane>

      <el-tab-pane  class="ManagementContextPart">
        <span slot="label" class="ManagementLable">
            用户信息管理
        </span>
        <UserInfoManagement></UserInfoManagement>
      </el-tab-pane><!--简历、个人信息、发布、请求-->

      <el-tab-pane class="ManagementContextPart">
          <span slot="label" class="ManagementLable">
            <el-badge :value="this.messageCount" :max="99" class="item">实名认证管理</el-badge>
          </span>
          <UserAuthenticationManagement></UserAuthenticationManagement>
      </el-tab-pane>
    </el-tabs>
 </div>
</template>
<script>
import HomeImageManagement from '../management-page/page/HomeImageManagement'
import UserAuthenticationManagement from '../management-page/page/UserAuthenticationManagement'
import UserInfoManagement from '../management-page/page/UserInfoManagement'
import UserJurisdictionManagement from '../management-page/page/UserJurisdictionManagement'
export default {
  components: {
    HomeImageManagement,
    UserAuthenticationManagement,
    UserInfoManagement,
    UserJurisdictionManagement
  },
  data() {
    return {
      msg: '管理员界面',
      messageCount: 100
    }
  },
  methods: {
  },
  mounted() {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/management-page/Management.css'
</style>
