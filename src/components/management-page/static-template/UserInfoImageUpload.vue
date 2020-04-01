<template>
  <div style="min-width: 540px;width:600px;">
    <div class="eleme">
      <el-upload
        ref="upload"
        action=""
        :before-upload="beforeUpload"
        :auto-upload="true"
        :show-file-list="false">
        <el-button style="margin-left: 30px;" slot="trigger" size="small" type="primary">选取图片</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传头像</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <div>
      <br />
      <el-button type="primary" icon="el-icon-refresh-right" circle @click="rotateRight" style="margin-left: 30px;"></el-button>
      <el-button type="success" icon="el-icon-refresh-left" circle @click="rotateLeft"></el-button>
      <el-button type="danger" icon="el-icon-plus" circle @click="changeScale(1)"></el-button>
      <el-button type="warning" icon="el-icon-minus" circle @click="changeScale(-1)"></el-button>
    </div>
    <div class="cropper">
      <div class="cropper-content" style="margin-top:60px;margin-left:186px;">
        <div class="cropper">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
            @imgLoad="imgLoad"
          ></vueCropper>
        </div>
        <div style="margin-left:20px;">
          <div
            class="show-preview"
            :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}"
          >
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { Message } from 'element-ui'
export default {
  props: {
    userId: {
      default: ''
    }
  },
  data() {
    return {
      msg: '文件上传模块',
      previews: {},
      option: {
        img: '',
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: true
      },
      fileName: '' // 本机文件地址
    }
  },
  components: {
    VueCropper
  },
  methods: {
    submitUpload(file) {
      this.finish('base64')
    },
    beforeUpload(file) {
      let data = window.URL.createObjectURL(new Blob([file]))
      this.fileName = file.name
      this.option.img = data
      return false
    },
    // 放大/缩小
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 上传图片（点击上传按钮）
    finish(type) {
      // eslint-disable-next-line eqeqeq
      if (type === 'base64' && this.userId != '') {
        let This = this
        this.$refs.cropper.getCropBlob(data => {
          if (data.size / 1024 / 1024 > 2) {
            Message.error('图片最大为2MB')
          } else {
            let base64 = ''
            let reader = new FileReader()
            reader.onload = function(e) {
              base64 = e.target.result
              // eslint-disable-next-line eqeqeq
              if (base64 && base64 != '') {
                This.$axios.post(
                  'api/management/set-user-image',
                  {
                    id: This.userId,
                    imageUrl: base64
                  },
                  response => {
                  // eslint-disable-next-line eqeqeq
                    if (response.code == 200) {
                      This.$emit('getUserImage')
                      Message.success('上传成功')
                    }
                  }
                )
              } else {
                Message.error('图片获取失败')
              }
            }
            reader.readAsDataURL(data)
          }
        })
      } else {
        Message.error('图片编码失败或者对象id错误！')
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data
    },
    imgLoad(msg) {
      console.log(msg)
    }
  }
}
</script>

<style lang="less">
.cropper-content {
  min-width: 540px;
  display: flex;
  //   display: -webkit-flex;
  //   justify-content: flex-end;
  //   -webkit-justify-content: flex-end;
  .cropper {
    width: 260px;
    height: 260px;
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
.cropper-content .show-preview .preview {
  margin-left: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
</style>
