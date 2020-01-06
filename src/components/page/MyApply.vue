<template>
 <div class="MyApplyPage">
    <div class="MyApplyTop"><Top></Top></div>
    <div class="MyApplyAdd"><el-button type="info" style="width:100%" @click="dialogFormVisible = true">添加</el-button></div>
    <el-dialog title="添加求职信息" :visible.sync="dialogFormVisible" width="50%">
      <Select style="width:140%;" @setProvice='setRequestProvice'  @setProviceName='setRequestProviceName' @setJobType='setRequestJobType'
      @setJobTypeName='setRequestJobTypeName' @setCityName='setRequestCityName' @setCity='setRequestCity'  @setJobName='setRequestJobName' @setJob='setRequestJob'></Select>
      <el-form>
      <el-form-item label="薪资" :label-width="'80px'" style="float:left;margin:10px 15px 10px 0px">
          <el-input v-model="requestAddUrlParam.salary" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="'80px'" style="float:left;margin:10px 15px 10px 0px">
          <el-input v-model="requestAddUrlParam.contactWay" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMyApply()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="MyApplyContext">
      <div class="MyApplyRedact">
      <ul>
        <li v-for="it in responseSelectData.list" :key="it.id">
          <el-button type="primary" style="margin-top:25px;margin-left:0px">编辑</el-button>
          <el-button type="danger" style="margin-top:25px;margin-left:0px">删除</el-button>
        </li>
      </ul>
      </div>
      <Context v-bind:list="this.responseSelectData.list" v-bind:totaol="this.responseSelectData.total" v-bind:page-size="this.responseSelectData.pageSize" @pageTurn='setCurrentPage'></Context>
      <div class="MyApplyBottom"><Bottom></Bottom></div>
    </div>
  </div>
</template>

<script>
import Context from '../page-template/Context'
import Bottom from '../page-template/Bottom'
import Select from '../page-template/Select/Select'
export default {
  name: 'MyApply',
  components: {
    Context,
    Bottom,
    Select
  },
  data() {
    return {
      msg: '我的招聘',
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
        list: Array
      },
      dialogFormVisible: false
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
    addMyApply: function() {
      this.$axios.get(
        'api/api/apply/add-my-apply',
        this.requestAddUrlParam,
        response => {
          alert(response.message)
        }
      )
      this.dialogFormVisible = false
    },
    getMyApply: function() {
      this.$axios.get(
        'api/api/apply/my-apply',
        this.requestSelectUrlParam,
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.data.code == '200') {
            this.responseSelectData.list = response.data.data.list
            this.responseSelectData.total = response.data.data.total
            this.responseSelectData.pageSize = response.data.data.pageSize
            console.log(response)
          // eslint-disable-next-line eqeqeq
          } else if (response.data.code == '400') {
            alert(response.message)
          }
        }
      )
    }
  },
  mounted() {
    this.getMyApply()
  },
  watch: {
    requestSelectUrlParam: function() {
      this.getMyApply()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/MyApply.css";
</style>
