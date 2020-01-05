<template>
 <div class="ApplyPage">
    <div class="ApplyTop"><Top></Top></div>
    <div class="ApplySelectPage">
      <div class="ApplySelect">
        <Select @setProvice='setRequestProvice' @setJobType='setRequestJobType' @setCity='setRequestCity' @setJob='setRequestJob'></Select>
      </div>
    </div>
    <div class="ApplyContext">
      <Context v-bind:items="items"></Context>
      <div class="ApplyBottom"><Bottom></Bottom></div>
    </div>
 </div>
</template>

<script>
import Context from '../page-template/Context'
import Bottom from '../page-template/Bottom'
import Select from '../page-template/Select/Select'
export default {
  name: 'Find',
  components: {
    Context,
    Bottom,
    Select
  },
  data() {
    return {
      msg: '我的发布',
      requestSelectUrlParam: {
        startPage: '',
        name: '',
        token: '',
        provice: '',
        city: '',
        jobType: '',
        job: ''
      },
      items: [
        {
          area: 'area',
          context: 'context',
          salary: 'salary',
          contactWay: 'contactWay'
        }, {
          area: 'area',
          context: 'context',
          salary: 'salary',
          contactWay: 'contactWay'
        }, {
          area: 'area',
          context: 'context',
          salary: 'salary',
          contactWay: 'contactWay'
        }
      ]
    }
  },
  methods: {
    setRequestProvice: function(val) {
      this.requestAddUrlParam.provice = val
      alert(this.requestAddUrlParam.provice)
    },
    setRequestCity: function(val) {
      this.requestAddUrlParam.city = val
      alert(this.requestAddUrlParam.city)
    },
    setRequestJobType: function(val) {
      this.requestAddUrlParam.jobType = val
      alert(this.requestAddUrlParam.jobType)
    },
    setRequestJob: function(val) {
      this.requestAddUrlParam.job = val
      alert(this.requestAddUrlParam.job)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/Apply.css";
</style>
