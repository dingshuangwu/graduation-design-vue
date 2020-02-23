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
  <ul class="RealNameAuthenticationManagementUl" v-if="this.responseParam.total>0">
    <li v-for="(it,i) in this.responseParam.list" :key="i" class="RealNameAuthenticationManagementLi">
      <div class="RealNameAuthenticationManagementLiDiv">
        <span>{{it.name}}</span>
        <span>
          <el-switch
            v-model="it.apply"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </span>
        <span>
          <el-switch
            v-model="it.publish"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </span>
        <span>
          <el-switch
            v-model="it.myApply"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </span>
        <span>
          <el-switch
            v-model="it.myPublish"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </span>
        <span>
          <el-switch
            v-model="it.login"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </span>
        <span style="height:100%;width:6%">
          <el-button type="primary" size="mini" @click="setJurisdiction(it)">设置</el-button>
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
      }
    }
  },
  methods: {
    getAllInfo: function() {
      this.$axios.post(
        'api/api/management/real-name-authentication',
        {
          name: null,
          currentPage: 1
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam = response.data
            console.log(response.data)
          }
        }
      )
    },
    getSomeBody: function() {
      this.$axios.post(
        'api/api/management/real-name-authentication',
        {
          name: this.inputName,
          currentPage: 1
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam = response.data
            console.log(response.data)
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
    }
  },
  mounted() {
    this.getAllInfo()
    this.$emit('setMessageCount', this.responseParam.total)
  },
  watch: {
    currentPage: function() {
      this.getAllInfo()
    },
    'responseParam.total': function() {
      this.$emit('setMessageCount', this.responseParam.total)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../styles/management-page/page/UserAuthenticationManagement.css'
</style>
