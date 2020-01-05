<template>
<div>
  <div class="SelectPage">
    <label>所在地址:</label>
    <div class="SelectPart">
      <div class="SelectSelect">
          <select class="form-control" v-model="provice" @change="changeProvice($event)">
            <option value="">--请选择--</option>
            <option v-for="(item,index) in proviceItems" :key="index" :value='item.regid'>{{item.regname}}</option>
          </select>
      </div>
      <div class="SelectSelect">
          <select class="form-control" v-model="city" @change="changeCity($event)">
            <option value="">--请选择--</option>
            <option v-for="(item,index) in cityItems" :key="index" :value="item.regid">{{item.regname}}</option>
          </select>
      </div>
    </div>
  </div>
  <div class="SelectPage">
    <label>兼职类型:</label>
    <div class="SelectPart">
      <div class="SelectSelect">
          <select class="form-control" v-model="jobType" @change="changeJobType($event)">
            <option value="">--请选择--</option>
            <option v-for="(item,index) in jobTypes" :key="index" :value='item.regid'>{{item.regname}}</option>
          </select>
      </div>
      <div class="SelectSelect">
          <select class="form-control" v-model="job" @change="changeJob($event)">
            <option value="">--请选择--</option>
            <option v-for="(item,index) in jobs" :key="index" :value='item.regid'>{{item.regname}}</option>
          </select>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { cityMessage } from '../Select/js/area'
import { jobMessage } from '../Select/js/job'
export default {
  name: 'Select',
  data() {
    return {
      msg: 'Select',
      cityMessage: cityMessage,
      jobMessage: jobMessage,
      proviceItems: [],
      cityItems: [],
      jobTypes: [],
      jobs: [],
      jobType: '',
      job: '',
      provice: '',
      city: ''
    }
  },
  methods: {
    getProvice: function() {
      var lists = []
      for (var i = 0; i < this.cityMessage.length; i++) {
        if (cityMessage[i].parid === '1') {
          lists.push(cityMessage[i])
        }
      }
      this.proviceItems = lists
    },
    getJobType: function() {
      var lists = []
      for (var i = 0; i < this.jobMessage.length; i++) {
        if (jobMessage[i].parid === '1') {
          lists.push(jobMessage[i])
        }
      }
      this.jobTypes = lists
    },
    getCityByProviceId: function(val) {
      var lists = []
      for (var i = 0; i < this.cityMessage.length; i++) {
        if (cityMessage[i].parid === val) {
          lists.push(cityMessage[i])
        }
      }
      return lists
    },
    getJobsByJobTypeId: function(val) {
      var lists = []
      for (var i = 0; i < this.jobMessage.length; i++) {
        if (jobMessage[i].parid === val) {
          lists.push(jobMessage[i])
        }
      }
      return lists
    },
    changeProvice(event) {
      this.provice = event.target.value // 获取商品ID，即option对应的ID值
      this.city = ''
    },
    changeJobType(event) {
      this.jobType = event.target.value // 获取商品ID，即option对应的ID值
      this.job = ''
    },
    changeCity(event) {
      this.city = event.target.value // 获取商品ID，即option对应的ID值
    },
    changeJob(event) {
      this.job = event.target.value // 获取商品ID，即option对应的ID值
    }
  },
  mounted() {
    setTimeout(this.getProvice, 10)
    setTimeout(this.getJobType, 10)
  },
  watch: {
    provice: function(val) {
      this.cityItems = this.getCityByProviceId(val)
      this.$emit('setProvice', this.provice)
      this.city = ''
    },
    jobType: function(val) {
      this.jobs = this.getJobsByJobTypeId(val)
      this.$emit('setJobType', this.jobType)
      this.job = ''
    },
    city: function(val) {
      this.$emit('setCity', this.city)
    },
    job: function(val) {
      this.$emit('setJob', this.job)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../styles/page-template/Select.css'
</style>
