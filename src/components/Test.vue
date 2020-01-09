<template>
 <div class="MyFindPage">
    <div class="MyFindTop"><Top></Top></div>
  </div>
</template>

<script>
import Context from './page-template/Context'
import Bottom from './page-template/Bottom'
import Select from './page-template/Select/Select'
import { Message } from 'element-ui'
export default {
  name: 'MyFind',
  components: {
    Context,
    Bottom,
    Select
  },
  data() {
    return {
      msg: '我的求职',
      deleteId: '',
      requestAddUrlParam: {
        provice: '',
        proviceName: '',
        city: '',
        cityName: '',
        jobType: '',
        jobTypeName: '',
        job: '',
        jobName: '',
        salary: '',
        contactWay: ''
      },
      requestSelectUrlParam: {
        currentPage: 1
      },
      responseSelectData: {
        total: Number,
        pageSize: Number,
        list: []
      },
      dialogFormVisible: false,
      dialogFormVisibleDelete: false,
      dialogFormVisibleUpdate: false
    }
  },
  methods: {
    setRequestProvice: function(val) {
      this.requestAddUrlParam.provice = val
    },
    setRequestProviceName: function(val) {
      this.requestAddUrlParam.proviceName = val
    },
    setRequestCity: function(val) {
      this.requestAddUrlParam.city = val
    },
    setRequestCityName: function(val) {
      this.requestAddUrlParam.cityName = val
    },
    setRequestJobType: function(val) {
      this.requestAddUrlParam.jobType = val
    },
    setRequestJobTypeName: function(val) {
      this.requestAddUrlParam.jobTypeName = val
    },
    setRequestJob: function(val) {
      this.requestAddUrlParam.job = val
    },
    setRequestJobName: function(val) {
      this.requestAddUrlParam.jobName = val
    },
    setCurrentPage: function(val) {
      this.requestSelectUrlParam.currentPage = val
    },
    addMyFind: function() {
      this.$axios.get(
        'api/api/publish/add-my-publish',
        this.requestAddUrlParam,
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == '200') {
            Message.success(response.message)
            this.getMyFind()
          }
        }
      )
      this.dialogFormVisible = false
    },
    getMyFind: function() {
      this.$axios.get(
        'api/api/publish/my-publish',
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
    updateMyFindDialog: function(val) {
      this.requestAddUrlParam.id = val
      this.dialogFormVisibleUpdate = true
    },
    updateMyFind: function() {
      this.$axios.get(
        'api/api/publish/update-my-publish',
        this.requestAddUrlParam,
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == '200') {
            Message.success(response.message)
            this.getMyFind()
          }
        }
      )
      this.dialogFormVisibleUpdate = false
    },
    deleteMyFindDialog: function(val) {
      this.deleteId = val
      this.dialogFormVisibleDelete = true
    },
    deleteMyFind: function() {
      this.$axios.get(
        'api/api/publish/delete-my-publish',
        {
          id: this.deleteId
        },
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == '200') {
            Message.success(response.message)
            this.getMyFind()
          }
        }
      )
      this.dialogFormVisibleDelete = false
    }
  },
  mounted() {
    this.getMyFind()
  },
  watch: {
    'requestSelectUrlParam.currentPage': function() {
      this.getMyFind()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../styles/page/MyFind.css";
</style>
