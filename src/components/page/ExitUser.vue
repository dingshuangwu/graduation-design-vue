<template >
  <div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
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
          if (response.code == '200') {
            this.$store.commit('setToken', '')
            this.$store.commit('setName', '')
            this.$store.commit('setJurisdiction', '')
            Message.success('退出成功')
          }
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
