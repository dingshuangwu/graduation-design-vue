<template>
  <div class="InfoPage">
    <div><Top></Top></div>
    <div class="InfoContext">
      <div class="InfoContextDiv">
        <div class="MyInfoEdictorIcon"><span class="icon iconfont icon-bianji"></span></div>
        <div class="InfoContextDivMyInfo">
          <div style="text-align:left;line-height:30px"><span class="icon iconfont icon-shuaxin2" style="cursor: pointer" @click="getUserAllInfo()"></span><p style="font-size:10px ;min-width:200px">最后一次更新：{{responseParam.lastModifyDate}}&nbsp;</p></div>
          <div style="text-align:left">
            <h2>{{this.responseParam.name}}&nbsp;</h2>
            <h3 v-if="this.responseParam.sex=='man'" class="SexMan">♂</h3>
            <h3 v-if="this.responseParam.sex=='woman'" class="SexWoman">♀</h3>
          </div>
          <div style="text-align:left;line-height:50px">
            <span class="icon iconfont icon-moban"></span><p style="min-width:34px;">{{this.responseParam.nation}}&nbsp;</p>
            <span class="icon iconfont">&#xe69d;</span><p style="min-width:85px">{{this.responseParam.birthday}}&nbsp;</p>
           <span class="icon iconfont icon-xueli3"></span><p style="min-width:34px;">{{this.responseParam.educationBackground}}&nbsp;</p>
          </div>
          <div style="text-align:left">
            <span class="icon iconfont icon-weixin2"></span><p style="min-width:100px">{{this.responseParam.telephone}}&nbsp;</p>
            <span class="icon iconfont icon-youxiang5"></span><p style="min-width:200px">{{this.responseParam.email}}&nbsp;</p>
          </div>
        </div>
        <div class="InfoContextDivMyImage">
          <img class="MyInfoImage" v-bind:src="this.$store.state.imageUrl" alt="无法正常显示" @click="uploadImageVisble = true">
          <el-dialog
            title="上传头像"
            :visible.sync="uploadImageVisble"
            width="50%"
            center>
            <div style="text-align:center;margin:auto"><Upload/></div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="uploadImageVisble = false" style="float:right">关&nbsp;闭</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div class="InfoContextDiv">
         <div style="text-align:left;line-height:40px;margin-left:-5%;">
           <h3>个人介绍:</h3>
           <div class="MyInfoEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji"></span></div>
         </div>
         <div style="height:68%;width:100%;overflow:auto;text-align:left">
          <pre>{{this.getSelfIntroductionDisplay}}</pre>
         </div>
      </div>
      <div class="InfoContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;">
          <h3>教育经历:</h3>
          <div class="MyInfoEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji"></span></div>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-shijian3"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstStartDate}}&nbsp;</p>
          <span class="icon iconfont icon-shijian3" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstEndDate}}&nbsp;</p>
          <span class="icon iconfont icon-xuexiaoqingkuang" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstSchool}}&nbsp;</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-shijian3"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstStartDate}}&nbsp;</p>
          <span class="icon iconfont icon-shijian3" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstEndDate}}&nbsp;</p>
          <span class="icon iconfont icon-xuexiaoqingkuang" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstSchool}}&nbsp;</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-shijian3"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstStartDate}}&nbsp;</p>
          <span class="icon iconfont icon-shijian3" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstEndDate}}&nbsp;</p>
          <span class="icon iconfont icon-xuexiaoqingkuang" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstSchool}}&nbsp;</p>
        </div>
      </div>
      <div class="InfoContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;">
          <h3>个人签名:</h3>
          <div class="MyInfoEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji"></span></div>
        </div>
        <div style="height:68%;width:100%;overflow:auto;">
          <pre>{{this.getSelfSignatureDisplay}}</pre>
        </div>
      </div>
    </div>
    <div class="InfoRightInfo"></div>
    <div style="clear:both"><Bottom/></div>
  </div>
