<template>
 <div class="ApplyPage">
    <div class="ApplyTop"><Top></Top></div>
    <div class="ApplySelectPage">
      <div class="ApplySelect">
        <Select @setProvice='setRequestProvice' @setJobType='setRequestJobType' @setCity='setRequestCity' @setJob='setRequestJob'></Select>
      </div>
    </div>
    <div class="ApplyContext">
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
      requestSelectUrlParam: {
        provice: '',
        city: '',
        jobType: '',
        job: '',
        currentPage: 1
      },
      responseSelectData: {
        // total: Number,
        // pageSize: Number,
        // list: Array
        total: 17,
        pageSize: 8,
        list: [
          {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }, {
            cityName: 'area',
            jobName: 'context',
            salary: 'salary',
            contactWay: 'contactWay'
          }
        ]
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
      alert(this.requestSelectUrlParam.currentPage)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/Apply.css";
</style>
