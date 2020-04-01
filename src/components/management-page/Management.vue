<template>
  <div class="ManagementPage">
   <div class="ManagementTop"><Top></Top></div>
   <el-tabs tab-position="left" class="ManagementContext">

    <el-tab-pane class="ManagementContextPart" v-if="!isRoot">
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
    </el-tab-pane>

    <el-tab-pane class="ManagementContextPart">
        <span slot="label" class="ManagementLable">
          <el-badge :value="this.messageCount" :max="99" class="item">实名认证管理</el-badge>
        </span>
        <UserAuthenticationManagement @setMessageCount='setMessageCount'></UserAuthenticationManagement>
    </el-tab-pane>

    <el-tab-pane class="ManagementContextPart" v-if="isRoot">
        <span slot="label" class="ManagementLable" style="color:red">
          <el-badge :value="this.rootMessageCount" :max="10" class="item">Ⓡ管理员申请</el-badge>
        </span>
        <ManagementJurisdiction @setRootMessageCount='setRootMessageCount'></ManagementJurisdiction>
    </el-tab-pane>

    <el-tab-pane class="ManagementContextPart" v-if="isRoot">
        <span slot="label" class="ManagementLable" style="color:red">
          Ⓡ&nbsp;权限管理
        </span>
        <JurisdictionManagement></JurisdictionManagement>
    </el-tab-pane>
   </el-tabs>
 </div>
</template>
<script>
import UserAuthenticationManagement from '../management-page/page/UserAuthenticationManagement'
import UserInfoManagement from '../management-page/page/UserInfoManagement'
import UserJurisdictionManagement from '../management-page/page/UserJurisdictionManagement'
import ManagementJurisdiction from './root/ManagementJurisdiction'
import JurisdictionManagement from './root/JurisdictionManagement'
export default {
  components: {
    UserAuthenticationManagement,
    UserInfoManagement,
    UserJurisdictionManagement,
    ManagementJurisdiction,
    JurisdictionManagement
  },
  data() {
    return {
      msg: '管理员界面',
      messageCount: '',
      rootMessageCount: '',
      isRoot: ''
    }
  },
  methods: {
    setMessageCount: function(val) {
      this.messageCount = val
    },
    setRootMessageCount: function(val) {
      this.rootMessageCount = val
    },
    getIsRoot: function() {
      this.$axios.post(
        'api/management/is-root',
        {},
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.isRoot = response.data
            // eslint-disable-next-line eqeqeq
          }
        }
      )
    }
  },
  mounted() {
    this.getIsRoot()
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/management-page/Management.css'
</style>
