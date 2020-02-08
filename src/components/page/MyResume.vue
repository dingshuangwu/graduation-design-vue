<template>
  <div class="ResumePage">
    <div><Top></Top></div>
    <div class="ResumeContext">
      <div class="ResumeContextDiv">
        <div class="MyResumeEdictorIcon"><span class="icon iconfont icon-bianji"></span></div>
        <div class="ResumeContextDivMyInfo">
          <div style="text-align:left;line-height:30px"><span class="icon iconfont icon-shuaxin2" style="cursor: pointer" @click="getMyResumeAll()"></span><p style="font-size:10px;min-width:210px">最后一次更新：{{responseParam.lastModifyDate}}&nbsp;</p></div>
          <div style="text-align:left;">
            <h2>{{this.responseParam.name}}&nbsp;</h2>
            <h3 v-if="this.responseParam.sex=='man'" class="SexMan">♂</h3>
            <h3 v-if="this.responseParam.sex=='woman'" class="SexWoman">♀</h3>
            <span class="icon iconfont" style="margin:0 0 0 100px;font-size:20px;color:yellowgreen">&#xe69d;</span><h3 style="margin-left:10px">{{this.responseParam.birthday}}&nbsp;</h3>
          </div>
          <div style="text-align:left;line-height:50px">
            <i class="el-icon-goods"></i><p style="min-width:95px">{{this.responseParam.workTime}}&nbsp;</p>
            <span class="icon iconfont icon-edu-line"></span><p style="min-width:35px">{{this.responseParam. educationBackground}}&nbsp;</p>
           <span class="icon iconfont icon-75"></span><p style="min-width:70px">{{this.responseParam.area}}&nbsp;</p>
          </div>
          <div style="text-align:left">
            <span class="icon iconfont icon-shouji1" style="margin-left:7%"></span><span class="icon iconfont icon-weixin2" style="margin-left:2%"></span><p style="min-width:95px">{{this.responseParam.telephone}}</p>
            <i class="el-icon-message"></i><p style="min-width:190px">{{this.responseParam.email}}</p>
          </div>
        </div>
        <div class="ResumeContextDivMyImage">
          <img v-bind:src="this.$store.state.imageUrl">
        </div>
      </div>
      <div class="ResumeContextDiv">
         <div style="text-align:left;line-height:40px;margin-left:-5%">
           <h3>技能专长:</h3>
           <div class="MyResumeEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji"></span></div>
         </div>
         <div v-if="true" style="height:68%;width:100%;overflow:auto;">
           <pre>{{this.getExpertiseDisplay}}</pre>
         </div>
      </div>
      <div class="ResumeContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;">
          <h3>期望职位:</h3>
          <div class="MyResumeEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji"></span></div>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-zhuanyezhishijineng"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkFirstJob}}&nbsp;</p>
          <span class="icon iconfont icon-xinzi" style="margin-left:0%"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkFirstSalary}}&nbsp;</p>
          <span class="icon iconfont icon-diqu1" style="margin-left:0%"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkFirstArea}}&nbsp;</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-zhuanyezhishijineng"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkSecondJob}}&nbsp;</p>
          <span class="icon iconfont icon-xinzi" style="margin-left:0%"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkSecondSalary}}&nbsp;</p>
          <span class="icon iconfont icon-diqu1" style="margin-left:0%"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkSecondArea}}&nbsp;</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-zhuanyezhishijineng"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkThirdJob}}&nbsp;</p>
          <span class="icon iconfont icon-xinzi" style="margin-left:0%"></span><p p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkThirdSalary}}&nbsp;</p>
          <span class="icon iconfont icon-diqu1" style="margin-left:0%"></span><p p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkThirdArea}}&nbsp;</p>
        </div>
      </div>
      <div class="ResumeContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;">
          <h3>工作经验:</h3>
          <div class="MyResumeEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji"></span></div>
        </div>
        <div style="height:68%;width:100%;overflow:auto;">
          <pre>{{this.getWorkExperienceDisplay}}</pre>
        </div>
      </div>
    </div>
    <div class="ResumeRightInfo"></div>
    <div style="clear:both"><Bottom/></div>
  </div>
