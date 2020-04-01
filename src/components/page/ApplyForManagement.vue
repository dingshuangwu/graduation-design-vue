<template>
    <div class="ApplyForManagementPage">
      <div class="ApplyForManagementTop"><Top></Top></div>
      <div class="ApplyForManagementContext">
        <div class="ApplyForManagementContextSteps">
         <el-steps :active="this.active" finish-status="success" align-center>
            <el-step title="实名认证" :status="status"></el-step>
            <el-step title="资历认定" description="说明是否有其他平台的管理员经历，如果有，请简单介绍，字数不超过200"></el-step>
            <el-step title="面试申请" description="面试方式为视频/电话面试,即日起请保持电话畅通"></el-step>
          </el-steps>
        </div>
        <div class="ApplyForManagementContextContext">
          <div v-if="this.active==0&&this.responseRealNameAuthentication!=false" class="ApplyForManagementContextContextOne">
            <img :src="responseRealNameAuthentication.identityCardFront">
            <img :src="responseRealNameAuthentication.identityCardReverse" style="margin:0 1% 0 1%">
            <img :src="responseRealNameAuthentication.currentPhoto">
          </div>
          <div v-if="this.active==1" class="ApplyForManagementContextContextTwo">
            <el-input
              type="textarea"
              :rows="7"
              placeholder="请输入内容字数不得超过200"
              v-model="textarea"
              maxlength=200>
            </el-input>
          </div>
          <div v-if="this.active==2" class="ApplyForManagementContextContextThree">
             <el-input
                placeholder="请输入联系电话"
                prefix-icon="el-icon-phone"
                v-model="input"
                clearable
                maxlength=11
                style="margin:35% 0 0 0">
             </el-input>
          </div>
          <div v-if="this.active==3" class="ApplyForManagementContextContextFour">
            <img :src="responseRealNameAuthentication.identityCardFront">
            <img :src="responseRealNameAuthentication.identityCardReverse" style="margin:0 1% 0 1%">
            <img :src="responseRealNameAuthentication.currentPhoto">
            <div></div>
            <el-input
                prefix-icon="el-icon-phone"
                :value="input"
                readonly=true
                style="width:20%;margin:1% 0 0 0">
            </el-input>
            <div></div>
            <el-input
              type="textarea"
              :rows="7"
              placeholder="请输入内容"
              :value="textarea"
              readonly
              style="width:70%;margin:1% 0 0 0">
            </el-input>
          </div>
        </div>
        <div class="ApplyForManagementContextNext">
           <el-button v-if="active>0" @click="goBack()">上一步</el-button>
           <el-button v-if="active<3" @click="next()">下一步</el-button>
           <el-button v-if="active>=3" @click="submit()">提 交</el-button>
        </div>
      </div>
    </div>
</template>
<script>
import { Message } from 'element-ui'
import { setJurisdiction, getJurisdiction } from '../../utils/auth'
export default {
  data() {
    return {
      msg: '管理员权限申请',
      active: 0,
      status: '',
      responseRealNameAuthentication: false,
      textarea: '',
      input: ''
    }
  },
  methods: {
    next: function() {
      if (this.active < 3) {
        // eslint-disable-next-line eqeqeq
        if (this.active == 0 && this.responseRealNameAuthentication != false) {
          this.active++
        // eslint-disable-next-line eqeqeq
        } else if (this.active == 1 && this.textarea != '') {
          this.active++
        // eslint-disable-next-line eqeqeq
        } else if (this.active == 2 && this.input != '') {
          if (this.input.replace(/\s*/g, '').length < 11) {
            Message.error('请输入正确的手机号！')
          } else {
            this.active++
          }
        } else {
          Message.error('请完成当前步骤！')
        }
      }
    },
    goBack: function() {
      if (this.active > 0) {
        this.active--
      }
    },
    submit: function() {
      this.$axios.post(
        'api/user-apply/apply-for-management',
        {
          context: this.textarea,
          contactWay: this.input.replace(/\s*/g, '')
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            // eslint-disable-next-line eqeqeq
            if (response.data == null) {
              Message.error('操作失败,可能由于数据库无你的信息，请联系管理员处理！')
            } else {
              Message.success(response.message)
              let jurisdiction = getJurisdiction()
              jurisdiction.applyForManagement = false
              setJurisdiction(jurisdiction)
              this.$router.go(0)
              this.$router.push({ path: '/my-info' })
            }
          }
        }
      )
    },
    getRealNameAtuhentication: function() {
      this.$axios.get(
        'api/user-apply/get-real-name-authentication',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            // eslint-disable-next-line eqeqeq
            if (response.data == false) {
              this.active = 0
              this.status = 'error'
              this.responseRealNameAuthentication = false
            } else {
              this.responseRealNameAuthentication = response.data
              this.active = 1
              this.status = 'success'
              console.log(response)
            }
          }
        }
      )
    }
  },
  mounted() {
    this.getRealNameAtuhentication()
  },
  watch: {
  }
}
</script>
<style scoped>
@import '../../styles/page/ApplyForManagement.css'
</style>
