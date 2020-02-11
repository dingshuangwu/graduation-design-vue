<template>
  <div class="InfoPage">
    <div class="InfoContext">
      <div class="InfoContextDiv">
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
          <img class="MyInfoImage" v-bind:src="this.responseParam.imageUrl" alt="无法正常显示">
        </div>
      </div>
      <div class="InfoContextDiv">
         <div style="text-align:left;line-height:40px;margin-left:-5%;">
           <h3>个人介绍:</h3>
         </div>
         <div style="height:68%;width:100%;overflow:auto;text-align:left">
          <pre>{{this.getSelfIntroductionDisplay}}</pre>
         </div>
      </div>
      <div class="InfoContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;">
          <h3>教育经历:</h3>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-shijian3"></span><p style="min-width:90px;margin-right:0">{{this.responseParam.educationExperienceFirstStartDate}}&nbsp;</p><p style="margin:0 4% 0 3%">至</p>
          <span class="icon iconfont icon-shijian3" style="margin-left:0"></span><p style="min-width:90px;margin-right:0">{{this.responseParam.educationExperienceFirstEndDate}}&nbsp;</p><p style="margin:0 4% 0 3%">于</p>
          <span class="icon iconfont icon-xuexiaoqingkuang" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceFirstSchool}}&nbsp;</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-shijian3"></span><p style="min-width:90px;margin-right:0">{{this.responseParam.educationExperienceSecondStartDate}}&nbsp;</p><p style="margin:0 4% 0 3%">至</p>
          <span class="icon iconfont icon-shijian3" style="margin-left:0"></span><p style="min-width:90px;margin-right:0">{{this.responseParam.educationExperienceSecondEndDate}}&nbsp;</p><p style="margin:0 4% 0 3%">于</p>
          <span class="icon iconfont icon-xuexiaoqingkuang" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceSecondSchool}}&nbsp;</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
          <span class="icon iconfont icon-shijian3"></span><p style="min-width:90px;margin-right:0">{{this.responseParam.educationExperienceThirdStartDate}}&nbsp;</p><p style="margin:0 4% 0 3%">至</p>
          <span class="icon iconfont icon-shijian3" style="margin-left:0"></span><p style="min-width:90px;margin-right:0">{{this.responseParam.educationExperienceThirdEndDate}}&nbsp;</p><p style="margin:0 4% 0 3%">于</p>
          <span class="icon iconfont icon-xuexiaoqingkuang" style="margin-left:0"></span><p style="min-width:165px;margin-right:0">{{this.responseParam.educationExperienceThirdSchool}}&nbsp;</p>
        </div>
      </div>
      <div class="InfoContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;">
          <h3>个人签名:</h3>
        </div>
        <div style="height:68%;width:100%;overflow:auto;">
          <pre>{{this.getSelfSignatureDisplay}}</pre>
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
      msg: 'SomeBodyInfo',
      responseParam: {
        name: '',
        nation: '',
        sex: '',
        educationBackground: '',
        telephone: '',
        email: '',
        imageUrl: '',
        birthday: '',
        selfIntroduction: '',
        educationExperienceFirstStartDate: '',
        educationExperienceFirstEndDate: '',
        educationExperienceFirstSchool: '',
        educationExperienceSecondStartDate: '',
        educationExperienceSecondEndDate: '',
        educationExperienceSecondSchool: '',
        educationExperienceThirdStartDate: '',
        educationExperienceThirdEndDate: '',
        educationExperienceThirdSchool: '',
        selfSignature: '',
        lastModifyDate: ''
      }
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
  methods: {
    getUserInfo() {
      this.$axios.get(
        'api/api/user-info/get-somebody-info',
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
@import "../../../styles/page-template/static-template/SomeBodyInfo.css";
</style>
