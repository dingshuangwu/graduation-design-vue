<template>
 <div>
    <Top/>
    <el-button type="success" @click="centerDialogVisible = true">上传头像</el-button>
    <el-dialog
      title="上传头像"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <div style="text-align:center"><Upload/></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
import Upload from './page-template/static-template/UploadUserImage'
export default {
  data() {
    return {
      msg: '文件上传模块',
      centerDialogVisible: false
    }
  },
  components: {
    Upload
  }
}
</script>

<style scope>
</style>
