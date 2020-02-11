<template>
 <div class="ApplyPage">
    <div class="ApplyTop"><Top></Top></div>
    <el-dialog
      :title="someBodyName+'的简历'"
      :visible.sync="someBodyResumeVisble"
      width="1000px"
      :before-close="handleClose">
      <GetSomeBodyResume v-bind:user-name="this.someBodyName"></GetSomeBodyResume>
    </el-dialog>
    <span v-if="btnFlag" class="icon iconfont icon-top ApplyIconTop" @click="backTop"></span>
    <div class="ApplySelectPage">
      <div class="ApplySelect">
        <Select v-bind:select-title="this.selectTitle" @setProvice='setRequestProvice' @setJobType='setRequestJobType' @setCity='setRequestCity' @setJob='setRequestJob'></Select>
      </div>
    </div>
    <div class="ApplyContext">
      <div class="ApplyUserInfo">
        <ul>
        <li class="fontAuthorName" v-for="(it,i) in responseSelectData.list" :key="i" @click="setSomeBodyName(it.authorName)">
          <span class="icon iconfont icon-moban" style="float:left"></span>{{it.authorName}}
        </li>
        </ul>
      </div>
      <Context v-bind:list="this.responseSelectData.list" v-bind:total="this.responseSelectData.total" v-bind:page-size="this.responseSelectData.pageSize" @pageTurn='setCurrentPage'></Context>
      <div class="ApplyBottom"><Bottom></Bottom></div>
    </div>
 </div>
</template>

<script>
import Context from '../page-template/Context'
import Bottom from '../page-template/Bottom'
import Select from '../page-template/Select/Select'
import GetSomeBodyResume from '../page-template/static-template/GetSomeBodyResume'
export default {
  name: 'Apply',
  components: {
    Context,
    Bottom,
    Select,
    GetSomeBodyResume
  },
  data() {
    return {
      msg: '我的求职',
      selectTitle: '全部',
      someBodyName: '',
      someBodyResumeVisble: false,
      requestSelectUrlParam: {
        provice: '',
        city: '',
        jobType: '',
        job: '',
        currentPage: 1
      },
      responseSelectData: {
        total: Number,
        pageSize: Number,
        list: []
      },
      btnFlag: false
    }
  },
  methods: {
    setRequestProvice: function(val) {
      this.requestSelectUrlParam.provice = val
    },
    setRequestCity: function(val) {
      this.requestSelectUrlParam.city = val
    },
    setRequestJobType: function(val) {
      this.requestSelectUrlParam.jobType = val
    },
    setRequestJob: function(val) {
      this.requestSelectUrlParam.job = val
    },
    setCurrentPage: function(val) {
      this.requestSelectUrlParam.currentPage = val
    },
    getApply: function() {
      this.$axios.get(
        'api/api/apply/all-apply',
        this.requestSelectUrlParam,
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == '200') {
            this.responseSelectData.list = response.data.list
            this.responseSelectData.total = response.data.total
            this.responseSelectData.pageSize = response.data.pageSize
            console.log(response)
          }
        }
      )
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    // 为了计算距离顶部的高度，当高度大于200显示回顶部图标，小于200则隐藏
    scrollToTop() {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 200) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    setSomeBodyName(name) {
      this.someBodyName = name
      this.someBodyResumeVisble = true
    },
    handleClose() {
      this.someBodyName = ''
      this.someBodyResumeVisble = false
    }
  },
  watch: {
    requestSelectUrlParam: {
      deep: true,
      handler: function() {
        this.getApply()
      }
    }
  },
  mounted() {
    this.getApply()
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/Apply.css";
@import "../../styles/font/font.css"
</style>
