<template>
<div class="Home">

    <ul v-if="getSize==0||!list||typeof (list) == 'undefined'">
      <li>
        <div class="Card">
          <p style="color:grey;align:center;font-size:15px;line-height:550%;">暂时还没有符合条件的职位</p>
        </div>
      </li>
    </ul>

    <ul v-else>
        <li v-for = "(it,i) in list" :key="i">
          <div class="Card">
            <div class="CardPart fontArea"><span class="icon iconfont icon-icon_diqu" style="position:relative;left:-8px"></span>{{it.cityName}}</div>
            <div class="CardPart fontContext">{{it.jobName}}</div>
            <div class="CardPart fontSalary">{{it.salary}}</div>
            <div class="CardPart fontContactWay"><span class="icon iconfont icon-shouji1" style="float:left"></span>{{it.contactWay}}</div>
          </div>
        </li>
    </ul>
  <div class="PageTurn">
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      msg: '发现职位',
      currentPage: 1
    }
  },
  methods: {

  },
  computed: {
    getSize: function() {
      return this.list.length
    }
  },
  watch: {
    currentPage: function() {
      this.$emit('pageTurn', this.currentPage)
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page-template/Context.css";
@import "../../styles/font/font.css";
</style>
