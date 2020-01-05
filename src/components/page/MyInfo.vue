<template>
  <div class="InfoPage">
    <div><Top></Top></div>
    <div class="InfoContext">
      <div class="InfoContextDiv">
        <div class="InfoContextDivMyInfo">
          <div style="text-align:left;line-height:30px"><span class="icon iconfont icon-shuaxin2"></span><p style="font-size:10px">最后一次更新：2019-11-23 18:54:20</p></div>
          <div style="text-align:left;">
            <h2>用户名</h2>
            <h3 v-if="this.sex=='man'" class="Sex">♂</h3>
            <h3 v-if="this.sex=='woman'" class="Sex">♀</h3>
          </div>
          <div style="text-align:left;line-height:50px">
            <span class="icon iconfont icon-moban"></span><p>汉族</p>
            <span class="icon iconfont icon-xingbie"></span><p>男</p>
           <span class="icon iconfont icon-xueli3"></span><p>本科</p>
          </div>
          <div style="text-align:left"><span class="icon iconfont icon-weixin2"></span><p>17856165587</p><span class="icon iconfont icon-youxiang5"></span><p>dingshuangwu@vip.qq.com</p></div>
        </div>
        <div class="InfoContextDivMyImage">
          <img src="../../assets/wk.jpg">
        </div>
      </div>
      <div class="InfoContextDiv">
         <div style="text-align:left;line-height:40px;margin-left:-5%;"><h3>个人介绍:</h3></div>
         <div style="height:68%;width:100%;overflow:auto;">
           <pre>
 练习时长两年半的Java练习生，

喜欢唱、跳、Rap

           </pre>
          </div>
      </div>
      <div class="InfoContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;"><h3>教育经历:</h3></div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
        <span class="icon iconfont icon-shijian3"></span><p>20xx-xx-xx</p><span class="icon iconfont icon-shijian3"></span><p>20xx-xx-xx</p><span class="icon iconfont icon-xuexiaoqingkuang"></span><p>阜阳师范</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
        <span class="icon iconfont icon-shijian3"></span><p>20xx-xx-xx</p><span class="icon iconfont icon-shijian3"></span><p>20xx-xx-xx</p><span class="icon iconfont icon-xuexiaoqingkuang"></span><p>阜阳师范</p>
        </div>
        <div style="text-align:left;line-height:40px;margin-left:0%;">
        <span class="icon iconfont icon-shijian3"></span><p>20xx-xx-xx</p><span class="icon iconfont icon-shijian3"></span><p>20xx-xx-xx</p><span class="icon iconfont icon-xuexiaoqingkuang"></span><p>阜阳师范</p>
        </div>
      </div>
      <div class="InfoContextDiv">
        <div style="text-align:left;line-height:40px;margin-left:-5%;"><h3>个人签名:</h3></div>
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
    <div class="InfoRightInfo"></div>
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
      sex: 'man'
    }
  },
  components: {
    Bottom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../styles/page/MyInfo.css'
</style>
