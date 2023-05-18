<template>
  <div class="userFat">
    <p class="userTitle">黄土高原地震滑坡与强震动记录数据库用户手册</p>
    <div class="bigtitle">1、登录模块</div>
     <div class="userContent">系统开启后首先进入登录界面，在该界面通过输入用户名、密码和验证码进行登录。如图1-1所示</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/1-0.png">
      </div>
      <div class="userimgName">图1-1 登录页面</div>
      </div>
    <div class="bigtitle">2、地震滑坡模块</div>
    <div class="smalltitle">2.1、全局预览页面</div>
    <div class="userContent">登录完成后将进入地震滑坡主页面，该模块功能主要包括三维地图上的数据加载、地图裁剪与导出、搜索定位、三维场景观看、距离量算、滑坡可视化展示框、滑坡信息弹窗、地图操作工具等。如图2-1所示</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-1.png">
      </div>

      <div class="userimgName">图2-1 滑坡全局预览首页</div>
    </div>
    <div class="smalltitle">2.2、三维地图中的数据加载</div>
    <div class="userContent">在页面下栏，有地理信息、地震信息、河流水系、高程数据四个小模块，每个模块中有不同的数据可以通过勾选的方式加载到地图上，比如加载地质图和高程信息。如图所示</div>
     <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-2-1.png">
      </div>
      <div class="userimgName">图2-2-1 地质图加载</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-2-2.png">
      </div>
      <div class="userimgName">图2-2-2 高程信息加载</div>
    </div>
        <div class="smalltitle">2.3、具体地震的功能演示</div>
    <div class="userContent">点击左侧菜单栏中的具体地区，将进入某地震的滑坡页面，功能同全局页面相同，下面是具体功能的演示操作。如图所示</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-3.png">
      </div>
      <div class="userimgName">图2-3 以通渭为例，滑坡页面展示</div>
    </div>
    <div class="smalltitle">2.3.1、地图裁剪</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-3-1.png">
      </div>
      <div class="userimgName">图2-3-1 大范围的地图裁剪功能</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-3-2.png">
      </div>
      <div class="userimgName">图2-3-2 导出的滑坡信息表</div>
    </div>
      <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-3-3.png">
      </div>
      <div class="userimgName">图2-3-3 精确范围的地图裁剪功能</div>
    </div>
    <div class="smalltitle">2.4、滑坡搜索定位</div>
    <div class="userContent">通过在搜索框输入滑坡名称，地图将自动定位到搜索的滑坡。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-4.png">
      </div>
      <div class="userimgName">图2-4 滑坡搜素定位</div>
    </div>
    <div class="smalltitle">2.5、三维地图旋转</div>
    <div class="userContent">鼠标右键拖动地图可实现三维立体画面</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-5.png">
      </div>
      <div class="userimgName">图2-5 三维旋转下的滑坡</div>
    </div>
    <div class="smalltitle">2.6、距离量算</div>
    <div class="userContent">通过点击量算按钮之后，确定起点（左键在一个地方点击一次）和终点（左键在另一个地方点击一次）后，将量算出两点之间的距离。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-6.png">
      </div>
      <div class="userimgName">图2-6 两点之间的距离量算</div>
    </div>
    <div class="smalltitle">2.7.1、震中信息弹窗</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-7-1-1.png">
      </div>
      <div class="userimgName">图2-7-1-1 震中信息按钮</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-7-1-2.png">
      </div>
      <div class="userimgName">图2-7-1-2 查看震中信息</div>
    </div>
    <div class="smalltitle">2.7.2、滑坡信息弹窗</div>
    <div class="userContent">通过点击地图上的黑色或橙色图标（其中橙色代表有图片，黑色代表无图片）来查看滑坡信息</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-7-2-1.png">
      </div>
      <div class="userimgName">图2-7-2-1 点击滑坡按钮</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-7-2-2.png">
      </div>
      <div class="userimgName">图2-7-2-2 查看滑坡信息</div>
      
    </div>
     <div class="smalltitle">2.8、可视化展示框</div>
        <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/2-8.png">
      </div>
      <div class="userimgName">图2-8 滑坡可视化框</div>
      
    </div>
  <div class="bigtitle">3、强震记录模块</div>
    <div class="userContent">点击左侧菜单栏中的强震记录，将进入地震信息页面。其中包括可视化框中有地震信息和图表统计，地震信息查询，时间轴动态播放，地震信息弹窗，台站信息弹窗和强震记录波形图等，如图所示。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/3-1.png">
      </div>
      <div class="userimgName">图3-1 强震记录页面总览</div>
    </div>
    <div class="smalltitle">3.1.1、地震信息可视化框</div>
    <div class="userContent">黄土高原2001-2018年间的地震信息以可视化框的形式展示图表信息和地震信息，如图所示。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/3-1-1.png">
      </div>
      <div class="userimgName">图3-1-1 地震信息可视化框展示</div>
    </div>
     <div class="smalltitle">3.1.2、动态时间轴</div>
    <div class="userContent">该页面点进来地震信息默认汇总状态，可看到全部地震，点击时间轴的开始按钮，地震信息将按照年份进行动态轮播，点击汇总即可加载全部。如图所示。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/3-1-2.png">
      </div>
      <div class="userimgName">图3-1-2 地震信息轮播展示</div>
    </div>
    <div class="smalltitle">3.1.3、地震信息搜索</div>
    <div class="userContent">同滑坡搜索一致，通过输入信息，进行搜索并定位。如图所示。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/3-1-3.png">
      </div>
      <div class="userimgName">图3-1-3 地震信息搜索定位</div>
    </div>
    <div class="smalltitle">3.1.4、地震信息弹窗展示</div>
    <div class="userContent">通过点击地图上的红色按钮（不同大小代表不同震级范围），来查看地震信息。如图所示。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/3-1-4.png">
      </div>
      <div class="userimgName">图3-1-4 地震信息弹窗</div>
    </div>
    <div class="smalltitle">3.1.5、台站信息展示</div>
    <div class="userContent">如果地震有台站检测，则点击地震按钮之后，台站按钮会自动加载出来，点击台站按钮(蓝色三角)，即可查看台站信息</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/3-1-5.png">
      </div>
      <div class="userimgName">图3.1.5 台站信息弹窗</div>
    </div>
     <div class="smalltitle">3.2、强震记录图展示</div>
    <div class="userContent">在台站弹窗内部，强震记录信息以波形图的形式展示出来，可以放大查看。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/3-1-6.png">
      </div>
      <div class="userimgName">图3.2.1 强震记录波形图</div>
    </div>
     <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/3-1-7.png">
      </div>
      <div class="userimgName">图3.2.2 放大的强震记录波形图</div>
    </div>
 <div class="bigtitle">4、数据管理模块</div>
    <div class="userContent">通过点击左侧菜单栏的数据管理中的具体子目录（滑坡数据，强震记录表，降水量数据），即可进入相应的数据管理页面</div>
   
    <div class="smalltitle">4.1、滑坡数据管理</div>
    <div class="userContent">滑坡部分除了所有的滑坡信息展示，功能操作包括搜索，上传，导出，排序，编辑，删除等</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-1-1.png">
      </div>
      <div class="userimgName">图4-1-1、搜索功能</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-1-2.png">
      </div>
      <div class="userimgName">图4-1-2、上传功能</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-1-3.png">
      </div>
      <div class="userimgName">图4-1-3、导出功能</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-1-4.png">
      </div>
      <div class="userimgName">图4-1-4、导出的xls文件</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-1-5.png">
      </div>
      <div class="userimgName">图4-1-5、排序功能</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-1-6.png">
      </div>
      <div class="userimgName">图4-1-6、编辑与删除功能</div>
    </div>
    <div class="smalltitle">4.2、强震记录数据管理</div>
    <div class="userContent">该部分除了对地震数据的表格展示。还有新增地震、搜索、编辑和删除信息的功能。操作同滑坡一致</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-2.png">
      </div>
      <div class="userimgName">图4-2、强震信息展示</div>
    </div>
    <div class="smalltitle">4.3、降水量数据管理</div>
    <div class="userContent">该部分是对降水量数据的表格展示，增删改查功能同滑坡数据表一致。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-3.png">
      </div>
      <div class="userimgName">图4-3、降水量管理</div>
    </div>
      <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-3-1.png">
      </div>
      <div class="userimgName">图4-3-1、搜索降雨量数据</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/4-3-2.png">
      </div>
      <div class="userimgName">图4-3-2、降雨量数据波形图</div>
    </div>