</template>
<script>
import Bottom from '../page-template/Bottom'
import Upload from '../page-template/static-template/UploadUserImage'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      msg: '我的简历',
      responseParam: {
        name: '丁双伍',
        nation: '汉族',
        // man or 'woman'
        sex: 'man',
        educationBackground: '本科',
        telephone: '17856165587',
        email: 'dingshuangwu@vip.qq.com',
        imageUrl: '../../assets/wk.jpg',
        birthday: '1998-04-29',
        selfIntroduction: '&kg;&kg;&kg;&kg;练习时长两年半的Java练习生,&hc;&hc;喜欢唱、跳、Rap、篮球。',
        educationExperienceFirstStartDate: '2010-09-01',
        educationExperienceFirstEndDate: '2013-09-01',
        educationExperienceFirstSchool: '凤台县第九中学',
        educationExperienceSecondStartDate: '2013-09-01',
        educationExperienceSecondEndDate: '2016-09-01',
        educationExperienceSecondSchool: '凤台县第一中学',
        educationExperienceThirdStartDate: '2016-09-01',
        educationExperienceThirdEndDate: '2020-09-01',
        educationExperienceThirdSchool: '阜阳师范大学',
        selfSignature: '&hc;&kg;&kg;&kg;终有弱水替沧海，&hc;&hc;&kg;&kg;&kg;再无相思寄巫山。',
        lastModifyDate: '2019-11-23 18:54:20'
      },
      requestParam: {
      },
      uploadImageVisble: false,
      infoVisble: false,
      selfIntroductionVisble: false,
      educationExperienceVisble: false,
      selfSignatureVisble: false
    }
  },
  components: {
    Bottom,
    Upload
  },
  methods: {
    getUserAllInfo: function() {
      this.$axios.get(
        'api/api/user-info/all',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam = response.data
            this.requestParam = response.data
            console.log(response)
          }
        }
      )
    },
    getUserInfo: function() {
      this.$axios.get(
        'api/api/user-info/info',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.name = response.data.name
            this.responseParam.nation = response.data.nation
            this.responseParam.sex = response.data.sex
            this.responseParam.educationBackground = response.data.educationBackground
            this.responseParam.telephone = response.data.telephone
            this.responseParam.email = response.data.email
            this.responseParam.imageUrl = response.data.imageUrl
            this.requestParam.name = response.data.name
            this.requestParam.nation = response.data.nation
            this.requestParam.sex = response.data.sex
            this.requestParam.educationBackground = response.data.educationBackground
            this.requestParam.telephone = response.data.telephone
            this.requestParam.email = response.data.email
            this.requestParam.imageUrl = response.data.imageUrl
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setUserInfo: function() {
      this.$axios.get(
        'api/api/user-info/set-info',
        {
          name: this.requestParam.name,
          nation: this.requestParam.nation,
          sex: this.requestParam.sex,
          birthday: this.requestParam.birthday,
          educationBackground: this.requestParam.educationBackground,
          telephone: this.requestParam.telephone,
          email: this.requestParam.email
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.getUserInfo()
            Message.success(response.message)
          }
        }
      )
    },
    getSelfIntroduction: function() {
      this.$axios.get(
        'api/api/user-info/self-introduction',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.selfIntroduction = response.data.selfIntroduction
            this.requestParam.selfIntroduction = response.data.selfIntroduction
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setSelfIntroduction: function() {
      this.$axios.get(
        'api/api/user-info/set-self-introduction',
        {
          selfIntroduction: this.requestParam.selfIntroduction
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.getSelfIntroduction()
            Message.success(response.message)
          }
        }
      )
    },
    getEducationExperience: function() {
      this.$axios.get(
        'api/api/user-info/education-experience',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.educationExperienceFirstStartDate = response.data.educationExperienceFirstStartDate
            this.responseParam.educationExperienceFirstEndDate = response.data.educationExperienceFirstEndDate
            this.responseParam.educationExperienceFirstSchool = response.data.educationExperienceFirstSchool
            this.responseParam.educationExperienceSecondStartDate = response.data.educationExperienceSecondStartDate
            this.responseParam.educationExperienceSecondEndDate = response.data.educationExperienceSecondEndDate
            this.responseParam.educationExperienceSecondSchool = response.data.educationExperienceSecondSchool
            this.responseParam.educationExperienceThirdStartDate = response.data.educationExperienceThirdStartDate
            this.responseParam.educationExperienceThirdEndDate = response.data.educationExperienceThirdEndDate
            this.responseParam.educationExperienceThirdSchool = response.data.educationExperienceThirdSchool
            this.requestParam.educationExperienceFirstStartDate = response.data.educationExperienceFirstStartDate
            this.requestParam.educationExperienceFirstEndDate = response.data.educationExperienceFirstEndDate
            this.requestParam.educationExperienceFirstSchool = response.data.educationExperienceFirstSchool
            this.requestParam.educationExperienceSecondStartDate = response.data.educationExperienceSecondStartDate
            this.requestParam.educationExperienceSecondEndDate = response.data.educationExperienceSecondEndDate
            this.requestParam.educationExperienceSecondSchool = response.data.educationExperienceSecondSchool
            this.requestParam.educationExperienceThirdStartDate = response.data.educationExperienceThirdStartDate
            this.requestParam.educationExperienceThirdEndDate = response.data.educationExperienceThirdEndDate
            this.requestParam.educationExperienceThirdSchool = response.data.educationExperienceThirdSchool
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setEducationExperience: function() {
      this.$axios.get(
        'api/api/user-info/set-education-experience',
        {
          educationExperienceFirstStartDate: this.requestParam.educationExperienceFirstStartDate,
          educationExperienceFirstEndDate: this.requestParam.educationExperienceFirstEndDate,
          educationExperienceFirstSchool: this.requestParam.educationExperienceFirstSchool,
          educationExperienceSecondStartDate: this.requestParam.educationExperienceSecondStartDate,
          educationExperienceSecondEndDate: this.requestParam.educationExperienceSecondEndDate,
          educationExperienceSecondSchool: this.requestParam.educationExperienceSecondSchool,
          educationExperienceThirdStartDate: this.requestParam.educationExperienceThirdStartDate,
          educationExperienceThirdEndDate: this.requestParam.educationExperienceThirdEndDate,
          educationExperienceThirdSchool: this.educationExperienceThirdSchool
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.getEducationExperience()
            Message.success(response.message)
          }
        }
      )
    },
    getSelfSignature: function() {
      this.$axios.get(
        'api/api/user-info/self-signature',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.selfSignature = response.data.selfSignature
            this.requestParam.selfSignature = response.data.selfSignature
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setSelfSignature: function() {
      this.$axios.get(
        'api/api/user-info/set-self-signature',
        {
          selfSignature: this.requestParam.selfSignature
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.getSelfSignature()
            Message.success(response.message)
          }
        }
      )
    }
  },
  computed: {
    getSelfIntroductionDisplay: function() {
      return this.responseParam.selfIntroduction.replace(/&kg;/g, ' ').replace(/&hc;/g, '\r\n')
    },
    getSelfSignatureDisplay: function() {
      return this.responseParam.selfSignature.replace(/&kg;/g, ' ').replace(/&hc;/g, '\r\n')
    }
  },
  mounted() {
    this.getUserAllInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/MyInfo.css'
</style>
