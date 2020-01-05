<template>
<div class="Home">
    <ul v-if="getSize()!=0">
        <li v-for = "(it,i) in this.props.items" :key="i">
          <router-link to="my">
          <div class="Card">
            <div class="CardPart fontArea">{{it.area}}</div>
            <div class="CardPart fontContext">{{it.context}}</div>
            <div class="CardPart fontSalary">{{it.salary}}</div>
            <div class="CardPart fontContactWay">{{it.contactWay}}</div>
          </div>
          </router-link>
        </li>
    </ul>

    <ul v-else>
      <li>
        <div class="Card">
          <p style="color:grey;align:center;font-size:15px;line-height:550%;">暂时还没有符合条件的职位</p>
        </div>
      </li>
    </ul>
  <div class="PageTurn">
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-size="this.props.pageSize"
      layout="prev, pager, next, jumper"
      :total="this.props.total">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
  props: {
    items: Array,
    total: Number,
    pageSize: Number
  },
  data() {
    return {
      msg: '发现职位',
      currentPage: 1
    }
  },
  methods: {
    getSize: function() {
      return this.items.length
    }
  },
  watch: {
    currentPage: function() {
      this.$emit('pageTurn', this.currentPage)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page-template/Context.css";
@import "../../styles/font/font.css";
</style>
