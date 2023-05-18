<template>
  <transition :name="transitionName">
    <div class="page-component-up"
      @click="backToTop"
      v-show="visible"
      :style="customStyle">
      顶部
      <i class="el-icon-caret-top"></i>
    </div>
  </transition>
</template>
 
<script>
export default {
  name: 'BackToTop',
  //定义一些父组件的配置项
  props: {
    transitionName: {
      type: String,
      default: 'fade'
    },
    customStyle: {  //按钮样式
      type: Object
    },
    visibilityHeight: { // 纵向滑动多远距离出现滚动条
      type: Number
    },
    backPosition: { // 返回顶部时，滚动到哪里（距离顶部的距离）
      type: Number,
      default: 0
    }
  },
  data() {
    return {
     //默认按钮不出现
      visible: false,
     //定义定时器
      interval: null
    }
  },
  //监听页面滚动
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  //销毁定时器
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if(this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight
    },
    //点击回到顶部
    backToTop() {
      let distanceY = window.pageYOffset
      let i = 0
      this.interval = setInterval(() => {
        let next = Math.floor(this.easeInOutQuad(10 * i, distanceY, -distanceY, 500))
        if(next <= this.backPosition) {
          window.scrollTo(0, this.backPosition)
          clearInterval(this.interval)
        } else{
          window.scrollTo(0, next)
        }
        i++
      }, 17)
    },
    /*
      缓动公式（Tween算法）
       t: 动画已经执行的时间（实际上时执行多少次/帧数）
       b: 起始位置
       c: 终止位置
       d: 从起始位置到终止位置的经过时间（实际上时执行多少次/帧数）
      http://www.cnblogs.com/mrsunny/archive/2011/06/21/2086080.html
    */
    easeInOutQuad(t, b, c, d) {
      // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
      if ((t /= d / 2) < 1) { 
        return c / 2 * t * t + b
      } else {
        // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
        return -c / 2 * (--t * (t - 2) - 1) + b
      }
    }
  }
}
</script>
 
<style  scoped>
.page-component-up{
  top: 300; 
  bottom:0; 
  width: 200px;
  height: 300px;
  position: fixed;
  cursor: pointer;
  text-align: center;
  transition: .3s;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
  z-index: 99;
}
  .page-component-up i{
    color: #409eff;
    display: block;
    line-height: inherit;
    text-align: center;
    font-size: 18px;
}
</style>