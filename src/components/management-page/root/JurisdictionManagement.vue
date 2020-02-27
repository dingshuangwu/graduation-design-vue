<template>
<div class="JurisdictionManagementPage">
  <div class="JurisdictionManagementCardInfo">
    <ul>
      <li>用户</li>
      <li>管理员权限</li>
      <li>求职信息</li>
      <li>招聘信息</li>
      <li>我的求职</li>
      <li>我的招聘</li>
      <li>登录权限</li>
    </ul>
    <div style="width:25%;height:92%;float:left;padding-top:0.3%;">
      <el-input
        placeholder="输入关键字"
        prefix-icon="el-icon-search"
        maxlength="20"
        size="small"
        v-model="inputName"
        clearable
        style="width:60%">
      </el-input>
      <el-button type="primary" round style="width:16%;height:70%;margin:0;padding:0" @click="research()">搜索</el-button>
      <el-button type="success" round style="width:16%;height:70%;margin:0;padding:0" @click="reset()">重置</el-button>
    </div>
  </div>
  <ul class="JurisdictionManagementUl" v-if="this.responseParam.total>0">
    <li v-for="(it,i) in this.responseParam.list" :key="i" class="JurisdictionManagementLi">
      <div class="JurisdictionManagementLiDiv">
        <span>{{it.name}}</span>
        <span>
          <el-switch
            v-model="it.management"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </span>
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
  <div class="JurisdictionManagementPageTurn" v-if="this.responseParam.total>10">
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
      msg: '用户权限管理模块',
      inputName: '',
      currentPage: 1,
      responseParam: []
    }
  },
  methods: {
    getJurisdictionAll: function() {
      this.$axios.post(
        'api/api/management/get-jurisdiction',
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
    getSomeBodyJurisdiction: function() {
      this.$axios.post(
        'api/api/management/get-jurisdiction',
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
    setJurisdiction: function(val) {
      this.$axios.post(
        'api/api/management/set-jurisdiction',
        {
          name: val.name,
          management: val.management,
          publish: val.publish,
          apply: val.apply,
          myPublish: val.myPublish,
          myApply: val.myApply,
          login: val.login
        },
        response => {
          // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            Message.success(response.message)
          }
        }
      )
    },
    reset: function() {
      this.inputName = ''
      this.currentPage = 1
      this.getJurisdictionAll()
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
        this.getSomeBodyJurisdiction()
      }
    }
  },
  watch: {
    currentPage: function() {
      this.getJurisdictionAll()
    }
  },
  mounted() {
    this.getJurisdictionAll()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../styles/management-page/root/JurisdictionManagement.css'
</style>
