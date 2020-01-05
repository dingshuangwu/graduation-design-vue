<template>
 <div class="MyFindPage">
    <div class="MyFindTop"><Top></Top></div>
    <div class="MyFindAdd"><el-button type="info" style="width:100%" @click="dialogFormVisible = true">添加</el-button></div>
    <el-dialog title="添加求职信息" :visible.sync="dialogFormVisible" width="50%">
      <Select style="width:140%;" @setProvice='setRequestProvice' @setJobType='setRequestJobType' @setCity='setRequestCity' @setJob='setRequestJob'></Select>
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
        <el-button type="primary" @click="addMyFind()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="MyFindContext">
      <div class="MyFindRedact">
      <ul>
        <li v-for="(it , i) in responseSelectData.list" :key="i">
          <el-button type="primary" style="margin-top:25px;margin-left:0px">编辑</el-button>
          <el-button type="danger" style="margin-top:25px;margin-left:0px">删除</el-button>
        </li>
      </ul>
      </div>
      <Context :items="this.responseSelectData.list" :totaol="responseSelectData.total" :pageSize="responseSelectData.pageSize" @pageTurn='setCurrentPage'></Context>
      <div class="MyFindBottom"><Bottom></Bottom></div>
    </div>
  </div>
</template>

<script>
import Context from '../page-template/Context'
import Bottom from '../page-template/Bottom'
import Select from '../page-template/Select/Select'
export default {
  name: 'MyFind',
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
        city: '',
        jobType: '',
        job: '',
        salary: '',
        contactWay: ''
      },
      requestSelectUrlParam: {
        currentPage: Number
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
    setRequestCity: function(val) {
      this.requestAddUrlParam.city = val
    },
    setRequestJobType: function(val) {
      this.requestAddUrlParam.jobType = val
    },
    setRequestJob: function(val) {
      this.requestAddUrlParam.job = val
    },
    setCurrentPage: function(val) {
      this.requestSelectUrlParam.currentPage = val
    },
    addMyFind: function() {
      this.$axios.get(
        'api/api/apply/add-my-apply',
        this.requestAddUrlParam,
        response => {
          alert(response.message)
        }
      )
      this.dialogFormVisible = false
    },
    getMyFind: function() {
      this.$axios.get(
        'api/api/apply/my-apply',
        this.requestSelectUrlParam,
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == '200') {
            this.responseSelectData.list = response.data.list
            this.responseSelectData.total = response.data.total
            this.responseSelectData.pageSize = response.data.pageSize
            console.log(response)
          // eslint-disable-next-line eqeqeq
          } else if (response.code == '400') {
            alert(response.data.message)
          }
        }
      )
    }
  },
  mounted() {
  },
  watch: {
    requestSelectUrlParam: function() {
      this.getMyFind()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/MyFind.css";
</style>
