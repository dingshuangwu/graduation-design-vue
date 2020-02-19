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
    <el-dialog title="编辑求职信息" :visible.sync="dialogFormVisibleUpdate" width="50%">
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
        <el-button @click="dialogFormVisibleUpdate = false">取 消</el-button>
        <el-button type="primary" @click="updateMyApply()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除求职信息" :visible.sync="dialogFormVisibleDelete" width="50%">
       <el-button @click="dialogFormVisibleDelete = false">取 消</el-button>
       <el-button type="primary" @click="deleteMyApply()">确 定</el-button>
    </el-dialog>
    <div class="MyApplyContext">
      <div class="MyApplyRedact">
      <ul>
        <li v-for="it in responseSelectData.list" :key="it.id">
          <el-button type="primary" style="margin-top:25px;margin-left:0px" @click="updateMyApplyDialog(it.id)">编辑</el-button>
          <el-button type="danger" style="margin-top:25px;margin-left:0px" @click="deleteMyApplyDialog(it.id)">删除</el-button>
        </li>
      </ul>
      </div>
      <Context v-bind:list="this.responseSelectData.list" v-bind:total="this.responseSelectData.total" v-bind:page-size="this.responseSelectData.pageSize" @pageTurn='setCurrentPage'></Context>
    </div>
    <div class="MyApplyBottom"><Bottom></Bottom></div>
  </div>
</template>

<script>
import Context from '../page-template/Context'
import Bottom from '../page-template/Bottom'
import Select from '../page-template/Select/Select'
import { Message } from 'element-ui'
export default {
  name: 'MyApply',
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
    addMyApply: function() {
      if (this.requestAddUrlParam.job == '' || this.requestAddUrlParam.city == '') {
        Message.error('请选择城市或职业类型！')
      } else {
        this.$axios.get(
          'api/api/apply/add-my-apply',
          this.requestAddUrlParam,
          response => {
          // eslint-disable-next-line eqeqeq
            if (response.code == '200') {
              Message.success(response.message)
              this.getMyApply()
            }
          }
        )
        this.dialogFormVisible = false
      }
    },
    getMyApply: function() {
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
          }
        }
      )
    },
    updateMyApplyDialog: function(val) {
      this.requestAddUrlParam.id = val
      this.dialogFormVisibleUpdate = true
    },
    updateMyApply: function() {
      if (this.requestAddUrlParam.job == '' || this.requestAddUrlParam.city == '') {
        Message.error('请选择城市或职业类型！')
      } else {
        this.$axios.get(
          'api/api/apply/update-my-apply',
          this.requestAddUrlParam,
          response => {
          // eslint-disable-next-line eqeqeq
            if (response.code == '200') {
              Message.success(response.message)
              this.getMyApply()
            }
          }
        )
        this.dialogFormVisibleUpdate = false
      }
    },
    deleteMyApplyDialog: function(val) {
      this.deleteId = val
      this.dialogFormVisibleDelete = true
    },
    deleteMyApply: function() {
      this.$axios.get(
        'api/api/apply/delete-my-apply',
        {
          id: this.deleteId
        },
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == '200') {
            Message.success(response.message)
            this.getMyApply()
          }
        }
      )
      this.dialogFormVisibleDelete = false
    }
  },
  mounted() {
    this.getMyApply()
  },
  watch: {
    'requestSelectUrlParam.currentPage': function() {
      this.getMyApply()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/MyApply.css";
</style>
