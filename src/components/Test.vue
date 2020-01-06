<template>
<div>
  <Top/>
</div>
</template>

<script>
export default {
  name: 'Select',
  data() {
    return {
      msg: 'Select'
    }
  },
  methods: {},
  mounted() {
    alert(this.$store.state.name)
    alert(this.$store.state.token)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../styles/page-template/Select.css'
</style>
