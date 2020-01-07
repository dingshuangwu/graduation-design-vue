<template>
 <div class="ApplyPage">
    <div class="ApplyTop"><Top></Top></div>
    <div class="ApplySelectPage">
      <div class="ApplySelect">
        <Select v-bind:select-title="this.selectTitle" @setProvice='setRequestProvice' @setJobType='setRequestJobType' @setCity='setRequestCity' @setJob='setRequestJob'></Select>
      </div>
    </div>
    <div class="ApplyContext">
      <div class="ApplyUserInfo">
        <ul>
        <li v-for="it in responseSelectData.list" :key="it.authorId">
          用户名
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
export default {
  name: 'Apply',
  components: {
    Context,
    Bottom,
    Select
  },
  data() {
    return {
      msg: '我的求职',
      selectTitle: '全部',
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
      }
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
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/Apply.css";
</style>
