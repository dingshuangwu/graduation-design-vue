<template>
 <div class="MyApplyPage">
    <el-dialog
        :visible.sync="dialogFormVisibleDelete"
        append-to-body center
        width="30%">
       <el-button style="position:relative;left:27%" type="primary" @click="deleteMyApply()">确 定</el-button>
       <el-button style="position:relative;left:27%" @click="dialogFormVisibleDelete = false">取 消</el-button>
    </el-dialog>
    <div class="MyApplyContext" v-if="this.responseParam.total>0">
      <div class="MyApplyRedact">
        <ul>
            <li v-for="it in this.responseParam.list" :key="it.id">
            <el-button type="danger" style="margin-top:30%" @click="deleteMyApplyDialog(it.id)">删除</el-button>
            </li>
        </ul>
      </div>
      <div class="MyApplyContextContext">
        <ul class="MyApplyContextContextUl">
          <li v-for="(it,i) in this.responseParam.list" :key="i">
            <p class="fontArea">{{it.cityName}}</p>
            <p class="fontContext">{{it.jobName}}</p>
            <p class="fontSalary">{{it.salary}}</p>
            <p class="fontContactWay">{{it.contactWay}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="MyApplyContext" style="text-align:center" v-else>
      <p style="color:grey;font-size:15px;line-height:550%;">用户暂时没有发布信息</p>
    </div>
    <div class="UserApplyPageTurn" v-if="this.responseParam.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="responseParam.total"
       :current-page.sync="currentPage">
      </el-pagination>
    </div>
 </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  props: {
    userId: {
      default: ''
    }
  },
  data() {
    return {
      msg: '我的求职',
      responseParam: {},
      deleteId: '',
      currentPage: 1,
      dialogFormVisibleDelete: false
    }
  },
  methods: {
    getMyApply: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/get-user-apply',
          {
            authorId: this.userId,
            currentPage: this.currentPage
          },
          response => {
          // eslint-disable-next-line eqeqeq
            if (response.code == '200') {
              this.responseParam = response.data
              console.log(response)
            }
          }
        )
      }
    },
    deleteMyApplyDialog: function(val) {
      this.deleteId = val
      this.dialogFormVisibleDelete = true
    },
    deleteMyApply: function() {
      // eslint-disable-next-line eqeqeq
      if (this.deleteId != '') {
        this.$axios.post(
          'api/api/management/delete-user-apply',
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
      } else {
        Message.error('删除失败！')
      }
      this.dialogFormVisibleDelete = false
    }
  },
  mounted() {
    // eslint-disable-next-line eqeqeq
    if (this.userId != '') {
      this.getMyApply()
    }
  },
  watch: {
    currentPage: function() {
      this.getMyApply()
    },
    userId: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.getMyApply()
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../styles/management-page/static-template/UserApply.css";
</style>
