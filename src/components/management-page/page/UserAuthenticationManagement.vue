<template>
<div class="RealNameAuthenticationManagementPage">
  <div class="RealNameAuthenticationManagementCardInfo">
    <ul>
      <li>用户</li>
      <li>身份证正面照</li>
      <li>身份证反面照</li>
      <li>最近一年内的照片</li>
      <li>申请日期</li>
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
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    append-to-body
    center>
    <img :src="dialogContext" style="width:60%;margin-left:20%;border:black 3px solid">
  </el-dialog>
  <ul class="RealNameAuthenticationManagementUl" v-if="this.responseParam.total>0">
    <li v-for="(it,i) in this.responseParam.list" :key="i" class="RealNameAuthenticationManagementLi">
      <div class="RealNameAuthenticationManagementLiDiv">
        <span style="line-height:870%">{{it.name}}</span>
        <span style="padding-top:0.4%">
          <img :src="it.identityCardFront" alt="获取错误" @click="openDialog(it.identityCardFront)">
        </span>
        <span style="padding-top:0.4%">
          <img :src="it.identityCardReverse" alt="获取错误" @click="openDialog(it.identityCardReverse)">
        </span>
        <span style="padding-top:0.4%">
          <img :src="it.currentPhoto" alt="获取错误" @click="openDialog(it.currentPhoto)">
        </span>
        <span style="line-height:870%">
          {{it.applyDate}}
        </span>
        <span style="line-height:870%;width:20%">
          <el-button type="success" @click="realNameAuthenticationPass(it.id)">通 过</el-button><!--通过后，开启用户申请成为管理员的权限以及我的招聘，我的求职、查看求职等权限-->
          <el-button type="danger" @click="realNameAuthenticationReject(it.id)">拒 绝</el-button><!--拒绝后将flag置为reject，并且开启用户的实名认证权限 -->
        </span>
      </div>
      <div>&nbsp;</div>
    </li>
  </ul>
  <div style="margin:0;padding:5% 30% 5% 0;font-size:15px" v-else>暂无满足条件的用户</div>
  <div class="RealNameAuthenticationManagementPageTurn" v-if="this.responseParam.total>10">
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
export default {
  data() {
    return {
      msg: '用户实名认证管理模块',
      inputName: '',
      currentPage: 1,
      responseParam: {
        total: 0
      },
      dialogVisible: false,
      dialogContext: ''
    }
  },
  methods: {
    getAllInfo: function() {
      this.$axios.post(
        'api/management/real-name-authentication',
        {
          name: null,
          currentPage: 1
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam = response.data
          }
        }
      )
    },
    getSomeBody: function() {
      this.$axios.post(
        'api/management/real-name-authentication',
        {
          name: this.inputName,
          currentPage: 1
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam = response.data
          }
        }
      )
    },
    reset: function() {
      this.inputName = ''
      this.currentPage = 1
      this.getAllInfo()
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
        this.getSomeBody()
      }
    },
    handleClose: function() {
      this.dialogVisible = false
      this.dialogContext = ''
    },
    openDialog: function(val) {
      this.dialogContext = val
      this.dialogVisible = true
    },
    realNameAuthenticationPass: function(id) {
      // eslint-disable-next-line eqeqeq
      if (id != null && id != '' && typeof (id) !== 'undefined') {
        this.$axios.post(
          'api/management/real-name-authentication-pass',
          {
            id: id
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              Message.success(response.message)
              this.getAllInfo()
            }
          }
        )
      } else {
        Message.error('用户id不能为空！')
      }
    },
    realNameAuthenticationReject: function(id) {
      // eslint-disable-next-line eqeqeq
      if (id != null && id != '' && typeof (id) !== 'undefined') {
        this.$axios.post(
          'api/management/real-name-authentication-reject',
          {
            id: id
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              Message.success(response.message)
              this.getAllInfo()
            }
          }
        )
      } else {
        Message.error('用户id不能为空！')
      }
    }
  },
  mounted() {
    this.getAllInfo()
    if (this.responseParam.total <= 0) {
      this.$emit('setMessageCount', '')
    } else {
      this.$emit('setMessageCount', this.responseParam.total)
    }
  },
  watch: {
    currentPage: function() {
      this.getAllInfo()
    },
    'responseParam.total': function() {
      if (this.responseParam.total <= 0) {
        this.$emit('setMessageCount', '')
      } else {
        this.$emit('setMessageCount', this.responseParam.total)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../styles/management-page/page/UserAuthenticationManagement.css'
</style>
