<template>
 <div class="MyApplyPage">
    <div class="MyApplyTop"><Top></Top></div>
    <div class="MyApplyAdd"><el-button type="info" style="width:100%" @click="dialogFormVisible = true">添加</el-button></div>
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="MyApplyContext">
      <div class="MyApplyRedact">
      <ul>
        <li v-for="(it , i) in items" :key="i">
          <el-button type="primary" style="margin-top:25px;margin-left:0px">编辑</el-button>
          <el-button type="danger" style="margin-top:25px;margin-left:0px">删除</el-button>
        </li>
      </ul>
      </div>
      <Context v-bind:items="items"></Context>
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
      msg: '我的求职',
      requestAddUrlParam: {
        provice: '',
        city: '',
        jobType: '',
        job: '',
        salary: '',
        contactWay: ''
      },
      requestSelectUrlParam: {
        startPage: '',
        name: '',
        token: ''
      },
      responseData: {
        total: '',
        pageSize: ''
      },
      dialogFormVisible: false,

      items: [
        {
          area: '合肥',
          context: '音乐老师',
          salary: '200/小时',
          contactWay: '17856165587'
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
  },
  mounted() {
  },
  watch: {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../styles/page/MyApply.css";
</style>
