<template>
 <div class="MyPublishPage">
    <el-dialog
        :visible.sync="dialogFormVisibleDelete"
        append-to-body center
        width="30%">
       <el-button style="position:relative;left:27%" type="primary" @click="deleteMyPublish()">确 定</el-button>
       <el-button style="position:relative;left:27%" @click="dialogFormVisibleDelete = false">取 消</el-button>
    </el-dialog>
    <div class="MyPublishContext" v-if="this.responseParam.total>0">
      <div class="MyPublishRedact">
        <ul>
            <li v-for="it in this.responseParam.list" :key="it.id">
            <el-button type="danger" style="margin-top:30%" @click="deleteMyPublishDialog(it.id)">删除</el-button>
            </li>
        </ul>
      </div>
      <div class="MyPublishContextContext">
        <ul class="MyPublishContextContextUl">
          <li v-for="(it,i) in this.responseParam.list" :key="i">
            <p class="fontArea"><span class="icon iconfont icon-icon_diqu" style="float:left"></span>{{it.cityName}}</p>
            <p class="fontContext"><span class="icon iconfont icon-gongzuojingli" style="float:left"></span>{{it.jobName}}</p>
            <p class="fontSalary"><span class="icon iconfont icon-xinzi" style="float:left"></span>{{it.salary}}</p>
            <p class="fontContactWay"><span class="icon iconfont icon-shouji1" style="float:left"></span>{{it.contactWay}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="MyPublishContext" style="text-align:center" v-else>
      <p style="color:grey;font-size:15px;line-height:550%;">用户暂时没有发布信息</p>
    </div>
    <div class="UserPublishPageTurn" v-if="this.responseParam.total>10">
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
      msg: '管理员模块-我的招聘',
      responseParam: {},
      deleteId: '',
      currentPage: 1,
      dialogFormVisibleDelete: false
    }
  },
  methods: {
    getMyPublish: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/get-user-publish',
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
    deleteMyPublishDialog: function(val) {
      this.deleteId = val
      this.dialogFormVisibleDelete = true
    },
    deleteMyPublish: function() {
      // eslint-disable-next-line eqeqeq
      if (this.deleteId != '') {
        this.$axios.post(
          'api/api/management/delete-user-publish',
          {
            id: this.deleteId
          },
          response => {
          // eslint-disable-next-line eqeqeq
            if (response.code == '200') {
              Message.success(response.message)
              this.getMyPublish()
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
      this.getMyPublish()
    }
  },
  watch: {
    currentPage: function() {
      this.getMyPublish()
    },
    userId: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.getMyPublish()
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../styles/management-page/static-template/UserPublish.css";
</style>
