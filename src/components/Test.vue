<template>
 <div>
    <el-button type="primary" @click="dialogVisible = true">主要按钮</el-button>
    <el-dialog
      title="xxxx的简历"
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose">
      <Test v-bind:userName="this.name"></Test>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleCancle()">关闭</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
import Test from './page-template/static-template/GetSomeBodyResume'
export default {
  data() {
    return {
      msg: 'Test',
      name: 'dingshuangwu',
      dialogVisible: false
    }
  },
  methods: {
    handleClose() {
      this.handleCancle()
    },
    handleCancle() {
      this.dialogVisible = false
    }
  },
  components: {
    Test
  }
}
</script>

<style scope>
</style>
