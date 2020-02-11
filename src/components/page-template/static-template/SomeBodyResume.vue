<template>
    <div class="ResumePage">
        <div class="ResumeContext">
        <div class="ResumeContextDiv">
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
            <img v-bind:src="this.responseParam.imageUrl">
            </div>
        </div>
        <div class="ResumeContextDiv">
            <div style="text-align:left;line-height:40px;margin-left:-5%">
            <h3>技能专长:</h3>
            </div>
            <div v-if="true" style="height:68%;width:100%;overflow:auto;">
            <pre>{{this.getExpertiseDisplay}}</pre>
            </div>
        </div>
        <div class="ResumeContextDiv">
            <div style="text-align:left;line-height:40px;margin-left:-5%;">
            <h3>期望职位:</h3>
            </div>
            <div style="text-align:left;line-height:40px;margin-left:0%;">
            <span class="icon iconfont icon-zhuanyezhishijineng"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkFirstJob}}&nbsp;</p>
            <span class="icon iconfont icon-xinzi" style="margin-left:0%"></span><p style="min-width:70px;margin-right:0">{{this.responseParam.expectedWorkFirstSalary}}&nbsp;</p><p style="margin:0;width:95px">元/小时</p>
            <span class="icon iconfont icon-diqu1" style="margin-left:0%"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkFirstArea}}&nbsp;</p>
            </div>
            <div style="text-align:left;line-height:40px;margin-left:0%;">
            <span class="icon iconfont icon-zhuanyezhishijineng"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkSecondJob}}&nbsp;</p>
            <span class="icon iconfont icon-xinzi" style="margin-left:0%"></span><p style="min-width:70px;margin-right:0">{{this.responseParam.expectedWorkSecondSalary}}&nbsp;</p><p style="margin:0;width:95px">元/小时</p>
            <span class="icon iconfont icon-diqu1" style="margin-left:0%"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkSecondArea}}&nbsp;</p>
            </div>
            <div style="text-align:left;line-height:40px;margin-left:0%;">
            <span class="icon iconfont icon-zhuanyezhishijineng"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkThirdJob}}&nbsp;</p>
            <span class="icon iconfont icon-xinzi" style="margin-left:0%"></span><p p style="min-width:70px;margin-right:0">{{this.responseParam.expectedWorkThirdSalary}}&nbsp;</p><p style="margin:0;width:95px">元/小时</p>
            <span class="icon iconfont icon-diqu1" style="margin-left:0%"></span><p p style="min-width:165px;margin-right:0">{{this.responseParam.expectedWorkThirdArea}}&nbsp;</p>
            </div>
        </div>
        <div class="ResumeContextDiv">
            <div style="text-align:left;line-height:40px;margin-left:-5%;">
            <h3>工作经验:</h3>
            </div>
            <div style="height:68%;width:100%;overflow:auto;">
            <pre>{{this.getWorkExperienceDisplay}}</pre>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      msg: 'SomeBodyResume',
      responseParam: {
        name: '',
        sex: '',
        birthday: '',
        workTime: '',
        educationBackground: '',
        area: '',
        telephone: '',
        email: '',
        imageUrl: '',
        expertise: '',
        expectedWorkFirstJob: '',
        expectedWorkFirstSalary: '',
        expectedWorkFirstArea: '',
        expectedWorkSecondJob: '',
        expectedWorkSecondSalary: '',
        expectedWorkSecondArea: '',
        expectedWorkThirdJob: '',
        expectedWorkThirdSalary: '',
        expectedWorkThirdArea: '',
        workExperience: '',
        lastModifyDate: ''
      }
    }
  },
  computed: {
    getExpertiseDisplay: function() {
      return this.responseParam.expertise.replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
    },
    getWorkExperienceDisplay: function() {
      return this.responseParam.workExperience.replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
    }
  },
  methods: {
    getUserInfo() {
      this.$axios.get(
        'api/api/my-resume/get-somebody-resume',
        {
          name: this.userName
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam = response.data
            console.log(response)
          }
        }
      )
    }
  },
  watch: {
    userName: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userName != '' && this.userName) {
        this.getUserInfo()
      }
    }
  },
  mounted() {
    // eslint-disable-next-line eqeqeq
    if (this.userName != '' && this.userName) {
      this.getUserInfo()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../styles/page-template/static-template/SomeBodyResume.css";
</style>
