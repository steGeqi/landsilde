<template>
    <div class="layout">
        <el-container :style="{ minHeight: '100vh', backGround: '#515a6e' }">
            <el-aside id="asideID" class="el-aside">
                <el-menu
                    :default-openeds="openeds"
                    class="el-menu-vertical-demo"
                    background-color="#515a6e"
                    text-color="#fff"
                    router
                >
                    <el-sub-menu index="2">
                        <template #title>
                            <Position style="width: 1.207813rem; height: 1.207813rem; margin-right: .216667rem"/>
                            <span class="menutxt">黄土地震滑坡</span>
                        </template>
                        <el-menu-item index="cthd?-1" id="-1">
                            <el-icon><Compass /></el-icon>
                            <span>系统主页面</span>
                        </el-menu-item>
                        <el-menu-item index="cthd?5" id="0">
                            <el-icon><Compass /></el-icon>
                            <span>洪洞地震(1303)</span>
                        </el-menu-item>
                        <el-menu-item index="cthd?3" id="1">
                            <el-icon><Compass /></el-icon>
                            <span>华县地震(1556)</span>
                        </el-menu-item>
                        <el-menu-item index="cthd?0" id="2">
                            <el-icon><Compass /></el-icon>
                            <span class="menutxt">天水南地震(1654)</span>
                        </el-menu-item>
                        <el-menu-item index="cthd?6" id="3">
                            <el-icon><Compass /></el-icon>
                            <span>临汾地震(1695)</span>
                        </el-menu-item>
                        <el-menu-item index="cthd?1" id="4">
                            <el-icon><Compass /></el-icon>
                            <span class="menutxt">通渭地震(1718)</span>
                        </el-menu-item>
                        <el-menu-item index="cthd?2" id="5">
                            <el-icon><Compass /></el-icon>
                            <span>海原地震(1920)</span>
                        </el-menu-item>
                        <el-menu-item index="cthd?4" id="6">
                            <el-icon><Compass /></el-icon>
                            <span>古浪地震(1927)</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="cthd?7" id="7">
                        <el-icon><List /></el-icon>
                        <span>强震动记录</span>
                    </el-menu-item>
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon><Edit /></el-icon>
                            <span>数据管理</span>
                        </template>
                        <el-menu-item index="/webHome/datamanage"
                            ><el-icon><Edit /></el-icon>滑坡数据</el-menu-item
                        >
                        <el-menu-item index="/webHome/hismanage"
                            ><el-icon><Edit /></el-icon>强震动记录表</el-menu-item>
                        <el-menu-item index="/webHome/Precipitation"
                            ><el-icon><Edit /></el-icon>降水量数据</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="/webHome/statistics">
                        <el-icon><trend-charts /></el-icon>
                        <span>数据统计</span>
                    </el-menu-item>
                    <el-menu-item index="/webHome/imgmanage">
                        <el-icon><Camera /></el-icon>
                        <span>图片管理</span>
                    </el-menu-item>
                    <el-menu-item index="/webHome/usermanage">
                        <el-icon><Avatar /></el-icon>
                        <span>用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/webHome/userBook">
                        <el-icon><document-copy /></el-icon>
                        <span>用户手册</span>
                    </el-menu-item>
                  <el-menu-item index="/"  >
                    <el-icon><HomeFilled /></el-icon>
                    <span @click="logout">退出系统</span>
                  </el-menu-item>
                </el-menu>
                <span class="CollapseIcon">
                    <el-icon><Fold /></el-icon>
                </span>
            </el-aside>
            <el-main>
                <router-view id="mainNode"></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import {
    Position,
    Compass,
    List,
    Edit,
    Camera,
    Avatar,
    Fold,
    TrendCharts,
    DocumentCopy,
    HomeFilled
} from '@element-plus/icons-vue'
import {removeToken} from "../utils/auth";
export default {
  data() {
    return {
      openeds: ["1", "2"],
      isCollapsed: false,
      iconClass: "el-icon-s-fold",

    };
  },
  mounted: function () {
    let aside = document.getElementById("asideID");
    let asideID = document.getElementById("asideID");
    let CollapseIcon = document.getElementsByClassName("CollapseIcon")[0];
    let mainNode = document.getElementById("mainNode");
    aside.style.cssText = "width:11.4583rem;transition:width 0.5s;";
    CollapseIcon.onclick = (e) => {
      if (!this.isCollapsed) {
        //折叠
        aside.style.width = "3.3854rem";
        CollapseIcon.style.width = "3.3854rem";
        this.iconClass = "el-icon-s-unfold";
        // mainNode.requestFullscreen();
      } else {
        aside.style.width = "11.4583rem";
        CollapseIcon.style.width = "11.4583rem";
        this.iconClass = "el-icon-s-fold";
      }
      this.isCollapsed = !this.isCollapsed;
    };
    asideID.onclick = (e) => {
      for (let i = 0; i < 3; i++) {
        if (e.path[i].id) {
          let num = parseInt(e.path[i].id);
          if (num || num == 0) {
            console.log(num);
            // eventBus.$emit("SwitchEarthquakes",1)
            this.setSwitchEarthquakes(num);
            this.sethuapoDot([])
            console.log();
          } else {
            console.log(e.path[i].id);
          }
          break;

                }
            }
        }
    },
    methods: {
        ...mapMutations(['setSwitchEarthquakes','sethuapoDot']),
      logout(){
        removeToken()
        window.localStorage.clear()
      }
    },
    components: {
        Position,
        Compass,
        List,
        Edit,
        Camera,
        Avatar,
        Fold,
        TrendCharts,
        DocumentCopy,
        HomeFilled
    },
}
</script>
<style>
/* *{

} */
.menutxt {
  font-size: .9375rem;
}
html{
 overflow: hidden;
  font-size: 1vw;
}

.el-menu {

    --el-menu-item-height: 2.9167rem !important;

    border-right: solid 0rem !important

}

.el-aside{
  overflow-x: hidden !important;
  --el-aside-width: 18.5938rem !important;
  width: 15.4583rem;
  transition: width 0.5s ease 0s;
}
.el-main {
    padding: 0;
}
.el-menu-item,
.el-sub-menu__title {
  font-size: .9375rem !important;
}
.layout .el-aside {
  background: #515a6e;
  width: 11.458333rem;
}
.el-menu {
    border-right: none;
}
#mainNode {
    height: 100vh;
    position: relative;
}
.CollapseIcon {
  display: inline-block;
  color: #fff;
  width: 11.458333rem;
  font-size: .9375rem;
  text-align: center;
  position: absolute;
  transition: width 0.5s;
  bottom: .846354rem;
  color: #909399;
}
/*去掉route-link下划线*/
.router-link-active {
    text-decoration: none;
}
.el-sub-menu .el-menu-item {
    height: 2.3rem !important;

}
.el-sub-menu .el-icon {
    vertical-align: middle;
    margin-right: .2604rem;
    width: 1.25rem;
    text-align: center;
    font-size: .9375rem;
}
</style>
