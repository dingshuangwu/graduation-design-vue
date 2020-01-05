<template>
  <div class="ResumePage">
    <div><Top></Top></div>
    <div class="ResumeContext">
      <div class="ResumeContextDiv">
        <div class="ResumeContextDivMyInfo">
          <div style="text-align:left;line-height:30px"><span class="icon iconfont icon-shuaxin2"></span><p style="font-size:10px">最后一次更新：2019-11-23 18:54:20</p></div>
          <div style="text-align:left;">
            <h2>用户名</h2>
            <h3 v-if="this.sex=='man'" class="Sex">♂</h3>
            <h3 v-if="this.sex=='woman'" class="Sex">♀</h3>
          </div>
          <div style="text-align:left;line-height:50px">
            <i class="el-icon-goods"></i><p>一年以内经验</p>
            <span class="icon iconfont icon-edu-line"></span><p>本科</p>
           <span class="icon iconfont icon-75"></span><p>安徽·合肥</p>
          </div>
          <div style="text-align:left"><span class="icon iconfont icon-shouji1" style="margin-left:7%"></span><span class="icon iconfont icon-weixin2" style="margin-left:2%"></span><p>17856165587</p><i class="el-icon-message"></i><p>dingshuangwu@vip.qq.com</p></div>
        </div>
        <div class="ResumeContextDivMyImage">
          <img src="../../assets/wk.jpg">
        </div>
      </div>
      <div class="ResumeContextDiv">
         <div style="text-align:left;line-height:40px;margin-left:-5%;"><h3>个人优势:</h3></div>
         <div v-if="true" style="height:68%;width:100%;overflow:auto;">
           <pre v-html="this.textarea">
           </pre>
          </div>
         <el-input v-if="false"
            type="textarea"
            v-model="textarea"
            maxlength="200"
            show-word-limit
            autosize>
         </el-input>
      </div>
      <div class="ResumeContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;"><h3>期望职位:</h3></div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
        <span class="icon iconfont icon-zhuanyezhishijineng"></span><p>Java</p><span class="icon iconfont icon-xinzi"></span><p>10k-20k</p><span class="icon iconfont icon-diqu1"></span><p>合肥</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
        <span class="icon iconfont icon-zhuanyezhishijineng"></span><p>Java</p><span class="icon iconfont icon-xinzi"></span><p>10k-20k</p><span class="icon iconfont icon-diqu1"></span><p>合肥</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
        <span class="icon iconfont icon-zhuanyezhishijineng"></span><p>Java</p><span class="icon iconfont icon-xinzi"></span><p>10k-20k</p><span class="icon iconfont icon-diqu1"></span><p>合肥</p>
        </div>
      </div>
      <div class="ResumeContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;"><h3>工作经验:</h3></div>
        <div style="height:68%;width:100%;overflow:auto;">
          <pre>
2016-01——2016-07:
安徽合肥
2016-01——2016-07:
安徽合肥
2016-01——2016-07:
安徽合肥
2016-01——2016-07:
安徽合肥
          </pre>
        </div>
      </div>
    </div>
    <div class="ResumeRightInfo"></div>
    <div style="clear:both"><Bottom/></div>
  </div>
</template>
<script>
import Bottom from '../page-template/Bottom'
export default {
  data() {
    return {
      msg: '我的简历',
      // man or 'woman'
      sex: 'man',
      textarea: '熟练使用c、java编程语言，熟悉Spring、SpringMVC、Springboot、SpringCloud框架，Mybatis、Hibernate等持久层框架</br>，熟悉tomcat，nginx等http服务器，熟悉mysql、redis，熟悉linux环境工程部署与调试。</br>了解一些html、css、JavaScript前端编程语言。经常使用的开发框架Springboot+Mybatis+SpringCloud'

    }
  },
  components: {
    Bottom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/MyResume.css'
</style>
