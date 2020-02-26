<template>
 <div class="InfoPage">
    <div class="InfoContext">
      <div class="InfoContextDiv">
        <el-dialog
          title="编辑个人信息"
          :visible.sync="infoVisble"
          :before-close="handleClose"
          append-to-body
          center
          width="750px">

            <label style="margin-right:1%">姓名:</label>
            <el-input
              v-model="requestParam.name"
              maxlength="10"
              placeholder="请输入姓名"
              style="width:30.5%">
            </el-input>
            <label style="margin-left:9.5%;margin-right:1%">性别:</label>
            <el-select v-model="requestParam.sex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div>&nbsp;</div>
            <label style="margin-right:1%;margin-left:0.5%">名族:</label>
            <el-select v-model="requestParam.nation" placeholder="请选择">
              <el-option
                v-for="item in nationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="margin-right:1%;margin-left:5.5%">出生日期:</label>
            <el-date-picker
              v-model="requestParam.birthday"
              type="date"
              value-format="yyyyMMdd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="选择日期">
            </el-date-picker>
            <div>&nbsp;</div>
            <label style="margin-right:1%;margin-left:0%">学历:</label>
            <el-select v-model="requestParam.educationBackground" placeholder="请选择">
              <el-option
                v-for="item in educationBackgroundOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label style="margin-right:1%;margin-left:5%">手机/微信:</label>
            <el-input
              v-model="requestParam.telephone"
              maxlength="20"
              placeholder="请输入手机/微信"
              style="width:30.5%">
            </el-input>
            <div>&nbsp;</div>
            <label style="margin-left:0%;margin-right:1%">联系邮箱:</label>
            <el-input
              v-model="requestParam.email"
              maxlength="30"
              placeholder="请输入联系邮箱"
              style="width:35%">
            </el-input>

          <span slot="footer" class="dialog-footer">
            <el-button @click="handCancle()">取 消</el-button>
            <el-button type="primary" @click="handInfoConfirm()">确 定</el-button>
          </span>
        </el-dialog>
        <div class="MyInfoEdictorIcon" style="position:relative;left:36%;"><span class="icon iconfont icon-bianji" @click="infoVisble = true"></span></div>
        <div class="InfoContextDivMyInfo">
          <div style="text-align:left;line-height:30px">
              <span class="icon iconfont icon-shuaxin2" style="cursor: pointer" @click="getUserAllInfo()"></span>
              <p style="font-size:10px ;min-width:200px">最后一次更新：{{responseParam.lastModifyDate}}&nbsp;</p>
          </div>
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
          <img class="MyInfoImage" v-bind:src="this.responseParam.imageUrl" alt="无法正常显示" @click="uploadImageVisble = true">
          <el-dialog
            title="上传头像"
            :visible.sync="uploadImageVisble"
            width="50%"
            append-to-body
            center>
            <div style="text-align:center;margin:auto"><Upload v-bind:user-id="this.userId" @getUserImage='getUserImage'></Upload></div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="uploadImageVisble = false" style="float:right">关&nbsp;闭</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div class="InfoContextDiv">
         <div style="text-align:left;line-height:40px;margin-left:-5%;">
           <h3>个人介绍:</h3>
           <div class="MyInfoEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji" @click="selfIntroductionVisble = true"></span></div>
         </div>
         <el-dialog
          title="编辑个人介绍"
          :visible.sync="selfIntroductionVisble"
          :before-close="handleClose"
          append-to-body
          center
          width="750px">

            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="requestParam.selfIntroduction">
            </el-input>

          <span slot="footer" class="dialog-footer">
            <el-button @click="handCancle()">取 消</el-button>
            <el-button type="primary" @click="handSelfIntroductionConfirm()">确 定</el-button>
          </span>
         </el-dialog>
         <div style="height:68%;width:100%;overflow:auto;text-align:left">
          <pre>{{this.getSelfIntroductionDisplay}}</pre>
         </div>
      </div>
      <div class="InfoContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;">
          <h3>教育经历:</h3>
          <div class="MyInfoEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji" @click="educationExperienceVisble = true"></span></div>
        </div>
        <el-dialog
          title="编辑教育经历"
          :visible.sync="educationExperienceVisble"
          :before-close="handleClose"
          append-to-body
          center
          width="900px">

           <el-date-picker
              v-model="requestParam.educationExperienceFirstStartDate"
              type="date"
              value-format="yyyyMMdd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="起始日期">
            </el-date-picker>
            <span style="margin:0">&nbsp;&nbsp;至&nbsp;&nbsp;</span>
            <el-date-picker
              v-model="requestParam.educationExperienceFirstEndDate"
              type="date"
              value-format="yyyyMMdd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="结束日期">
            </el-date-picker>
            <span style="margin:0">&nbsp;&nbsp;于&nbsp;&nbsp;</span>
            <el-input
              v-model="requestParam.educationExperienceFirstSchool"
              maxlength="10"
              placeholder="所在院校"
              style="width:30.5%">
            </el-input>
            <div>&nbsp;</div>
            <el-date-picker
              v-model="requestParam.educationExperienceSecondStartDate"
              type="date"
              value-format="yyyyMMdd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="起始日期">
            </el-date-picker>
            <span style="margin:0">&nbsp;&nbsp;至&nbsp;&nbsp;</span>
            <el-date-picker
              v-model="requestParam.educationExperienceSecondEndDate"
              type="date"
              value-format="yyyyMMdd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="结束日期">
            </el-date-picker>
            <span style="margin:0">&nbsp;&nbsp;于&nbsp;&nbsp;</span>
            <el-input
              v-model="requestParam.educationExperienceSecondSchool"
              maxlength="10"
              placeholder="所在院校"
              style="width:30.5%">
            </el-input>
            <div>&nbsp;</div>
            <el-date-picker
              v-model="requestParam.educationExperienceThirdStartDate"
              type="date"
              value-format="yyyyMMdd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="起始日期">
            </el-date-picker>
            <span style="margin:0">&nbsp;&nbsp;至&nbsp;&nbsp;</span>
            <el-date-picker
              v-model="requestParam.educationExperienceThirdEndDate"
              type="date"
              value-format="yyyyMMdd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="结束日期">
            </el-date-picker>
            <span style="margin:0">&nbsp;&nbsp;于&nbsp;&nbsp;</span>
            <el-input
              v-model="requestParam.educationExperienceThirdSchool"
              maxlength="10"
              placeholder="所在院校"
              style="width:30.5%">
            </el-input>

          <span slot="footer" class="dialog-footer">
            <el-button @click="handCancle()">取 消</el-button>
            <el-button type="primary" @click="handEducationExperienceConfirm()">确 定</el-button>
          </span>
        </el-dialog>
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
          <div class="MyInfoEdictorIcon" style="left:81%"><span class="icon iconfont icon-bianji" @click="selfSignatureVisble = true"></span></div>
        </div>
        <el-dialog
          title="个人签名"
          :visible.sync="selfSignatureVisble"
          :before-close="handleClose"
          append-to-body
          center
          width="750px">

            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="requestParam.selfSignature">
            </el-input>

          <span slot="footer" class="dialog-footer">
            <el-button @click="handCancle()">取 消</el-button>
            <el-button type="primary" @click="handSelfSignatureConfirm()">确 定</el-button>
          </span>
        </el-dialog>
        <div style="height:68%;width:100%;overflow:auto;">
          <pre>{{this.getSelfSignatureDisplay}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from './UserInfoImageUpload'
import { Message } from 'element-ui'
export default {
  props: {
    userId: {
      default: ''
    }
  },
  data() {
    return {
      msg: '我的简历',
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
      },
      requestParam: {
      },
      nationOptions: [
        { lable: '汉族', value: '汉族' },
        { lable: '蒙古族', value: '蒙古族' },
        { lable: '回族', value: '回族' },
        { lable: '藏族', value: '藏族' },
        { lable: '维吾尔族', value: '维吾尔族' },
        { lable: '苗族', value: '苗族' },
        { lable: '彝族', value: '彝族' },
        { lable: '壮族', value: '壮族' },
        { lable: '布依族', value: '布依族' },
        { lable: '朝鲜族', value: '朝鲜族' },
        { lable: '满族', value: '满族' },
        { lable: '侗族', value: '侗族' },
        { lable: '瑶族', value: '瑶族' },
        { lable: '白族', value: '白族' },
        { lable: '土家族', value: '土家族' },
        { lable: '哈尼族', value: '哈尼族' },
        { lable: '哈萨克族', value: '哈萨克族' },
        { lable: '傣族', value: '傣族' },
        { lable: '黎族', value: '黎族' },
        { lable: '傈僳族', value: '傈僳族' },
        { lable: '佤族', value: '佤族' },
        { lable: '畲族', value: '畲族' },
        { lable: '高山族', value: '高山族' },
        { lable: '拉祜族', value: '拉祜族' },
        { lable: '水族', value: '水族' },
        { lable: '东乡族', value: '东乡族' },
        { lable: '纳西族', value: '纳西族' },
        { lable: '景颇族', value: '景颇族' },
        { lable: '柯尔克孜族', value: '柯尔克孜族' },
        { lable: '土族', value: '土族' },
        { lable: '达翰尔族', value: '达翰尔族' },
        { lable: '么佬族', value: '么佬族' },
        { lable: '羌族', value: '羌族' },
        { lable: '布朗族', value: '布朗族' },
        { lable: '撒拉族', value: '撒拉族' },
        { lable: '毛南族', value: '毛南族' },
        { lable: '仡佬族', value: '仡佬族' },
        { lable: '锡伯族', value: '锡伯族' },
        { lable: '阿昌族', value: '阿昌族' },
        { lable: '普米族', value: '普米族' },
        { lable: '塔吉克族', value: '塔吉克族' },
        { lable: '怒族', value: '怒族' },
        { lable: '乌孜别克族', value: '乌孜别克族' },
        { lable: '俄罗斯族', value: '俄罗斯族' },
        { lable: '鄂温克族', value: '鄂温克族' },
        { lable: '德昂族', value: '德昂族' },
        { lable: '保安族', value: '保安族' },
        { lable: '裕固族', value: '裕固族' },
        { lable: '京族', value: '京族' },
        { lable: '塔塔尔族', value: '塔塔尔族' },
        { lable: '独龙族', value: '独龙族' },
        { lable: '鄂伦春族', value: '鄂伦春族' },
        { lable: '赫哲族', value: '赫哲族' },
        { lable: '门巴族', value: '门巴族' },
        { lable: '珞巴族', value: '珞巴族' },
        { lable: '基诺族', value: '基诺族' }
      ],
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
      uploadImageVisble: false,
      infoVisble: false,
      selfIntroductionVisble: false,
      educationExperienceVisble: false,
      selfSignatureVisble: false
    }
  },
  components: {
    Upload
  },
  methods: {
    getUserAllInfo: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/get-user-info-all',
          {
            id: this.userId
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              this.responseParam = response.data
              this.requestParam = JSON.parse(JSON.stringify(this.responseParam))
              this.requestParam.birthday = JSON.parse(JSON.stringify(this.responseParam.birthday)).replace(/-/g, '')
              this.requestParam.educationExperienceFirstStartDate = JSON.parse(JSON.stringify(response.data.educationExperienceFirstStartDate)).replace(/-/g, '')
              this.requestParam.educationExperienceFirstEndDate = JSON.parse(JSON.stringify(response.data.educationExperienceFirstEndDate)).replace(/-/g, '')
              this.requestParam.educationExperienceSecondStartDate = JSON.parse(JSON.stringify(response.data.educationExperienceSecondStartDate)).replace(/-/g, '')
              this.requestParam.educationExperienceSecondEndDate = JSON.parse(JSON.stringify(response.data.educationExperienceSecondEndDate)).replace(/-/g, '')
              this.requestParam.educationExperienceThirdStartDate = JSON.parse(JSON.stringify(response.data.educationExperienceThirdStartDate)).replace(/-/g, '')
              this.requestParam.educationExperienceThirdEndDate = JSON.parse(JSON.stringify(response.data.educationExperienceThirdEndDate)).replace(/-/g, '')
              this.requestParam.selfIntroduction = JSON.parse(JSON.stringify(this.responseParam.selfIntroduction)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
              this.requestParam.selfSignature = JSON.parse(JSON.stringify(this.responseParam.selfSignature)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
              console.log(response)
            }
          }
        )
      }
    },
    getUserInfo: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/get-user-info',
          {
            id: this.userId
          },
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
              this.responseParam.birthday = response.data.birthday
              this.requestParam.name = JSON.parse(JSON.stringify(response.data.name))
              this.requestParam.nation = JSON.parse(JSON.stringify(response.data.nation))
              this.requestParam.sex = JSON.parse(JSON.stringify(response.data.sex))
              this.requestParam.educationBackground = JSON.parse(JSON.stringify(response.data.educationBackground))
              this.requestParam.telephone = JSON.parse(JSON.stringify(response.data.telephone))
              this.requestParam.email = JSON.parse(JSON.stringify(response.data.email))
              this.requestParam.imageUrl = JSON.parse(JSON.stringify(response.data.imageUrl))
              this.requestParam.birthday = JSON.parse(JSON.stringify(this.responseParam.birthday)).replace(/-/g, '')
              this.responseParam.lastModifyDate = response.data.lastModifyDate
              console.log(response)
            }
          }
        )
      }
    },
    setUserInfo: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/set-user-info',
          {
            id: this.userId,
            name: this.requestParam.name.replace(/\s*/g, ''),
            nation: this.requestParam.nation,
            sex: this.requestParam.sex,
            birthday: this.requestParam.birthday,
            educationBackground: this.requestParam.educationBackground,
            telephone: this.requestParam.telephone.replace(/\s*/g, ''),
            email: this.requestParam.email.replace(/\s*/g, '')
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              this.getUserInfo()
              Message.success(response.message)
            }
          }
        )
      }
    },
    getUserImage: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/get-user-image',
          {
            id: this.userId
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              this.responseParam.imageUrl = response.data.imageUrl
              this.responseParam.lastModifyDate = response.data.lastModifyDate
              console.log(response)
            }
          }
        )
      }
    },
    getSelfIntroduction: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/get-user-self-introduction',
          {
            id: this.userId
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              this.responseParam.selfIntroduction = response.data.selfIntroduction
              this.requestParam.selfIntroduction = JSON.parse(JSON.stringify(response.data.selfIntroduction)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
              this.responseParam.lastModifyDate = response.data.lastModifyDate
              console.log(response)
            }
          }
        )
      }
    },
    setSelfIntroduction: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/set-user-self-introduction',
          {
            id: this.userId,
            selfIntroduction: this.requestParam.selfIntroduction.replace(/(\s*$)/g, '').replace(/ /g, '&kg;').replace(/\n/g, '&hc;')
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              this.getSelfIntroduction()
              Message.success(response.message)
            }
          }
        )
      }
    },
    getEducationExperience: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/get-user-education-experience',
          {
            id: this.userId
          },
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
              this.requestParam.educationExperienceFirstStartDate = JSON.parse(JSON.stringify(response.data.educationExperienceFirstStartDate)).replace(/-/g, '')
              this.requestParam.educationExperienceFirstEndDate = JSON.parse(JSON.stringify(response.data.educationExperienceFirstEndDate)).replace(/-/g, '')
              this.requestParam.educationExperienceFirstSchool = JSON.parse(JSON.stringify(response.data.educationExperienceFirstSchool))
              this.requestParam.educationExperienceSecondStartDate = JSON.parse(JSON.stringify(response.data.educationExperienceSecondStartDate)).replace(/-/g, '')
              this.requestParam.educationExperienceSecondEndDate = JSON.parse(JSON.stringify(response.data.educationExperienceSecondEndDate)).replace(/-/g, '')
              this.requestParam.educationExperienceSecondSchool = JSON.parse(JSON.stringify(response.data.educationExperienceSecondSchool))
              this.requestParam.educationExperienceThirdStartDate = JSON.parse(JSON.stringify(response.data.educationExperienceThirdStartDate)).replace(/-/g, '')
              this.requestParam.educationExperienceThirdEndDate = JSON.parse(JSON.stringify(response.data.educationExperienceThirdEndDate)).replace(/-/g, '')
              this.requestParam.educationExperienceThirdSchool = JSON.parse(JSON.stringify(response.data.educationExperienceThirdSchool))
              this.responseParam.lastModifyDate = response.data.lastModifyDate
              console.log(response)
            }
          }
        )
      }
    },
    setEducationExperience: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        // eslint-disable-next-line eqeqeq
        if (this.requestParam.educationExperienceFirstSchool.replace(/\s*/g, '') != '' && this.requestParam.educationExperienceSecondSchool.replace(/\s*/g, '') != '' && this.requestParam.educationExperienceThirdSchool.replace(/\s*/g, '') != '') {
          this.$axios.post(
            'api/api/management/set-user-education-experience',
            {
              id: this.userId,
              educationExperienceFirstStartDate: this.requestParam.educationExperienceFirstStartDate,
              educationExperienceFirstEndDate: this.requestParam.educationExperienceFirstEndDate,
              educationExperienceFirstSchool: this.requestParam.educationExperienceFirstSchool.replace(/\s*/g, ''),
              educationExperienceSecondStartDate: this.requestParam.educationExperienceSecondStartDate,
              educationExperienceSecondEndDate: this.requestParam.educationExperienceSecondEndDate,
              educationExperienceSecondSchool: this.requestParam.educationExperienceSecondSchool.replace(/\s*/g, ''),
              educationExperienceThirdStartDate: this.requestParam.educationExperienceThirdStartDate,
              educationExperienceThirdEndDate: this.requestParam.educationExperienceThirdEndDate,
              educationExperienceThirdSchool: this.requestParam.educationExperienceThirdSchool.replace(/\s*/g, '')
            },
            response => {
            // eslint-disable-next-line eqeqeq
              if (response.code == 200) {
                this.getEducationExperience()
                Message.success(response.message)
              }
            }
          )
        } else {
          Message.error('请完善信息！')
        }
      }
    },
    getSelfSignature: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/get-user-self-signature',
          {
            id: this.userId
          },
          response => {
            // eslint-disable-next-line eqeqeq
            if (response.code == 200) {
              this.responseParam.selfSignature = response.data.selfSignature
              this.requestParam.selfSignature = JSON.parse(JSON.stringify(response.data.selfSignature)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
              this.responseParam.lastModifyDate = response.data.lastModifyDate
              console.log(response)
            }
          }
        )
      }
    },
    setSelfSignature: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.$axios.post(
          'api/api/management/set-user-self-signature',
          {
            id: this.userId,
            selfSignature: this.requestParam.selfSignature.replace(/(\s*$)/g, '').replace(/ /g, '&kg;').replace(/\n/g, '&hc;')
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
    handleClose() {
      this.handCancle()
    },
    handCancle() {
      this.infoVisble = false
      this.selfIntroductionVisble = false
      this.educationExperienceVisble = false
      this.selfSignatureVisble = false
      this.requestParam = JSON.parse(JSON.stringify(this.responseParam))
      this.requestParam.birthday = JSON.parse(JSON.stringify(this.responseParam.birthday)).replace(/-/g, '')
      this.requestParam.educationExperienceFirstStartDate = JSON.parse(JSON.stringify(this.responseParam.educationExperienceFirstStartDate)).replace(/-/g, '')
      this.requestParam.educationExperienceFirstEndDate = JSON.parse(JSON.stringify(this.responseParam.educationExperienceFirstEndDate)).replace(/-/g, '')
      this.requestParam.educationExperienceSecondStartDate = JSON.parse(JSON.stringify(this.responseParam.educationExperienceSecondStartDate)).replace(/-/g, '')
      this.requestParam.educationExperienceSecondEndDate = JSON.parse(JSON.stringify(this.responseParam.educationExperienceSecondEndDate)).replace(/-/g, '')
      this.requestParam.educationExperienceThirdStartDate = JSON.parse(JSON.stringify(this.responseParam.educationExperienceThirdStartDate)).replace(/-/g, '')
      this.requestParam.educationExperienceThirdEndDate = JSON.parse(JSON.stringify(this.responseParam.educationExperienceThirdEndDate)).replace(/-/g, '')
      this.requestParam.selfIntroduction = JSON.parse(JSON.stringify(this.responseParam.selfIntroduction)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
      this.requestParam.selfSignature = JSON.parse(JSON.stringify(this.responseParam.selfSignature)).replace(/&kg;/g, ' ').replace(/&hc;/g, '\n')
    },
    handInfoConfirm() {
      this.setUserInfo()
      this.infoVisble = false
    },
    handSelfIntroductionConfirm() {
      // eslint-disable-next-line eqeqeq
      if (this.requestParam.selfIntroduction.replace(/(\s*$)/g, '').replace(/ /g, '&kg;').replace(/\n/g, '&hc;') != this.responseParam.selfIntroduction) {
        this.setSelfIntroduction()
        this.selfIntroductionVisble = false
      } else {
        Message.error('未作出修改')
      }
    },
    handEducationExperienceConfirm() {
      this.setEducationExperience()
      this.educationExperienceVisble = false
    },
    handSelfSignatureConfirm() {
      // eslint-disable-next-line eqeqeq
      if (this.requestParam.selfSignature.replace(/(\s*$)/g, '').replace(/ /g, '&kg;').replace(/\n/g, '&hc;') != this.responseParam.selfSignature) {
        this.setSelfSignature()
        this.selfSignatureVisble = false
      } else {
        Message.error('未作出修改')
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
  watch: {
    userId: function() {
      // eslint-disable-next-line eqeqeq
      if (this.userId != '') {
        this.getUserAllInfo()
      }
    }
  },
  mounted() {
    // eslint-disable-next-line eqeqeq
    if (this.userId != '') {
      this.getUserAllInfo()
    }
  }
}
</script>

<style scoped>
@import '../../../styles/management-page/static-template/UserInfo.css'
</style>