</template>
<script>
import Bottom from '../page-template/Bottom'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      msg: '我的简历',
      responseParam: {
        name: '丁双伍',
        // man or 'woman'
        sex: 'man',
        birthday: '1998-04-29',
        workTime: '一年以内经验',
        educationBackground: '本科',
        area: '安徽·合肥',
        telephone: '17856165587',
        email: 'dingshuangwu@vip.qq.com',
        expertise: '&kg;&kg;&kg;&kg;熟练使用spring、springboot、springcloud、mybatis等框架,&hc;&hc;熟悉redis、docker、nginx等中间件技术。',
        expectedWorkFirstJob: 'Java开发',
        expectedWorkFirstSalary: '10K-20K',
        expectedWorkFirstArea: '安徽·合肥',
        expectedWorkSecondJob: 'Java开发',
        expectedWorkSecondSalary: '10K-20K',
        expectedWorkSecondArea: '安徽·合肥',
        expectedWorkThirdJob: 'Java开发',
        expectedWorkThirdSalary: '10K-20K',
        expectedWorkThirdArea: '安徽·合肥',
        workExperience: '&hc;&kg;&kg;&kg;终有弱水替沧海，&hc;&hc;&kg;&kg;&kg;再无相思寄巫山。',
        lastModifyDate: '2019-11-23 18:54:20'
      },
      requestParam: {
      },
      infoVisble: false,
      expertiseVisble: false,
      expectedWorkVisble: false,
      workExperienceVisble: false
    }
  },
  methods: {
    getMyResumeAll: function() {
      this.$axios.get(
        'api/api/my-resume/all',
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
    getMyResumeInfo: function() {
      this.$axios.get(
        'api/api/my-resume/info',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.name = response.data.name
            this.responseParam.sex = response.data.sex
            this.responseParam.birthday = response.data.birthday
            this.responseParam.workTime = response.data.workTime
            this.responseParam.educationBackground = response.data.educationBackground
            this.responseParam.area = response.data.area
            this.responseParam.telephone = response.data.telephone
            this.responseParam.email = response.data.email
            this.requestParam.name = response.data.name
            this.requestParam.sex = response.data.sex
            this.requestParam.birthday = response.data.birthday
            this.requestParam.workTime = response.data.workTime
            this.requestParam.educationBackground = response.data.educationBackground
            this.requestParam.area = response.data.area
            this.requestParam.telephone = response.data.telephone
            this.requestParam.email = response.data.email
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setMyResumeInfo: function() {
      this.$axios.get(
        'api/api/my-resume/set-info',
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
            this.getMyResumeInfo()
            Message.success(response.message)
          }
        }
      )
    },
    getMyResumeExpertise: function() {
      this.$axios.get(
        'api/api/my-resume/expertise',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.expertise = response.data.expertise
            this.requestParam.expertise = response.data.expertise
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setMyResumeExpertise: function() {
      this.$axios.get(
        'api/api/my-resume/set-expertise',
        {
          expertise: this.requestParam.expertise
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.getMyResumeExpertise()
            Message.success(response.message)
          }
        }
      )
    },
    getMyResumeExpectedWork: function() {
      this.$axios.get(
        'api/api/my-resume/expected-work',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.expectedWorkFirstJob = response.data.expectedWorkFirstJob
            this.responseParam.expectedWorkFirstSalary = response.data.expectedWorkFirstSalary
            this.responseParam.expectedWorkFirstArea = response.data.expectedWorkFirstArea
            this.responseParam.expectedWorkSecondJob = response.data.expectedWorkSecondJob
            this.responseParam.expectedWorkSecondSalary = response.data.expectedWorkSecondSalary
            this.responseParam.expectedWorkSecondArea = response.data.expectedWorkSecondArea
            this.responseParam.expectedWorkThirdJob = response.data.expectedWorkThirdJob
            this.responseParam.expectedWorkThirdSalary = response.data.expectedWorkThirdSalary
            this.responseParam.expectedWorkThirdArea = response.data.expectedWorkThirdArea
            this.requestParam.expectedWorkFirstJob = response.data.expectedWorkFirstJob
            this.requestParam.expectedWorkFirstSalary = response.data.expectedWorkFirstSalary
            this.requestParam.expectedWorkFirstArea = response.data.expectedWorkFirstArea
            this.requestParam.expectedWorkSecondJob = response.data.expectedWorkSecondJob
            this.requestParam.expectedWorkSecondSalary = response.data.expectedWorkSecondSalary
            this.requestParam.expectedWorkSecondArea = response.data.expectedWorkSecondArea
            this.requestParam.expectedWorkThirdJob = response.data.expectedWorkThirdJob
            this.requestParam.expectedWorkThirdSalary = response.data.expectedWorkThirdSalary
            this.requestParam.expectedWorkThirdArea = response.data.expectedWorkThirdArea
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setMyResumeExpectedWork: function() {
      this.$axios.get(
        'api/api/my-resume/set-expected-work',
        {
          expectedWorkFirstJob: this.requestParam.expectedWorkFirstJob,
          expectedWorkFirstSalary: this.requestParam.expectedWorkFirstSalary,
          expectedWorkFirstArea: this.requestParam.expectedWorkFirstArea,
          expectedWorkSecondJob: this.requestParam.expectedWorkSecondJob,
          expectedWorkSecondSalary: this.requestParam.expectedWorkSecondSalary,
          expectedWorkSecondArea: this.requestParam.expectedWorkSecondArea,
          expectedWorkThirdJob: this.requestParam.expectedWorkThirdJob,
          expectedWorkThirdSalary: this.requestParam.expectedWorkThirdSalary,
          expectedWorkThirdArea: this.requestParam.expectedWorkThirdArea
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.getMyResumeExpectedWork()
            Message.success(response.message)
          }
        }
      )
    },
    getMyResumeWorkExperience: function() {
      this.$axios.get(
        'api/api/my-resume/work-experience',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.workExperience = response.data.workExperience
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setMyResumeWorkExperience: function() {
      this.$axios.get(
        'api/api/my-resume/set-work-experience',
        {
          workExperience: this.requestParam.workExperience
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.getMyResumeWorkExperience()
            Message.success(response.message)
          }
        }
      )
    }
  },
  components: {
    Bottom
  },
  computed: {
    getExpertiseDisplay: function() {
      return this.responseParam.expertise.replace(/&kg;/g, ' ').replace(/&hc;/g, '\r\n')
    },
    getWorkExperienceDisplay: function() {
      return this.responseParam.workExperience.replace(/&kg;/g, ' ').replace(/&hc;/g, '\r\n')
    }
  },
  mounted() {
    this.getMyResumeAll()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/MyResume.css'
</style>
