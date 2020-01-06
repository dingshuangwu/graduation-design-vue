<template >
  <div>
  </div>
</template>

<script> /* 旋转分散 */
export default {
  name: 'Exit',
  data() {
    return {
      msg: '退出登录'
    }
  },
  methods: {
    exitUser: function() {
      this.$axios.post(
        'api/api/login/loginOut',
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.data.code == '200') {
            this.$store.commit('setToken', '')
            this.$store.commit('setName', '')
            this.$store.commit('setJurisdiction', '')
            alert('退出成功')
          } else {
            alert('退出失败')
          }
          this.$router.push({ path: '/' })
        },
        error => {
          console.log(error)
          this.$router.push({ path: '/' })
        }
      )
    }
  },
  mounted() {
    setTimeout(this.exitUser(), 10)
  }
}

</script>

  <!--Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>
