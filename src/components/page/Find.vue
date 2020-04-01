<template>
 <div class="FindPage">
    <div class="FindTop"><Top></Top></div>
    <el-dialog
      :title="someBodyName+'的信息'"
      :visible.sync="someBodyInfoVisble"
      width="1000px"
      :before-close="handleClose">
      <SomeBodyInfo v-bind:user-name="this.someBodyName"></SomeBodyInfo>
    </el-dialog>
    <span v-if="btnFlag" class="icon iconfont icon-top FindIconTop" @click="backTop"></span>
    <div class="FindSelectPage">
      <div class="FindSelect">
        <Select v-bind:select-title="this.selectTitle" @setProvice='setRequestProvice' @setJobType='setRequestJobType' @setCity='setRequestCity' @setJob='setRequestJob'></Select>
      </div>
    </div>
    <div class="FindContext">
      <div class="FindUserInfo" v-if="typeof (this.$store.state.token) != 'undefined'&&this.$store.state.token!=null&&this.$store.state.token!=''">
        <ul>
        <li class="fontAuthorName" v-for="(it,i) in responseSelectData.list" :key="i" @click="setSomeBodyName(it.authorName)">
          <span class="icon iconfont icon-moban" style="float:left"></span>{{it.authorName}}
        </li>
        </ul>
      </div>
      <div class="FindUserInfoNoToken" v-else>
        <ul>
        <li class="fontAuthorName" v-for="(it,i) in responseSelectData.list" :key="i">
          <span class="icon iconfont icon-moban" style="float:left"></span>{{it.authorName}}
        </li>
        </ul>
      </div>
      <Context v-bind:list="this.responseSelectData.list" v-bind:total="this.responseSelectData.total" v-bind:page-size="this.responseSelectData.pageSize" @pageTurn='setCurrentPage'></Context>
    </div>
    <div class="FindBottom"><Bottom></Bottom></div>
 </div>
</template>

<script>
import Context from '../page-template/Context'
import Bottom from '../page-template/Bottom'
import Select from '../page-template/Select/Select'
import SomeBodyInfo from '../page-template/static-template/SomeBodyInfo'
export default {
  name: 'Find',
  components: {
    Context,
    Bottom,
    Select,
    SomeBodyInfo
  },
  data() {
    return {
      msg: '我的发布',
      selectTitle: '全部',
      someBodyName: '',
      someBodyInfoVisble: false,
      requestSelectUrlParam: {
        provice: '',
        city: '',
        jobType: '',
        job: '',
        currentPage: 1
      },
      responseSelectData: {
        total: 0,
        pageSize: 0,
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
    getFind: function() {
      this.$axios.get(
        'api/publish/all-publish',
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
      this.someBodyInfoVisble = true
    },
    handleClose() {
      this.someBodyName = ''
      this.someBodyInfoVisble = false
    }
  },
  watch: {
    requestSelectUrlParam: {
      deep: true,
      handler: function() {
        this.getFind()
      }
    }
  },
  mounted() {
    this.getFind()
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/Find.css";
@import "../../styles/font/font.css"
</style>
