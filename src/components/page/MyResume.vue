<template>
  <div class="ResumePage">
    <div class="ResumeTop"><Top></Top></div>
    <div class="ResumeContext">
      <div class="ResumeContextDiv">
        <div class="MyResumeEdictorIcon"><span class="icon iconfont icon-bianji"  @click="infoVisble = true"></span></div>
        <el-dialog
          title="编辑个人信息"
          :visible.sync="infoVisble"
          :before-close="handleClose"
          width="750px">

            <label style="margin-right:1%">姓名:</label>
            <el-input
              v-model="requestParam.name"
              maxlength="10"
              placeholder="请输入姓名"
              style="width:30%">
            </el-input>
            <label style="margin-left:10%;margin-right:1%">性别:</label>
            <el-select v-model="requestParam.sex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div>&nbsp;</div>
            <label style="margin-right:1%;margin-left:-4%">出生日期:</label>
            <el-date-picker
              v-model="requestParam.birthday"
              type="date"
              value-format="yyyyMMdd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="选择日期">
            </el-date-picker>
            <label style="margin-left:5%;margin-right:1%">工作经验:</label>
            <el-select v-model="requestParam.workTime" placeholder="请选择">
              <el-option
                v-for="item in workExperienceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div>&nbsp;</div>
            <label style="margin-right:1%;margin-left:-0.5%">学历:</label>
            <el-select v-model="requestParam.educationBackground" placeholder="请选择">
              <el-option
                v-for="item in educationBackgroundOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="margin-left:7.5%;margin-right:1%">所在地:</label>
            <el-input
              v-model="requestParam.area"
              maxlength="20"
              placeholder="请输入所在地"
              style="width:30%">
            </el-input>
            <div>&nbsp;</div>
            <label style="margin-left:-5%;margin-right:1%">手机/微信:</label>
            <el-input
              v-model="requestParam.telephone"
              maxlength="20"
              placeholder="请输入手机/微信"
              style="width:30%">
            </el-input>
            <label style="margin-left:6%;margin-right:1%">联系邮箱:</label>
            <el-input
              v-model="requestParam.email"
              maxlength="30"
              placeholder="请输入联系邮箱"
              style="width:30%">
            </el-input>

          <span slot="footer" class="dialog-footer">
            <el-button @click="handCancle()">取 消</el-button>
            <el-button type="primary" @click="handInfoConfirm()">确 定</el-button>
          </span>
        </el-dialog>
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
           <div class="MyResumeEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji" @click="expertiseVisble = true"></span></div>
         </div>
         <el-dialog
            title="技能专长"
            :visible.sync="expertiseVisble"
            :before-close="handleClose"
            width="750px">

            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="requestParam.expertise">
            </el-input>

            <span slot="footer" class="dialog-footer">
              <el-button @click="handCancle()">取 消</el-button>
              <el-button type="primary" @click="handExpertiseConfirm()">确 定</el-button>
            </span>
         </el-dialog>
         <div v-if="true" style="height:68%;width:100%;overflow:auto;">
           <pre>{{this.getExpertiseDisplay}}</pre>
         </div>
      </div>
      <div class="ResumeContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;">
          <h3>期望职位:</h3>
          <div class="MyResumeEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji" @click="expectedWorkVisble = true"></span></div>
        </div>
        <el-dialog
          title="期望职位"
          :visible.sync="expectedWorkVisble"
          :before-close="handleClose"
          width="750px">

            <el-input
              v-model="requestParam.expectedWorkFirstJob"
              maxlength="10"
              placeholder="期望职位"
              style="width:30%;margin:0;margin-left:0">
            </el-input>
            <el-input
              v-model="requestParam.expectedWorkFirstSalary"
              maxlength="10"
              placeholder="期望薪资"
              style="width:15%;margin:0;margin-left:5%">
            </el-input>
            <label style="margin:0">  元/小时</label>
            <el-input
              v-model="requestParam.expectedWorkFirstArea"
              maxlength="10"
              placeholder="期望工作地"
              style="width:20%;margin:0;margin-left:5%">
            </el-input>
            <div>&nbsp;</div>
            <el-input
              v-model="requestParam.expectedWorkSecondJob"
              maxlength="10"
              placeholder="期望职位"
              style="width:30%;margin:0;margin-left:0">
            </el-input>
            <el-input
              v-model="requestParam.expectedWorkSecondSalary"
              maxlength="10"
              placeholder="期望薪资"
              style="width:15%;margin:0;margin-left:5%">
            </el-input>
            <label style="margin:0">  元/小时</label>
            <el-input
              v-model="requestParam.expectedWorkSecondArea"
              maxlength="10"
              placeholder="期望工作地"
              style="width:20%;margin:0;margin-left:5%">
            </el-input>
            <div>&nbsp;</div>
            <el-input
              v-model="requestParam.expectedWorkThirdJob"
              maxlength="10"
              placeholder="期望职位"
              style="width:30%;margin:0;margin-left:0">
            </el-input>
            <el-input
              v-model="requestParam.expectedWorkThirdSalary"
              maxlength="10"
              placeholder="期望薪资"
              style="width:15%;margin:0;margin-left:5%">
            </el-input>
            <label style="margin:0">  元/小时</label>
            <el-input
              v-model="requestParam.expectedWorkThirdArea"
              maxlength="10"
              placeholder="期望工作地"
              style="width:20%;margin:0;margin-left:5%">
            </el-input>

          <span slot="footer" class="dialog-footer">
            <el-button @click="handCancle()">取 消</el-button>
            <el-button type="primary" @click="handExpectedWorkConfirm()">确 定</el-button>
          </span>
        </el-dialog>
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
          <div class="MyResumeEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji" @click="workExperienceVisble = true"></span></div>
        </div>
        <el-dialog
            title="技能专长"
            :visible.sync="workExperienceVisble"
            :before-close="handleClose"
            width="750px">

            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="requestParam.workExperience">
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handCancle()">取 消</el-button>
              <el-button type="primary" @click="handWorkExperience()">确 定</el-button>
            </span>
        </el-dialog>
        <div style="height:68%;width:100%;overflow:auto;">
          <pre>{{this.getWorkExperienceDisplay}}</pre>
        </div>
      </div>
    </div>
    <div class="ResumeRightInfo">
      <img src="../../assets/myresume.jpg">
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
  data() {
    return {
      msg: '我的简历',
      responseParam: {
        name: '',
        sex: '',
        birthday: '',
        workTime: '',
        educationBackground: '',
        area: '',
        telephone: '',
        email: '',
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
      },
      requestParam: {
      },
      sexOptions: [
        {
          value: 'man',
          label: '男'
        },
        {
          value: 'woman',
          label: '女'
        },
        {
          value: 'secret',
          label: '保密'
        }
      ],
      workExperienceOptions: [
        {
          value: '一年以内',
          label: '一年以内'
        },
        {
          value: '1-2年',
          label: '1-2年'
        },
        {
          value: '2-3年',
          label: '2-3年'
        },
        {
          value: '3-4年',
          label: '3-4年'
        },
        {
          value: '4-5年',
          label: '4-5年'
        },
        {
          value: '5-6年',
          label: '5-6年'
        },
        {
          value: '6-7年',
          label: '6-7年'
        },
        {
          value: '7年以上',
          label: '7年以上'
        }
      ],
      educationBackgroundOptions: [
        {
          value: '小学及以下',
          label: '小学及以下'
        },
        {
          value: '中学',
          label: '中学'
        },
        {
          value: '高中',
          label: '高中'
        },
        {
          value: '大专',
          label: '大专'
        },
        {
          value: '本科',
          label: '本科'
        },
        {
          value: '研究生',
          label: '研究生'
        },
        {
          value: '博士及以上',
          label: '博士及以上'
        }
      ],
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
            this.requestParam = JSON.parse(JSON.stringify(this.responseParam))
            this.requestParam.birthday = JSON.parse(JSON.stringify(this.responseParam.birthday)).replace(/-/g, '')
            this.requestParam.expertise = JSON.parse(JSON.stringify(this.responseParam.expertise)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
            this.requestParam.workExperience = JSON.parse(JSON.stringify(this.responseParam.workExperience)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
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
            this.requestParam.name = JSON.parse(JSON.stringify(response.data.name))
            this.requestParam.sex = JSON.parse(JSON.stringify(response.data.sex))
            this.requestParam.birthday = JSON.parse(JSON.stringify(this.responseParam.birthday)).replace(/-/g, '')
            this.requestParam.workTime = JSON.parse(JSON.stringify(response.data.workTime))
            this.requestParam.educationBackground = JSON.parse(JSON.stringify(response.data.educationBackground))
            this.requestParam.area = JSON.parse(JSON.stringify(response.data.area))
            this.requestParam.telephone = JSON.parse(JSON.stringify(response.data.telephone))
            this.requestParam.email = JSON.parse(JSON.stringify(response.data.email))
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
          name: this.requestParam.name.replace(/\s*/g, ''),
          sex: this.requestParam.sex,
          birthday: this.requestParam.birthday,
          workTime: this.requestParam.workTime,
          educationBackground: this.requestParam.educationBackground,
          area: this.requestParam.area.replace(/\s*/g, ''),
          telephone: this.requestParam.telephone.replace(/\s*/g, ''),
          email: this.requestParam.email.replace(/\s*/g, '')
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
            this.requestParam.expertise = JSON.parse(JSON.stringify(response.data.expertise)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
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
          expertise: this.requestParam.expertise.replace(/(\s*$)/g, '').replace(/ /g, '&kg;').replace(/\n/g, '&hc;')
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
            this.requestParam.expectedWorkFirstJob = JSON.parse(JSON.stringify(response.data.expectedWorkFirstJob))
            this.requestParam.expectedWorkFirstSalary = JSON.parse(JSON.stringify(response.data.expectedWorkFirstSalary))
            this.requestParam.expectedWorkFirstArea = JSON.parse(JSON.stringify(response.data.expectedWorkFirstArea))
            this.requestParam.expectedWorkSecondJob = JSON.parse(JSON.stringify(response.data.expectedWorkSecondJob))
            this.requestParam.expectedWorkSecondSalary = JSON.parse(JSON.stringify(response.data.expectedWorkSecondSalary))
            this.requestParam.expectedWorkSecondArea = JSON.parse(JSON.stringify(response.data.expectedWorkSecondArea))
            this.requestParam.expectedWorkThirdJob = JSON.parse(JSON.stringify(response.data.expectedWorkThirdJob))
            this.requestParam.expectedWorkThirdSalary = JSON.parse(JSON.stringify(response.data.expectedWorkThirdSalary))
            this.requestParam.expectedWorkThirdArea = JSON.parse(JSON.stringify(response.data.expectedWorkThirdArea))
            this.responseParam.lastModifyDate = response.data.lastModifyDate
            console.log(response)
          }
        }
      )
    },
    setMyResumeExpectedWork: function() {
      // eslint-disable-next-line eqeqeq
      if (this.requestParam.expectedWorkFirstJob.replace(/\s*/g, '') != '' && this.requestParam.expectedWorkSecondJob.replace(/\s*/g, '') != '' && this.requestParam.expectedWorkThirdJob.replace(/\s*/g, '') != '') {
        this.$axios.get(
          'api/api/my-resume/set-expected-work',
          {
            expectedWorkFirstJob: this.requestParam.expectedWorkFirstJob.replace(/\s*/g, ''),
            expectedWorkFirstSalary: this.requestParam.expectedWorkFirstSalary.replace(/\s*/g, ''),
            expectedWorkFirstArea: this.requestParam.expectedWorkFirstArea.replace(/\s*/g, ''),
            expectedWorkSecondJob: this.requestParam.expectedWorkSecondJob.replace(/\s*/g, ''),
            expectedWorkSecondSalary: this.requestParam.expectedWorkSecondSalary.replace(/\s*/g, ''),
            expectedWorkSecondArea: this.requestParam.expectedWorkSecondArea.replace(/\s*/g, ''),
            expectedWorkThirdJob: this.requestParam.expectedWorkThirdJob.replace(/\s*/g, ''),
            expectedWorkThirdSalary: this.requestParam.expectedWorkThirdSalary.replace(/\s*/g, ''),
            expectedWorkThirdArea: this.requestParam.expectedWorkThirdArea.replace(/\s*/g, '')
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              this.getMyResumeExpectedWork()
              Message.success(response.message)
            }
          }
        )
      } else {
        Message.error('请完善信息！')
      }
    },
    getMyResumeWorkExperience: function() {
      this.$axios.get(
        'api/api/my-resume/work-experience',
        {},
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.responseParam.workExperience = response.data.workExperience
            this.requestParam.workExperience = JSON.parse(JSON.stringify(response.data.workExperience)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
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
          workExperience: this.requestParam.workExperience.replace(/(\s*$)/g, '').replace(/ /g, '&kg;').replace(/\n/g, '&hc;')
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            this.getMyResumeWorkExperience()
            Message.success(response.message)
          }
        }
      )
    },
    handleClose() {
      this.handCancle()
    },
    handCancle() {
      this.infoVisble = false
      this.expertiseVisble = false
      this.expectedWorkVisble = false
      this.workExperienceVisble = false
      this.requestParam = JSON.parse(JSON.stringify(this.responseParam))
      this.requestParam.birthday = JSON.parse(JSON.stringify(this.responseParam.birthday)).replace(/-/g, '')
      this.requestParam.expertise = JSON.parse(JSON.stringify(this.responseParam.expertise)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
      this.requestParam.workExperience = JSON.parse(JSON.stringify(this.responseParam.workExperience)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
    },
    handInfoConfirm() {
      this.setMyResumeInfo()
      this.infoVisble = false
    },
    handExpertiseConfirm() {
      // eslint-disable-next-line eqeqeq
      if (this.requestParam.expertise.replace(/(\s*$)/g, '').replace(/ /g, '&kg;').replace(/\n/g, '&hc;') != this.responseParam.expertise) {
        this.setMyResumeExpertise()
        this.expertiseVisble = false
      } else {
        Message.error('未作出修改')
      }
    },
    handExpectedWorkConfirm() {
      this.setMyResumeExpectedWork()
      this.expectedWorkVisble = false
    },
    handWorkExperience() {
      // eslint-disable-next-line eqeqeq
      if (this.requestParam.workExperience.replace(/(\s*$)/g, '').replace(/ /g, '&kg;').replace(/\n/g, '&hc;') != this.responseParam.workExperience) {
        this.setMyResumeWorkExperience()
        this.workExperienceVisble = false
      } else {
        Message.error('未作出修改')
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
  mounted() {
    this.getMyResumeAll()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/MyResume.css'
</style>
