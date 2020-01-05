<template>
<div>
<div class="Nav"><Nav/></div>
<div class="User"><User/></div>
<div class="Info"><Info/></div>
</div>
</template>
<script>
import Nav from '../static-template/Nav'
import User from '../static-template/User'
import Info from '../static-template/Info'
export default {
  data() {
    return {
      msg: ''
    }
  },
  components: {
    Nav,
    User,
    Info
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../styles/page-template/static-template/Top.css"
</style>