<div class="bigtitle">5、数据统计模块</div>
    <div class="userContent">数据统计以echarts图表的形式，对滑坡数据和地震数据进行了处理与展示。包括地震滑坡统计图，震级与台站记录表，地震震级频度M-t图，地震频度N-t图。可以对图表进行放大。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/5-1.png">
      </div>
      <div class="userimgName">图5-1、数据统计图表展示</div>
    </div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/5-2.png">
      </div>
      <div class="userimgName">图5-2、图表放大</div>
    </div>
<div class="bigtitle">6、图片管理模块</div>
    <div class="userContent">点击菜单栏的图片管理，即可进入该界面。该部分是对现场拍摄的滑坡图片进行管理，可以进行查看、新增和删除。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/6-1.png">
      </div>
      <div class="userimgName">图6-1、图片管理页面</div>
    </div>
    <div class="userContent">点击具体地区之后，可以看到图片被分为有图片和无图片的文件夹。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/6-2.png">
      </div>
      <div class="userimgName">图6-2、图片分类</div>
    </div>
    <div class="userContent">点击具体滑坡之后，可以查看图片，并对其进行新增和删除操作。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/6-3.png">
      </div>
      <div class="userimgName">图6-3、图片操作</div>
    </div>
<div class="bigtitle">7、用户模块</div>
    <div class="userContent">点击菜单栏的用户管理，即可进入该界面。该部分是对用户信息进行管理，可以进行修改密码和删除操作。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/7-1.png">
      </div>
      <div class="userimgName">图7-1、用户管理页面</div>
    </div>
     <div class="userContent">点击菜单栏的用户手册，即可进入该界面。该部分是系统使用说明。</div>
    <div class="userBox">
      <div class="imgsize">
        <img src="@/assets/userImg/7-2.png">
      </div>
      <div class="userimgName">图7-2、用户手册页面</div>
    </div>
  </div>

  <backtoTopVue
      transitionName="fade"
      :customStyle="myBackToTopStyle"
      :visibilityHeight="300"
      :backPosition="0"
    ></backtoTopVue>

