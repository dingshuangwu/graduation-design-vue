<template>
 <div class="ManagementJurisdictionPage">
  <el-dialog
    :visible.sync="realNamePhotoVisible"
    width="50%"
    :before-close="handleClosePhoto"
    append-to-body
    center>
    <div class="realNamePhotoDialog"><img :src="this.realNamePhotoContext" alt="显示错误"></div>
  </el-dialog>
  <el-dialog
    title="实名信息"
    :visible.sync="realNameInfoVisible"
    width="50%"
    :before-close="handleClose"
    append-to-body
    center>
    <div class="ManagementRealNameDialog">
        <img :src="this.realNameInfoContext.identityCardFront" style="margin-left:12%" alt="显示错误" @click="openRealNamePhoto(realNameInfoContext.identityCardFront)">
        <img :src="this.realNameInfoContext.identityCardReverse" alt="显示错误" @click="openRealNamePhoto(realNameInfoContext.identityCardReverse)">
        <img :src="this.realNameInfoContext.currentPhoto" alt="显示错误" @click="openRealNamePhoto(realNameInfoContext.currentPhoto)">
        <p>发布时间：&nbsp;{{this.realNameInfoContext.applyDate}}</p>
    </div>
  </el-dialog>
  <el-dialog
    title="申请信息"
    :visible.sync="applyVisible"
    width="50%"
    :before-close="handleClose"
    append-to-body
    center>
    <div class="ManagementApplyDialog">
        <el-input
            type="textarea"
            :rows="7"
            placeholder="请输入内容"
            :value="applyInfoContext"
            readonly
            style="width:80%;display:block;margin:auto">
        </el-input>
    </div>
  </el-dialog>
  <div class="ManagementJurisdictionCardInfo">
    <ul>
      <li>用户</li>
      <li>实名信息</li>
      <li>申请信息</li>
      <li>联系方式</li>
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
  <ul class="ManagementJurisdictionUl" v-if="this.responseParam.total>0">
    <li v-for="(it,i) in this.responseParam.list" :key="i" class="ManagementJurisdictionLi">
      <div class="ManagementJurisdictionLiDiv">
        <span style="line-height:870%">{{it.name}}</span>
        <span style="padding-top:4%">
          <el-button type="primary" round size="small" @click="openRealNameDialog(it.id)">点击查看</el-button>
        </span>
        <span style="padding-top:4%">
          <el-button type="primary" round size="small" @click="openApplyDialog(it.context)">点击查看</el-button>
        </span>
        <span style="padding-top:4.4%;">
          <span>&nbsp;</span><span class="icon iconfont icon-shouji1"></span><p style="margin:0;padding:0;display:inline-block;float:left">{{it.contactWay}}</p>
        </span>
        <span style="line-height:870%">
          {{it.applyDate}}
        </span>
        <span style="line-height:870%;width:20%">
          <el-button type="success" @click="applyForManagementPass(it.id)">通 过</el-button><!--通过后，开启用户申请成为管理员的权限以及我的招聘，我的求职、查看求职等权限-->
          <el-button type="danger" @click="applyForManagementReject(it.id)">拒 绝</el-button><!--拒绝后将flag置为reject，并且开启用户的实名认证权限 -->
        </span>
      </div>
      <div>&nbsp;</div>
    </li>
  </ul>
  <div style="margin:0;padding:5% 30% 5% 0;font-size:15px" v-else>暂无满足条件的用户</div>
  <div class="ManagementJurisdictionPageTurn" v-if="this.responseParam.total>10">
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
      msg: '超级管理员模块',
      inputName: '',
      currentPage: 1,
      responseParam: {
        total: 0
      },
      realNameInfoContext: '',
      applyInfoContext: '',
      realNamePhotoContext: '',
      realNameInfoVisible: false,
      applyVisible: false,
      realNamePhotoVisible: false
    }
  },
  methods: {
    getAllInfo: function() {
      this.$axios.post(
        'api/management/get-apply-for-management',
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
        'api/management/get-apply-for-management',
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
      this.realNameInfoVisible = false
      this.applyVisible = false
      this.realNameInfoContext = ''
      this.applyInfoContext = ''
    },
    handleClosePhoto: function() {
      this.realNamePhotoVisible = false
      this.realNamePhotoContext = ''
    },
    openRealNameDialog: function(val) {
      this.$axios.post(
        'api/management/get-real-name-authentication-by-id',
        {
          id: val
        },
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.realNameInfoContext = response.data
            this.realNameInfoVisible = true
            // eslint-disable-next-line eqeqeq
          }
        }
      )
    },
    openApplyDialog: function(val) {
      this.applyInfoContext = val
      this.applyVisible = true
    },
    openRealNamePhoto: function(val) {
      this.realNamePhotoContext = val
      this.realNamePhotoVisible = true
    },
    applyForManagementPass: function(id) {
      // eslint-disable-next-line eqeqeq
      if (id != null && id != '' && typeof (id) !== 'undefined') {
        this.$axios.post(
          'api/management/apply-for-management-pass',
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
    applyForManagementReject: function(id) {
      // eslint-disable-next-line eqeqeq
      if (id != null && id != '' && typeof (id) !== 'undefined') {
        this.$axios.post(
          'api/management/apply-for-management-reject',
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
      this.$emit('setRootMessageCount', '')
    } else {
      this.$emit('setRootMessageCount', this.responseParam.total)
    }
  },

  watch: {
    currentPage: function() {
      this.getAllInfo()
    },
    'responseParam.total': function() {
      if (this.responseParam.total <= 0) {
        this.$emit('setRootMessageCount', '')
      } else {
        this.$emit('setRootMessageCount', this.responseParam.total)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../styles/management-page/root/ManagementJurisdiction.css'
</style>
