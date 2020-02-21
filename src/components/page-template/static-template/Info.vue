<template>
<div class="InfoDiv">
    <ul>
    <li><router-link class="InfoA" to="my-resume" v-if="typeof (this.$store.state.token) != 'undefined'&&this.$store.state.token!=null&&this.$store.state.token!=''">我的简历</router-link></li>
    <li v-if="this.$store.state.jurisdiction.myApply==true||this.$store.state.jurisdiction.management==true"><router-link class="InfoA" to="my-apply">我的求职</router-link></li>
    <li v-if="this.$store.state.jurisdiction.myPublish==true||this.$store.state.jurisdiction.management==true"><router-link class="InfoA" to="my-find">我的招聘</router-link></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../styles/page-template/static-template/Info.css";
</style>
