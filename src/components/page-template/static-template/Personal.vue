<template>
<div>
  <nav class="nav">
    <input type="checkbox" class="nav__cb" id="menu-cb">
    <div class="nav__content">
      <ul class="nav__items">
        <li class="nav__item"> <span class="nav__item-text"> <router-link to="my-info"><p>个人中心</p></router-link> </span> </li>
        <li class="nav__item"> <span class="nav__item-text"> <router-link to="my-info"><p>账号设置</p></router-link> </span> </li>
        <li class="nav__item"> <span class="nav__item-text"> <router-link to="exit"><p>退出登录</p></router-link> </span> </li>
      </ul>
    </div>
    <label class="nav__btn" for="menu-cb"></label>
  </nav>
</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Personal'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/page-template/static-template/Personal.css";
</style>