</template>

<script>
import backtoTopVue from "./visualization/backtoTop.vue";
export default {
  methods: {
    offset() {
      window.scrollBy(100, 100);
      alert("pageYOffset:" + window.pageYOffset);
    },
  },

  data() {
    return {
      // 引入的回到顶部的组件样式
      myBackToTopStyle: {
        right: "6.25rem",
        bottom: "9.375rem",
        width: "3.125rem",
        height: "3.125rem",
        "border-radius": "50%",
        "line-height": "2.5rem",
        background: "rgb(1 11 20)",
        "font-size": "1.25rem",
        color: "#fff",
      },
    };
  },
  components: {
    backtoTopVue,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 1vw;
   overflow-x: hidden;
}

 .userFat {
  width: 88.5417rem;
  height: 55.5rem;
  overflow-x: hidden;

}
.userBox {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
}
.userTitle {
  margin-top: 1.25rem;
  font-size: 2.1875rem;
  text-align: center;
  font-weight: bold;
}
.bigtitle {
  margin-left: 1.25rem;
  font-size: 1.5625rem;
  font-weight: bold;
}
.smalltitle {
  margin-top: 1.25rem;
  margin-left: 2.5rem;
  font-size: 1.25rem;
  font-weight: bold;
}
.userContent {
  margin-top: 1.25rem;
  margin-left: 2.5rem;
  font-size: 1.25rem;
}
.imgsize {

  margin-top: 1.25rem;
  /* height: 37.5rem; */
}
.userimgName {
  font-size: 1.25rem;
  font-weight: bold;
}
img{
  width: 57.2917rem;
  height: 31.25rem;
}
</style>
