<template>
  <div class="ManagementPage">
      <div class="ManagementTop"><Top></Top></div>
      <div class="ManagementNav">
          <ul>
              <li v-bind:class="{'selected':selected==bar.region_name}" v-for="bar in navBar" :key="bar.code" @click="setClickedRegionName(bar.region_name)">{{bar.name}}</li>
          </ul>
      </div>
      <div class="ManagementContext" v-if="this.selected=='userManagement'">userManagement</div>
      <div class="ManagementContext" v-else-if="this.selected=='applyManagement'">applyManagement</div>
      <div class="ManagementContext" v-else-if="this.selected=='publishManagement'">publishManagement</div>
      <div class="ManagementContext" v-else-if="this.selected=='UserJurisdictionManagement'">UserJurisdictionManagement</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '管理员界面',
      selected: '',
      navBar: [
        {
          code: 1,
          region_name: 'userManagement',
          name: '用户管理'
        },
        {
          code: 2,
          region_name: 'applyManagement',
          name: '请求管理'
        },
        {
          code: 3,
          region_name: 'publishManagement',
          name: '发布管理'
        },
        {
          code: 4,
          region_name: 'UserJurisdictionManagement',
          name: '权限管理'
        }
      ],
      userManagementItems: [],
      applyManagementItems: [],
      publishManagementItems: [],
      userJurisdictionManagementItems: []
    }
  },
  methods: {
    setClickedRegionName(val) {
      this.selected = val
    }
  },
  mounted() {
    this.selected = 'userManagement'
  },
  watch: {
    // selected: function() {
    //   alert(this.selected)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/management-page/Management.css'
</style>
