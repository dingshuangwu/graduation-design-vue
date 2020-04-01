<template>
  <div class="UserInfoManagementPage">
    <el-dialog
      :title="userName+'的个人资料'"
      :visible.sync="userInfoVisble"
      width="70%"
      :before-close="handleClose"
      append-to-body
      center>
      <UserInfo v-bind:user-id="this.userId"></UserInfo>
    </el-dialog>
    <el-dialog
      :title="userName+'的简历信息'"
      :visible.sync="userResumeVisble"
      width="70%"
      :before-close="handleClose"
      append-to-body
      center>
      <UserResume v-bind:user-id="this.userId"></UserResume>
    </el-dialog>
    <el-dialog
      :title="userName+'的求职信息'"
      :visible.sync="userApplyVisble"
      width="70%"
      :before-close="handleClose"
      append-to-body
      center>
      <UserApply v-bind:user-id="this.userId"></UserApply>
    </el-dialog>
    <el-dialog
      :title="userName+'的招聘信息'"
      :visible.sync="userPublishVisble"
      width="70%"
      :before-close="handleClose"
      append-to-body
      center>
      <UserPublish v-bind:user-id="this.userId"></UserPublish>
    </el-dialog>
    <div class="UserInfoManagementCardInfo">
      <ul>
        <li>用户</li>
        <li>个人资料</li>
        <li>简历信息</li>
        <li>求职信息</li>
        <li>招聘信息</li>
      </ul>
      <div style="width:30%;height:92%;float:left;padding-top:0.3%">
        <el-input
          placeholder="输入关键字"
          prefix-icon="el-icon-search"
          maxlength="20"
          size="small"
          v-model="inputName"
          clearable
          style="width:60%">
        </el-input>
        <el-button type="primary" round style="width:16%;height:80%;margin:0;padding:0" @click="research()">搜索</el-button>
        <el-button type="success" round style="width:16%;height:80%;margin:0;padding:0" @click="reset()">重置</el-button>
      </div>
    </div>
    <ul class="UserInfoManagementUl" v-if="this.responseParam.total>0">
      <li v-for="(it,i) in this.responseParam.list" :key="i" class="UserInfoManagementLi">
        <div class="UserInfoManagementLiDiv">
          <span>{{it.name}}</span>
          <span>
          <el-button type="primary" size="mini" style="margin:0;padding-left:9%;padding-right:9%" @click="clickUserInfo(it.id,it.name)">查 看</el-button>
          </span>
          <span>
            <el-button type="primary" size="mini" style="margin:0;padding-left:9%;padding-right:9%" @click="clickUserResume(it.id,it.name)">查 看</el-button>
          </span>
          <span>
            <el-button type="primary" size="mini" style="margin:0;padding-left:9%;padding-right:9%" @click="clickUserApply(it.id,it.name)">查 看</el-button>
          </span>
          <span>
            <el-button type="primary" size="mini" style="margin:0;padding-left:9%;padding-right:9%" @click="clickUserPublish(it.id,it.name)">查 看</el-button>
          </span>
        </div>
        <div>&nbsp;</div>
      </li>
    </ul>
    <div style="margin:0;padding:5% 30% 5% 0;font-size:15px" v-else>暂无满足条件的用户</div>
    <div class="UserInfoManagementPageTurn" v-if="this.responseParam.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="responseParam.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import UserInfo from '../static-template/UserInfo'
import UserResume from '../static-template/UserResume'
import UserApply from '../static-template/UserApply'
import UserPublish from '../static-template/UserPublish'
export default {
  data() {
    return {
      msg: '用户信息管理模块',
      inputName: '',
      currentPage: 1,
      responseParam: [],
      responseUserInfo: {},
      responseUserResume: {},
      responseUserApply: [],
      responseUserPublish: [],
      userInfoVisble: false,
      userResumeVisble: false,
      userApplyVisble: false,
      userPublishVisble: false,
      userId: '',
      userName: ''
    }
  },
  components: {
    UserInfo,
    UserResume,
    UserApply,
    UserPublish
  },
  methods: {
    getUserListAll: function() {
      this.$axios.post(
        'api/management/get-user-list',
        {
          name: null,
          currentPage: this.currentPage
        },
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam = response.data
            // eslint-disable-next-line eqeqeq
          }
        }
      )
    },
    getUserListByName: function() {
      this.$axios.post(
        'api/management/get-user-list',
        {
          name: this.inputName,
          currentPage: this.currentPage
        },
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == 200 && response.data != null) {
            this.responseParam = response.data
            console.log(this.responseParam)
            Message.success(response.message)
            // eslint-disable-next-line eqeqeq
          } else if (response.code == 200 && response.data == null) {
            this.responseParam = { total: 0 }
          }
        }
      )
    },
    reset: function() {
      this.inputName = ''
      this.currentPage = 1
      this.getUserListAll()
    },
    research: function() {
      // eslint-disable-next-line eqeqeq
      if (this.inputName == null || this.inputName == '') {
        this.currentPage = 1
      // eslint-disable-next-line eqeqeq
      } else if (this.inputName.indexOf(' ') != -1) {
        this.currentPage = 1
        Message.error('用户名不能有空格')
      } else {
        this.currentPage = 1
        this.getUserListByName()
      }
    },
    handleClose: function() {
      this.userInfoVisble = false
      this.userResumeVisble = false
      this.userApplyVisble = false
      this.userPublishVisble = false
      this.responseUserInfo = {}
      this.responseUserResume = {}
      this.responseUserApply = []
      this.responseUserPublish = []
    },
    clickUserInfo: function(id, name) {
      this.userId = id
      this.userName = name
      this.userInfoVisble = true
    },
    clickUserResume: function(id, name) {
      this.userId = id
      this.userName = name
      this.userResumeVisble = true
    },
    clickUserApply: function(id, name) {
      this.userId = id
      this.userName = name
      this.userApplyVisble = true
    },
    clickUserPublish: function(id, name) {
      this.userId = id
      this.userName = name
      this.userPublishVisble = true
    }
  },
  watch: {
    currentPage: function() {
      this.getUserListAll()
    }
  },
  mounted() {
    this.getUserListAll()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../styles/management-page/page/UserInfoManagement.css'
</style>
