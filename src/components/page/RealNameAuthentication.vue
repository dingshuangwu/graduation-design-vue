<template>
    <div class="RealNameAuthenticationPage">
        <div class="RealNameAuthenticationTop"><Top></Top></div>
        <div class="RealNameAuthenticationContext">
            <div class="RealNameAuthenticationContextSteps">
                <el-steps :active="active"
                finish-status="success"
                align-center>
                    <el-step title="身份证正面照" description="要求照片清晰、大小小于1mb"></el-step>
                    <el-step title="身份证反面照" description="要求照片清晰、大小小于1mb"></el-step>
                    <el-step title="最近一年内的照片" description="要求照片清晰、素颜、头发不得遮挡眉毛以下部分、大小小于1mb"></el-step>
                </el-steps>
            </div>
            <div class="RealNameAuthenticationContextUploadPhotos">
                <img :src="getWhichPhotos()" v-if="this.active<3" @click="openUpload()">
                <div v-if="this.active>=3" class="LastImage">
                    <img :src="this.getWhichPhotoUrl(0)">
                    <img :src="this.getWhichPhotoUrl(1)">
                    <img :src="this.getWhichPhotoUrl(2)">
                </div>
                <el-dialog
                    title="上传照片"
                    :visible.sync="dialogVisible"
                    width="60%"
                    :before-close="handleClose"
                    append-to-body
                    center>
                    <RealNameAuthenticationUploadImage @setBaseUrl='setBaseUrl'></RealNameAuthenticationUploadImage>
                </el-dialog>
            </div>
            <div class="RealNameAuthenticationContextNext">
                <el-button v-if="active>0" @click="goBack()">上一步</el-button>
                <el-button v-if="active<3" @click="next()">下一步</el-button>
                <el-button v-if="active>=3" @click="submit()">提 交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import RealNameAuthenticationUploadImage from '../page-template/static-template/RealNameAuthenticationUploadImage'
import { uploadicon } from '../../assets/uploadicon'
import { Message } from 'element-ui'
import { setJurisdiction, getJurisdiction } from '../../utils/auth'
export default {
  data() {
    return {
      msg: '实名认证申请',
      active: 0,
      dialogVisible: false,
      identityCardFront: '',
      identityCardReverse: '',
      currentPhoto: ''
    }
  },
  components: {
    RealNameAuthenticationUploadImage
  },
  methods: {
    next: function() {
      if (this.active < 3) {
        // eslint-disable-next-line eqeqeq
        if (this.active == 0 && this.identityCardFront != '') {
          this.active++
        // eslint-disable-next-line eqeqeq
        } else if (this.active == 1 && this.identityCardReverse != '') {
          this.active++
        // eslint-disable-next-line eqeqeq
        } else if (this.active == 2 && this.currentPhoto != '') {
          this.active++
        } else {
          Message.error('请上传图片！')
        }
      }
    },
    goBack: function() {
      if (this.active > 0) {
        this.active--
      }
    },
    display: function() {
      // eslint-disable-next-line eqeqeq
      if (this.active == 0 && this.identityCardFront != '') {
        return true
      // eslint-disable-next-line eqeqeq
      } else if (this.active == 1 && this.identityCardReverse != '') {
        return true
      // eslint-disable-next-line eqeqeq
      } else if (this.active == 2 && this.currentPhoto != '') {
        return true
      } else {
        return false
      }
    },
    submit: function() {
      this.$axios.post(
        'api/api/user-apply/real-name-authentication',
        {
          identityCardFront: this.identityCardFront,
          identityCardReverse: this.identityCardReverse,
          currentPhoto: this.currentPhoto
        },
        response => {
        // eslint-disable-next-line eqeqeq
          if (response.code == 200) {
            Message.success(response.message)
            let jurisdiction = getJurisdiction()
            jurisdiction.realNameAuthentication = false
            setJurisdiction(jurisdiction)
            this.$router.go(0)
            this.$router.push({ path: '/my-info' })
          }
        }
      )
    },
    openUpload: function() {
      this.dialogVisible = true
    },
    handleClose: function() {
      this.dialogVisible = false
    },
    setBaseUrl: function(val) {
      // eslint-disable-next-line eqeqeq
      if (this.active == 0) {
        this.identityCardFront = val

      // eslint-disable-next-line eqeqeq
      } else if (this.active == 1) {
        this.identityCardReverse = val
      // eslint-disable-next-line eqeqeq
      } else if (this.active == 2) {
        this.currentPhoto = val
      }
      this.handleClose()
    },
    getWhichPhotos: function() {
      // eslint-disable-next-line eqeqeq
      if (this.active == 0 && this.identityCardFront != '') {
        return this.identityCardFront
      // eslint-disable-next-line eqeqeq
      } else if (this.active == 1 && this.identityCardReverse != '') {
        return this.identityCardReverse
      // eslint-disable-next-line eqeqeq
      } else if (this.active == 2 && this.currentPhoto != '') {
        return this.currentPhoto
      } else {
        return uploadicon
      }
    },
    getWhichPhotoUrl: function(val) {
      // eslint-disable-next-line eqeqeq
      if (val == 0 && this.identityCardFront != '') {
        return this.identityCardFront
      // eslint-disable-next-line eqeqeq
      } else if (val == 1 && this.identityCardReverse != '') {
        return this.identityCardReverse
      // eslint-disable-next-line eqeqeq
      } else if (val == 2 && this.currentPhoto != '') {
        return this.currentPhoto
      } else {
        return uploadicon
      }
    }
  }
}
</script>
<style scoped>
@import '../../styles/page/RealNameAuthentication.css'
</style>
