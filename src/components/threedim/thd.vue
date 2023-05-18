<template>
  <div>
    <div
      id="example-m"
      class="content-container"
    >
      <div class="systemtitle">
        <img
          class="titleimg"
          src="@/assets/enviricon.png"
        />
        <div class="titletxt">黄土高原地震滑坡与强震动记录数据库</div>
        <div class="w-Ther">
          <div class="weather">
            <div class="first">
              <span class="area">{{ weather.area }}地区</span>
              <span class="temp">{{ weather.temp }}</span>
            </div>
            <div class="second">
              <span class="rain">{{ weather.type }}</span>
              <span class="wind">{{ weather.wind }}</span>
            </div>
          </div>
          <div class="w-img">
            <img
              :src="weatherIcon"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>

      <div
        class="thd-map"
        id="changeMap"
      >
        <mapComponent
          :id="mapId"
          ref="thdmap"
        > </mapComponent>
        <div class="map-header"></div>
      </div>

      <div class="flexsible">
        <flexComponent
          :id="flexcard"
          ref="flexbox"
        ></flexComponent>
      </div>

      <div class="flexsibleChart">
        <flexCharts
          :id="flexcharts"
          ref="chartsbox"
        ></flexCharts>
      </div>

      <div
        class="years"
        v-show="SwitchEarthquakes == 7"
      >
        <el-button
          class="totalbtn"
          @click="allHis"
          type="info"
        >汇总</el-button>
        <ul id="yearsChiren">
          <li
            v-for="(year, index) in dateArr"
            :key="index"
          >
            <div @click="chooseHis(index)">
              <span :class="'circle ' + index"></span><span style="color: rgb(255 255 255); font-weight: bold">{{
                year
              }}</span>
            </div>

            <p
              class="line"
              v-if="index != dateArr.length - 1"
            >|</p>
          </li>
        </ul>
        <el-button
          type="info"
          v-if="open"
          @click="openHandle"
        >暂停</el-button>
        <el-button
          class="totalbtn"
          type="info"
          v-else
          @click="openHandle"
        >开始</el-button>
      </div>

      <div class="map-footer">
        <ul class="leg">
          <li
            v-for="(layers, name) in layersSettings"
            :key="name"
          >
            {{ layers.name }}
            <img
              src="@/assets/imgicon/展开菜单@hdpi.png"
              alt=""
            />
            <ul
              class="sub-menu"
              :style="layers.name === '地震信息' ? { width: '10.579427rem' } : {}"
            >
              <li
                v-for="layer in layers.items"
                :key="layer.id"
              >
                <img
                  :src="layer.icon"
                  alt=""
                />
                {{ layer.name }}

                <div class="check">
                  <input
                    type="checkbox"
                    :checked="layer.checked"
                    :id="layer.id"
                    @click="showMarker(layer.id, layer)"
                  />
                  <div class="inner-check">
                    <!-- <i class="el-icon-check"></i> -->
                    <el-icon>
                      <check />
                    </el-icon>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <div
          class="measure"
          v-if="myMeasure.isMeasure"
        >
          <p>
            <span class="start">起点:</span>{{ myMeasure.startArr }}
            <span class="dis">实际距离:</span>{{ myMeasure.dis }}
          </p>
          <p><span class="end">终点:</span>{{ myMeasure.endArr }}</p>
        </div>
        <div class="tool">
          <span class="scale">{{ resolution ? "分辨率:" + resolution + "米" : "" }}
          </span>
          <img
            @click="complete_"
            src="@/assets/imgicon/return_icon.png"
            srcset=""
            title="全局预览"
          />
          <img
            @click="rotateTool"
            src="@/assets/imgicon/refresh.png"
            srcset=""
            title="地图旋转"
          />
          <img
            @click="GetRouteDistancePlus('measure')"
            src="@/assets/imgicon/Measure.png"
            srcset=""
            title="量算"
          />
          <img
            @click="big"
            src="@/assets/imgicon/放大.png"
            alt=""
            srcset=""
            title="放大地图"
          />
          <img
            @click="small"
            src="@/assets/imgicon/缩小.png"
            alt=""
            srcset=""
            title="缩小地图"
          />
          <img
            @click="fullscreen"
            src="@/assets/imgicon/全屏.png"
            alt=""
            srcset=""
            title="全屏"
          />
        </div>
      </div>
    </div>
    <div class="tools">
      <div>
        <div
          v-if="landslide_hisearth"
          class="group"
        >
          <el-button-group>
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="输入滑坡名称"
              @select="handleSelect"
              clearable
            >
              <template #append>
                <el-button
                  size="small"
                  :icon="Search"
                  @click="landslide_get"
                ></el-button>
              </template>
            </el-autocomplete>
          </el-button-group>
        </div>
        <div
          v-if="!landslide_hisearth"
          class="group"
        >
          <el-button-group>
            <el-autocomplete
              v-model="his_state"
              :fetch-suggestions="his_querySearchAsync"
              placeholder="输入强震记录名称"
              @select="his_handleSelect"
              clearable
            >
              <template #append>
                <el-button
                  size="small"
                  :icon="Search"
                  @click="landslide_get"
                ></el-button>
              </template>
            </el-autocomplete>
          </el-button-group>
        </div>
        <div class="group">
          <el-button-group>
            <el-button
              :icon="Search"
              @click="landslide_find"
            >滑坡查询</el-button>
            <el-button
              :icon="Search"
              @click="his_earth_find"
            >强震记录查询</el-button>
          </el-button-group>
        </div>
      </div>
    </div>

    <div
      id="tools1234"
      class="tools"
      style="top: 21.02rem;border-radius: 0 0 0.3125rem 0.3125rem"
    ></div>
    <div
      class="tools"
      style="top: 10.45rem;border-radius: 0.3125rem 0.3125rem 0 0;visibility:hidden;height: 10.6rem;"
    >
      <div class="Select">
        <div class="Select_top">
          <span
            Selected="0"
            :style="selectComponents.Selected == 0? 'color:#409eff' : '' "
          >圆形｜</span>&nbsp;
          <span
            Selected="-1"
            :style="selectComponents.Selected == -1? 'color:#409eff' : '' "
          >矩形</span>&nbsp;
          <span
            Selected="1"
            :style="selectComponents.Selected == 1? 'color:#409eff' : '' "
          >｜多边形</span>
        </div>
        <div class="Select_content">
          <div
            class="Select_content_input"
            v-if="selectComponents.Selected > 0"
          >
            <div
              style="text-align: center;margin-top:0.45rem"
              class="textarea"
            >
              <el-input
                v-model="selectComponents.lonlat1.lon"
                :autosize="{ minRows: 4, maxRows: 4 }"
                resize="none"
                type="textarea"
                placeholder="请输入 经度,纬度; 类型的坐标数据例如105,37;110,37;110,32;105,32;"
              >
              </el-input>
            </div>
          </div>
          <div
            class="Select_content_input"
            v-else-if="selectComponents.Selected < 0"
          >
            <div style="text-align: center;">
              <span style="position: relative;bottom:0.55rem;">
                左上角：
              </span>
              <table style=" display: inline-block;">
                <tbody>
                  <tr class="trWidth">
                    <td>
                      <el-input
                        size="mini"
                        placeholder="经度"
                        suffix-icon="el-icon-date"
                        v-model="selectComponents.lonlat1.lon"
                        style="width:4.5rem"
                      >
                      </el-input>
                    </td>
                    <td>
                      <el-input
                        size="mini"
                        placeholder="纬度"
                        suffix-icon="el-icon-date"
                        v-model="selectComponents.lonlat1.lat"
                        style="width:4.5rem"
                      >
                      </el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="text-align: center;margin-top:1rem">
              <span style="position: relative;bottom:0.55rem;">
                右下角：
              </span>
              <table style=" display: inline-block;">
                <tbody>
                  <tr class="trWidth">
                    <td>
                      <el-input
                        size="mini"
                        placeholder="经度"
                        suffix-icon="el-icon-date"
                        v-model="selectComponents.lonlat2.lon"
                        style="width:4.5rem"
                      >
                      </el-input>
                    </td>
                    <td>
                      <el-input
                        size="mini"
                        placeholder="纬度"
                        suffix-icon="el-icon-date"
                        v-model="selectComponents.lonlat2.lat"
                        style="width:4.5rem"
                      >
                      </el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="Select_content_input"
            v-else
          >
            <div style="text-align: center;">
              <span style="position: relative;bottom:0.55rem;">
                经度：
              </span>
              <table style=" display: inline-block;">
                <tbody>
                  <tr>
                    <td>
                      <el-input
                        size="mini"
                        placeholder="十进制经度"
                        suffix-icon="el-icon-date"
                        v-model="selectComponents.lonlat1.lon"
                        style="width:9.2rem"
                      >
                      </el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="text-align: center;">
              <span style="position: relative;bottom:0.55rem;">
                纬度：
              </span>
              <table style=" display: inline-block;">
                <tbody>
                  <tr>
                    <td>
                      <el-input
                        size="mini"
                        placeholder="十进制纬度"
                        suffix-icon="el-icon-date"
                        v-model="selectComponents.lonlat1.lat"
                        style="width:9.2rem"
                      >
                      </el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="text-align: center;">
              <span style="position: relative;bottom:0.55rem;">
                半径：
              </span>
              <table style=" display: inline-block;">
                <tbody>
                  <tr style="width:50%">
                    <td>
                      <el-input
                        size="mini"
                        placeholder="单位：km"
                        suffix-icon="el-icon-date"
                        v-model="selectComponents.lonlat2.lon"
                        style="width:9.2rem"
                      >
                      </el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="group" style="margin-top:0.2rem;padding-left:25%;position: absolute;bottom:0"> -->
      <div style="margin: 0.2rem 0.46354rem 0.46354rem;padding-left: 2.5%;position: absolute;bottom: -0.2rem;">
        <el-button-group>
          <el-button
            type="primary"
            @click="select_huapo"
          >确定</el-button>
          <el-button
            type="info"
            @click="Hide_sketchLayer"
          >重置</el-button>
        </el-button-group>
      </div>
    </div>
    <div
      style="border: .104167rem solid #fff;border-radius: .520833rem;height: 2.604167rem;"
      class="tools1"
    >
      <div class="huapoNumStyle">
        <span style="color: aqua;">所选滑坡数:</span>&nbsp;{{ SketchDot.length }}
      </div>
      <div
        class="huapoNumStyle1"
        style="position: relative; left: 3.625rem;"
      >
        保存
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="台站信息"
      width="35%"
      @open="dialogopen"
      @close="setStatus"
    >
      <el-main
        v-loading="pictLoading"
        element-loading-background="rgba(54,58,80, 0.99)"
        element-loading-text="数据正在加载中"
      >
        <div style="width:100%;height:400px; overflow: scroll">
          <table
            border="1"
            style="width: 100%;font-size: 25px;text-align: center"
          >
            <tr>
              <td><span>台站名称</span></td>
              <td>
                <span>{{ dialogState.stationName}}</span>
              </td>
            </tr>
            <tr>
              <td><span>台站代码</span></td>
              <td>
                <span>{{ dialogState.stationCode}}</span>
              </td>
            </tr>
            <tr>
              <td><span>台站经度(°)</span></td>
              <td>
                <span>{{ dialogState.stationLongitude}}</span>
              </td>
            </tr>
            <tr>
              <td><span>台站纬度(°)</span></td>
              <td>
                <span>{{ dialogState.stationLatitude}}</span>
              </td>
            </tr>
            <tr>
              <td><span>场地条件</span></td>
              <td>
                <span>{{ dialogState.addressCondition}}</span>
              </td>
            </tr>
            <tr>
              <td><span>记录器型号</span></td>
              <td>
                <span>{{ dialogState.recordModel}}</span>
              </td>
            </tr>
            <tr>
              <td><span>测点位置</span></td>
              <td>
                <span>{{ dialogState.measurePoint}}</span>
              </td>
            </tr>
          </table>
          <div
            class="chartbox"
            id="myChart"
          >
            <div
              class="chartbox"
              id="myChart1"
            ></div>
            <div
                class="chartbox"
                id="myChart3"
            ></div>
            <div
              class="chartbox"
              id="myChart2"
            ></div>
          </div>
        </div>
      </el-main>
      <el-dialog
        v-model="innerVisible"
        fullscreen="true"
        title="地震波形图"
        append-to-body
      >
        <el-main
          v-loading="pictLoading_1"
          element-loading-background="rgba(54,58,80.99)"
          element-loading-text="数据正在加载中"
        >
          <div
            id="myChart12"
            style="height:320px;width: 100%;background-color: white"
          ></div>
          <div
              id="myChart32"
              style="height: 320px;width: 100%;background-color: white"
          ></div>
          <div
            id="myChart22"
            style=" height:320px;width: 100%;background-color: white"
          ></div>
        </el-main>
      </el-dialog>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="setStatus"
          >关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>
<script>
import { Search } from "@element-plus/icons-vue";
import mapComponent from "@/components/pubcomponent/map.vue";
import flexComponent from "@/components/pubcomponent/flexBox.vue";
import flexCharts from "@/components/pubcomponent/chartsBox.vue";
import { reverseGeocoding, drivingLine } from "@/api/bmap";
// import dayjs from "dayjs";
import store from "@/store";
// 可折叠的盒子组件
// import FlexCard from '@/components/package/FlexCard.vue'
import { baseFun } from "@/api/request";
import {
  setHistoryMarker,
  setHistoryAllMarker,
} from "@/assets/api/arcmap/marker";
import { mapMutations, mapState } from "vuex";
import { defineComponent, ref } from "vue";
import useArcmap from "@/assets/api/arcmap/index";
import Point from "@arcgis/core/geometry/Point";
import { getWeather } from "@/api/weather";
import { getHistoryEq, getStationEq } from "@/api/history.js";
import { mapGetters } from "vuex";
import { get_vibration } from "../../api/data";
import {
  addSketch,
  sketchExport,
  addSelectGraph,
} from "@/assets/api/arcmap/Freedrawing";
import FlexCard from "../package/FlexCard.vue";
import {nextTick} from "@arcgis/core/core/nextTick";
var Sketch = null; //必须要定义在这里，不然会报错
var view = {};
export default defineComponent({
  setup() {
    return useArcmap("overviewDiv", "thdmap");
  },
  data() {
    return {
      isFull: false,
      innerVisible: false,
      pictLoading: false,
      pictLoading_1: false,
      vibration_data: {},
      dialogVisible: false,
      Search,
      // screen:0,
      stations: [],
      eqHistory: [],
      restaurants: [],
      his_restaurants: [],
      hisearth_check: [],
      his_earth: [],
      timeout: null,
      huapo_name: [],
      his_name: [],
      huopo_suggest_obj: {
        value: "",
        name: "",
      },
      state: ref(""),
      his_state: ref(""),
      landslide_hisearth: true,
      weatherCenter: {
        longitude: 111.7,
        latitude: 36.33,
      },
      earthData: [],
      dateArr: [],
      // timer: "",
      open: false,
      canshu: 0,
      // eqCenter:{},
      timer: null,
      mapData: {},
      encarcmap: null,
      twoDimMap: null,
      baseMap: null,
      mapId: "thdmap",
      flexcard: "flexbox",
      flexcharts: "chartsbox",
      nearCityInfo: null,
      tagData: null,
      hisSearchInfo: null,
      isLoadLayer: {},
      layers: {},
      index: 31,
      processedHisEqData: [],
      switchFlag: true,
      earthInfo: {
        content: "",
      },
      oldSwitchEarthquakes: 0,
      eventList: [], //存放事件
      rotateFlag: true,
      isRevolve: true, //地图在一开始加载时是否旋转(为了地图转换的初始化)
      // 地图级别
      zoomLevel: 0,
      weather: {
        current: "",
        wind: "",
        temp: "",
        type: "",
        area: "",
      },
      //量算
      myMeasure: {
        isMeasure: false,
        startArr: "",
        endArr: "",
        dis: 0,
      },
      //量算相关//////////////////////////////////////////////////
      planningRoadPath: {
        isShowM: true, //显示或消失
        beginningInfo: "", //起点位置
        terminalInfo: "", //终点位置
        road0Len: "", //路线距离
        road1Len: "", //路线中收费路段的距离
        road1expenses: "", //收费路段收费
        roadText: "",
        dotList: [], //存放点标记
        roadPathList: [], //存放路径的线标记
        routes: [], //如果有备用的路线就放进这个数组里面
      },
      weatherIcon: null,
      resolution: null,
      selectComponents: {
        Selected: 0,
        lonlat1: {
          lon: "",
          lat: "",
        },
        lonlat2: {
          lon: "",
          lat: "",
        },
      },
    };
  },
  computed: {
    ...mapState(["SwitchEarthquakes", "huapoDot", "myTimer", "SketchDot"]),
  },
  beforeCreate() {
    view = this.view3d;

    console.log(view);
  },
  created: async function () {
    for (const mapAndView of [[this.map3d, this.view3d]]) {
      await this.mapInit(mapAndView[0], mapAndView[1]);
    }
    // this.findWeatherInfo(); //这个好像没有什么用就注释掉了
    let GetExcel = document.getElementsByClassName("huapoNumStyle1")[0];
    GetExcel.onclick = () => {
      console.log("导出");
      sketchExport();
    };
  },
  mounted: async function () {
    this.$refs.flexbox.getMsg(view);
    this.restaurants = [];
    await this.initHisData();
    console.log(this.view3d);
    console.log(view);
    const map = document.getElementById(this.mapId);
    map.addEventListener("mousewheel", this.handleScroll); // 监听滚轮滚动事件
    setTimeout(() => {
      this.resolution = parseFloat(this.view3d.resolution).toFixed(2);
    }, 10000);

    // console.log(this.SwitchEarthquakes);

    //加载框选
    Sketch = addSketch(this.view3d, this.map3d);
    setTimeout(() => {
      let ske = document.getElementsByClassName(
        "esri-component esri-sketch esri-widget"
      )[0];
      while (!ske) {
        ske = document.getElementsByClassName(
          "esri-component esri-sketch esri-widget"
        )[0];
      }
      ske.children[0].children[1].onclick = () => {
        this.Hide_sketchLayer();
      };
    }, 2000);
    document.getElementsByClassName("tools")[2].style.visibility = "visible";
    document.getElementsByClassName("Select_top")[0].onclick = (e) => {
      this.selectComponents.Selected = parseInt(
        e.path[0].attributes[0].nodeValue
      );
      this.selectComponents.lonlat1.lon = "";
      this.selectComponents.lonlat2.lon = "";
      this.selectComponents.lonlat1.lat = "";
      this.selectComponents.lonlat2.lat = "";
    };
    if (this.SwitchEarthquakes === 7) {
      this.canshu = 0;
      this.allHis();
      if (Sketch) {
        Sketch.visible = false;
      }
    }
    const mainNode = document.getElementById("mainNode");
  },
  beforeUnmount() {
    console.log("页面销毁=========================");
    Sketch.visible = false;
    if (window.myTimer) {
      clearInterval(window.myTimer);
    }
  },
  methods: {
    ...mapMutations(["setEqCenter"]),
    ...mapGetters(["getmyTimer"]),
    setStatus() {
      this.dialogVisible = false;
      store.commit("setdialog", 0);
    },
    dialogopen() {
      this.pictLoading = true;
      var earthtime = localStorage.getItem("earthtime");
      var station = localStorage.getItem("station_code");
      nextTick(()=>{
        get_vibration(earthtime, station).then((res) => {
          console.log(res);
          this.vibration_data = res.data;
          this.drawEcharts();
        });
      })
    },
    dialogopen_1() {
      nextTick(()=>{
        this.pictLoading_1 = true;
        if (this.vibration_data != null) {
          this.drawEcharts_();
        }
      })
    },
    drawEcharts() {
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      const option_1 = {
        title: {
          text:
            "方向：NS，时长: " +
            this.vibration_data.NS.time_length +
            "s, 峰值: " +
            this.vibration_data.NS.peak_point +
            " gal",
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: this.vibration_data.NS.point_list.map(function (item) {
            return item[0];
          }),
          name: "时间/s",
        },
        yAxis: {
          name: "加速度值/gal",
        },
        toolbox: {
          right: 10,
          feature: {
            saveAsImage: {},
            myFull: {
              show: true,
              title: "全屏查看",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.innerVisible = true;
                this.dialogopen_1();
              },
            },
          },
        },
        dataZoom: [
          {
            startValue: "0",
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          show: false,
          top: 50,
          right: 10,
          pieces: [
            {
              gt: -1000,
              lte: 10000,
              color: "#3434ff",
            },
          ],
        },
        series: {
          name: "NS",
          type: "line",
          stack: "总量",
          symbol: "none",
          data: this.vibration_data.NS.point_list.map(function (item) {
            return item[1];
          }),
        },
      };
      const option_2 = {
        title: {
          text:
            "方向：UD，时长: " +
            this.vibration_data.UD.time_length +
            "s, 峰值: " +
            this.vibration_data.UD.peak_point +
            " gal",
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: this.vibration_data.UD.point_list.map(function (item) {
            return item[0];
          }),
          name: "时间/s",
        },
        yAxis: {
          name: "加速度值/gal",
        },
        toolbox: {
          right: 10,
          feature: {
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "0",
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          show: false,
          top: 50,
          right: 10,
          pieces: [
            {
              gt: -1000,
              lte: 10000,
              color: "#ff52ff",
            },
          ],
        },
        series: {
          name: "UD",
          type: "line",
          stack: "总量",
          symbol: "none",
          data: this.vibration_data.UD.point_list.map(function (item) {
            return item[1];
          }),
        },
      };
      const option_3 = {
        title: {
          text:
            "方向：EW，时长: " +
            this.vibration_data.EW.time_length +
            "s, 峰值: " +
            this.vibration_data.EW.peak_point +
            " gal",
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: this.vibration_data.EW.point_list.map(function (item) {
            return item[0];
          }),
          name: "时间/s",
        },
        yAxis: {
          name: "加速度值/gal",
        },
        toolbox: {
          right: 10,
          feature: {
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "2014-06-01",
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          show: false,
          top: 50,
          right: 10,
          pieces: [
            {
              gt: -1000,
              lte: 10000,
              color: "#FD0100",
            },
          ],
        },
        series: {
          name: "EW",
          type: "line",
          stack: "总量",
          symbol: "none",
          data: this.vibration_data.EW.point_list.map(function (item) {
            return item[1];
          }),
        },
      };
      myChart1.setOption(option_1);
      myChart2.setOption(option_2);
      myChart3.setOption(option_3);
      window.addEventListener("resize", function () {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
      });
      this.pictLoading = false;
    },
    drawEcharts_() {
      let myChart1 = this.$echarts.init(document.getElementById("myChart12"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart22"));
      let myChart3 = this.$echarts.init(document.getElementById("myChart32"));
      const option_1 = {
        title: {
          text:
            "方向：NS，时长: " +
            this.vibration_data.NS.time_length +
            "s, 峰值: " +
            this.vibration_data.NS.peak_point +
            " gal",
          left: "35%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: this.vibration_data.NS.point_list.map(function (item) {
            return item[0];
          }),
          name: "时间/s",
        },
        yAxis: {
          name: "加速度值/gal",
        },
        toolbox: {
          right: 10,
          feature: {
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "0",
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          show: false,
          top: 50,
          right: 10,
          pieces: [
            {
              gt: -1000,
              lte: 10000,
              color: "#3434ff",
            },
          ],
        },
        series: {
          name: "NS",
          type: "line",
          stack: "总量",
          symbol: "none",
          data: this.vibration_data.NS.point_list.map(function (item) {
            return item[1];
          }),
        },
      };
      const option_2 = {
        title: {
          text:
            "方向：UD，时长: " +
            this.vibration_data.UD.time_length +
            "s, 峰值: " +
            this.vibration_data.UD.peak_point +
            " gal",
          left: "35%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: this.vibration_data.UD.point_list.map(function (item) {
            return item[0];
          }),
          name: "时间/s",
        },
        yAxis: {
          name: "加速度值/gal",
        },
        toolbox: {
          right: 10,
          feature: {
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "0",
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          show: false,
          top: 50,
          right: 10,
          pieces: [
            {
              gt: -1000,
              lte: 10000,
              color: "#ff52ff",
            },
          ],
        },
        series: {
          name: "UD",
          type: "line",
          stack: "总量",
          symbol: "none",
          data: this.vibration_data.UD.point_list.map(function (item) {
            return item[1];
          }),
        },
      };
      const option_3 = {
        title: {
          text:
            "方向：EW，时长: " +
            this.vibration_data.EW.time_length +
            "s, 峰值: " +
            this.vibration_data.EW.peak_point +
            " gal",
          left: "35%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: this.vibration_data.EW.point_list.map(function (item) {
            return item[0];
          }),
          name: "时间/s",
        },
        yAxis: {
          name: "加速度值/gal",
        },
        toolbox: {
          right: 10,
          feature: {
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "2014-06-01",
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          show: false,
          top: 50,
          right: 10,
          pieces: [
            {
              gt: -1000,
              lte: 10000,
              color: "#FD0100",
            },
          ],
        },
        series: {
          name: "EW",
          type: "line",
          stack: "总量",
          symbol: "none",
          data: this.vibration_data.EW.point_list.map(function (item) {
            return item[1];
          }),
        },
      };
      myChart1.setOption(option_1);
      myChart2.setOption(option_2);
      myChart3.setOption(option_3);
      this.pictLoading_1 = false;
      window.addEventListener("resize", function () {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
      });
    },

    // //鼠标滚轮事件
    handleScroll() {
      this.resolution = parseFloat(this.view3d.resolution).toFixed(2);
    },
    //点击时间轴跳转历史地震
    chooseHis(index) {
      // console.log(this.timer);
      const circleNow = document.getElementsByClassName(
        `circle ${this.canshu - 1}`
      )[0];
      circleNow.style.backgroundColor = "transparent";
      clearInterval(this.timer);
      const map = this.map3d;
      // map.removeAll();
      this.showOrHideMarker(this.map3d);
      setHistoryMarker(
        this.earthData[index],
        map,
        "historyEarthquake3",
        this.view3d,
        index
      ).then((res) => {
        this.open = false;
        this.canshu = index + 1;
      });
    },
    //加载全部历史地震
    async allHis() {
      this.showOrHideMarker(this.map3d);
      const map = this.map3d;
      let pt = new Point({
        latitude: 37.97,
        longitude: 106.199,
      });
      this.view3d.when(() => {
        this.view3d.goTo({
          target: pt,
          zoom: 6,
        });
      });
      let arr = [
        "historyEarthquakelevel1",
        "historyEarthquakelevel2",
        "historyEarthquakelevel3",
      ];
      this.open = false;
      this.view3d.popup.close();
      clearInterval(window.myTimer);
      let i, j;
      let levels = [[], [], []];
      // let linshiEarth = await getHistoryEq("his_");
      console.log(this.earthData, "-------------------------------------");
      for (const data of this.earthData) {
        for (const eq of data) {
          if (parseFloat(eq[7]) >= 1.0 && parseFloat(eq[7]) < 3.0) {
            levels[0].push(eq);
          } else if (parseFloat(eq[7]) >= 3.0 && parseFloat(eq[7]) < 5.0) {
            levels[1].push(eq);
          } else {
            levels[2].push(eq);
          }
        }
      }
      console.log("===================================================");
      console.log(levels);
      for (i = 0; i < 3; i++) {
        setHistoryAllMarker(levels[i], map, arr[i], this.view3d);
      }
      // for(i = 0;i < this.earthData.length;i ++){
      //   for(j = 0;j < this.earthData[i].length;j ++){
      //     setHistoryMarker(
      //       this.earthData[i][j],
      //       map,
      //       "historyEarthquake3",
      //       this.view3d,
      //       -1
      //     )
      //   }
      // }
    },
    findWeatherInfo(lon, lat) {
      (async () => {
        const { daily } = await getWeather({
          location: `${parseFloat(lon)},${parseFloat(lat)}`,
          key: "e3ab23b28fdc4f14bdb5eb4738d4ad2d",
        });
        this.weather.wind = `${daily[0].windDirDay} ${daily[0].windScaleDay}级`;
        this.weather.temp = `${daily[0].tempMin}℃ - ${daily[0].tempMax}℃`;
        this.weather.type = daily[0].textDay;
        this.weatherIcon = new URL(
          `../../assets/weather/${daily[0].iconDay}.png`,
          import.meta.url
        ).href;
        this.weather.area =
          this.SwitchEarthquakes == -1 ? "北京" : this.eqCenter[1];
      })();
    },
    fullscreen() {
      // if(this.screen === 0){
      const mainNode = document.getElementById("mainNode");
      mainNode.requestFullscreen();
      this.screen = 1;
      // } else {
      //   setTimeout(1000)
      //   const mainNode = document.getElementById("mainNode");
      //   mainNode.exitFullscreen();
      //   this.screen = 0;
      // }
    },
    openHandle() {
      if (this.open) {
        clearInterval(this.timer);
        this.open = false;
      } else {
        this.initHistory();
        this.open = true;
      }
    },

    async mapInit(map, view) {
      //加载部分全选
      for (let i = 0; i < 2; i++) {
        let item = this.layersSettings.geographic.items[i * 2];
        this.showMarker(item.id, item);
      }
      this.showMarker(
        this.layersSettings.earthquake.items[1].id,
        this.layersSettings.earthquake.items[1]
      );

      this.layersSettings.geographic.items[
        this.layersSettings.geographic.items.length - 1
      ].checked = true;
      if (this.SwitchEarthquakes >= 0 && this.SwitchEarthquakes < 7) {
        //如果是一开始没有点击右侧菜单的切换地震
        let eqCenter = await baseFun("get_Epicenter", this.SwitchEarthquakes);
        console.log(eqCenter);
        this.eqCenter = eqCenter.marker;
        this.findWeatherInfo(this.eqCenter[8], this.eqCenter[9]);
        this.epicenter(view, map, eqCenter.marker, 15, 10, false);
      } else if (this.SwitchEarthquakes == -1) {
        this.findWeatherInfo("116", "39");
        for (let i = 0; i < 7; i++) {
          let eqCenter = await baseFun("get_Epicenter", i);
          console.log(eqCenter);
          this.eqCenter = eqCenter.marker;
          this.epicenter(view, map, eqCenter.marker, 15, 7.7, i + 1);
        }
      }
    },
    async showMarker(id, layer) {
      const map = this.map3d;
      const view = this.view3d;
      let idArr = []; //需要处理的id空数组
      let isMultiplication;
      //多个图层 为-1时 x7的↓
      let huapoDotArr = ["huapoDot", "huapoDot2"]; //滑坡点
      let huapoArr = ["huapoArea", "huapoLine"]; //滑坡轮廓
      //单个图层 为-1时 x7的↓
      let eqCenterArr = ["eqCenterLayer"]; //震中位置
      let intensityCircleArr = ["intensityCircle"]; //烈度圈
      let faultZoneArr = ["faultZone"]; //活动断裂
      //多个图层↓
      let AdministrativeZoningIDarr = ["AdministrativeZoning", "provinceDot"]; //行政区划
      let gc2 = ["gansu1_50","gansu2_50"];
      let gc3 = ["gansu2_100","gansu3_100","gansu4_100","gansu5_100"];
      let gc4 = ["qinghai1_100","qinghai2_100","qinghai3_100","qinghai4_100"];
      // let GeologicalMapArr = ["GeologicalMap0", "GeologicalMap1"];
      //单个图层的↓
      let oneArr = [
        "GeologicalMap",
        "underlyingLayer",
        "river_3",
        "river_4",
        "river_5",
        "lake_3",
        "ningxia_50",
        "ningxia_100",
        "shanxi_50",
        "shanxi_100",
        "shaanxi_50"
      ];

      //先判断是不是单个图层不 x7的
      let isOne = false;
      for (let i = 0; i < oneArr.length; i++) {
        if (id == oneArr[i]) {
          isOne = true;
          break;
        }
      }
      if (isOne) {
        //如果是单个图层不 x7的
        idArr.push(id);
        isMultiplication = false;
      } else {
        //如果不是
        isMultiplication = true;
        if (id == "huapoDot") {
          idArr = huapoDotArr;
        } else if (id == "huapo") {
          idArr = huapoArr;
        } else if (id == "eqCenterLayer") {
          idArr = eqCenterArr;
        } else if (id == "intensityCircle") {
          idArr = intensityCircleArr;
        } else if (id == "faultZone") {
          idArr = faultZoneArr;
        } else if (id == "AdministrativeZoning") {
          idArr = AdministrativeZoningIDarr;
          isMultiplication = false;
        } else if(id == "gc2"){
          idArr = gc2
          isMultiplication = false;
        } else if(id == "gc3"){
          idArr = gc3
          isMultiplication = false;
        } else if(id == "gc4"){
          idArr = gc4
          isMultiplication = false;
        }
        if (this.SwitchEarthquakes == -1 && isMultiplication) {
          //乘7的操作
          let newidArr = [];
          for (let id_ of idArr) {
            for (let i = 0; i < 7; i++) {
              newidArr.push(id_ + i);
            }
          }
          idArr = newidArr;
        }
      }

      if (layer.checked) {
        //关闭
        console.log(idArr,"============================================");
        for (let id_ of idArr) {
          let layer_ = map.findLayerById(id_);
          console.log(layer_);
          if (layer_) {
            layer_.visible = false;
          }
        }
      } else {
        //显示
        let i;
        for (i = 0; i < idArr.length; i++) {
          let layer_ = map.findLayerById(idArr[i]);
          if (layer_) {
            layer_.visible = true;
          } else {
            break;
          }
        }
        if (i != idArr.length) {
          if (this.SwitchEarthquakes == -1 && isMultiplication) {
            for (let i = 0; i < 7; i++) {
              await layer.render(map, view, this.eqCenter, i, isMultiplication);
            }
          } else {
            await layer.render(
              map,
              view,
              this.eqCenter,
              this.SwitchEarthquakes,
              false
            );
          }
        }
      }
      // if (layer.checked) {//关闭 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、遍历数组图层显示隐藏
      //     if (map.findLayerById(id)) {
      //       map.findLayerById(id).visible = false;
      //     }
      // } else {//显示
      //   if (map.findLayerById(id)) {
      //     map.findLayerById(id).visible = true;
      //     layer.checked = !layer.checked;
      //     return;
      //   }
      //   await layer.render(map, view, this.eqCenter);
      // }
      layer.checked = !layer.checked;
    },
    cloneObj(obj) {
      var newObj = {};
      if (obj instanceof Array) {
        newObj = [];
      }
      for (var key in obj) {
        var val = obj[key];

        newObj[key] = typeof val === "object" ? this.cloneObj(val) : val;
      }
      return newObj;
    },
    async showOrHideMarker(map) {
      let huapoidS = ["huapoArea", "huapoLine", "huapoDot2"];
      let adminidS = ["AdministrativeZoning", "provinceDot"];
      let gc2 = ["gansu1_50","gansu2_50"];
      let gc3 = ["gansu2_100","gansu3_100","gansu4_100","gansu5_100"];
      let gc4 = ["qinghai1_100","qinghai2_100","qinghai3_100","qinghai4_100"];
      // let GeologicalMapArr = ["GeologicalMap0", "GeologicalMap1"];
      let IDIDArr = [
        "historyEarthquake3",
        "historyEarthquakelevel1",
        "historyEarthquakelevel2",
        "historyEarthquakelevel3",
        "setHistoryBranchMarker1",
        "setHistoryBranchMarker2",
        "setHistoryBranchMarker3",
      ];
      for (const key in this.layersSettings) {
        for (const item of this.layersSettings[key].items) {
          let IDs;
          if (item.id == "huapo") {
            IDs = huapoidS;
          } else if (item.id == "AdministrativeZoning") {
            IDs = adminidS;
          }else if(item.id == "gc2"){
            IDs = gc2
          }else if(item.id == "gc3"){
            IDs = gc3
          }else if(item.id == "gc4"){
            IDs = gc4
          }else {
            IDs = [item.id];
          }
          if (this.oldSwitchEarthquakes == -1) {
            if (
              item.id == "huapoDot" ||
              item.id == "huapo" ||
              item.id == "eqCenterLayer" ||
              item.id == "intensityCircle" ||
              item.id == "faultZone"
            ) {
              let newIDs = [];
              for (let i of IDs) {
                for (let num = 0; num < 7; num++) {
                  newIDs.push(i + num);
                }
              }
              IDs = newIDs;
            }
          }
          for (let id of IDs) {
            console.log(IDs);
            const layer = map.findLayerById(id);
            if (layer) {
              map.remove(layer);
            }
          }
          // const layer = map.findLayerById(item.id);
          // map.remove(layer)
          item.checked = false;
        }
      }
      for (let id of IDIDArr) {
        let layer = map.findLayerById(id);
        if (layer) {
          map.remove(layer);
        }
      }
    },

    big() {
      this.switchFlag ? (this.view3d.zoom += 1) : (this.view2d.zoom += 1);
    },
    small() {
      this.switchFlag ? (this.view3d.zoom -= 1) : (this.view2d.zoom -= 1);
    },
    // 无折叠版全屏函数
    //  fullscreen() {
    //   const layout = document.getElementsByClassName("layout")[0];
    //   layout.requestFullscreen();
    // },
    rotateTool() {
      // console.log(this.view3d.viewpoint.camera.position.latitude)//用这个获取屏幕正中的坐标
      if (this.rotateFlag) {
        let that = this;
        this.rotates(this.view3d, this.rotateFlag).then((timer) => {
          that.timer = timer;
        });
      } else {
        this.rotates(this.view3d, this.rotateFlag);
        clearInterval(this.timer);
      }
      this.rotateFlag = !this.rotateFlag;
    },
    formatDate(date) {
      date =
        date.toString().substr(0, 4) +
        "-" +
        date.toString().substr(4, 2) +
        "-" +
        date.toString().substr(6, 2);
      return date;
    },
    //处理历史地震数据
    async initHisData() {
      this.eqHistory = await getHistoryEq("his_");
      // console.log(eqHistory.marker);
      let earth_date = [];
      this.dateArr = [];
      let i;
      this.eqHistory.marker.forEach((e) => {
        let date = e[3].toString().substr(0, 4);
        earth_date.push(date);
      });

      for (i = 0; i < earth_date.length; i++) {
        //循环遍历当前数组
        //判断当前数组下标为i的元素是否已经保存到临时数组
        //如果已保存，则跳过，否则将此元素保存到临时数组中
        if (this.dateArr.indexOf(earth_date[i]) == -1) {
          this.dateArr.push(earth_date[i]);
        }
      }
      for (i = 0; i < this.dateArr.length; i++) {
        this.earthData[i] = [];
      }
      this.dateArr = this.dateArr.sort();
      console.log("已调用");
      // getStationEq(-1).then((res) => {

      //   });
      // });
      let res = await getStationEq(-1);
      this.stations = res.station;
      console.log(this.stations);
      this.hisearth_check = this.earthData;
      // this.eqHistory.marker.forEach((e) => {
      //   let date = e[3].toString().substr(0, 4);
      //   // e[3] = this.formatDate(e[3]);
      //   // getStationEq(e[0]).then((res) => {
      //   //   e.push(res.station);
      //   //   this.earthData[this.dateArr.indexOf(date)].push(e);
      //   // });
      //   let a = this.getStation(e[0]);
      //   e.push(a);
      //   this.earthData[this.dateArr.indexOf(date)].push(e);
      //   })
      for (let i = 0; i < this.eqHistory.marker.length; i++) {
        let date = this.eqHistory.marker[i][3].toString().substr(0, 4);
        let a = this.getStation(this.eqHistory.marker[i][0]);
        this.eqHistory.marker[i].push(a);
        this.earthData[this.dateArr.indexOf(date)].push(
          this.eqHistory.marker[i]
        );
      }
    },
    getStation(id) {
      let arr = [];
      for (let i = 0; i < this.stations.length; i++) {
        if (this.stations[i][20] == id) {
          arr.push(this.stations[i]);
        }
      }
      // console.log(arr);
      return arr;
    },
    // 加载历史地震图层
    initHistory() {
      const map = this.map3d;
      store.commit("setmyTimer", window.myTimer);
      console.log(this.earthData);
      window.myTimer = this.timer = setInterval(() => {
        // map.removeAll();
        this.showOrHideMarker(this.map3d);
        this.myMeasure.isMeasure = false;
        this.his_restaurants = this.his_loadAll();
        this.hisearth_check = this.earthData;
        if (this.canshu == this.earthData.length) {
          this.canshu = 0;
        }
        setHistoryMarker(
          this.earthData[this.canshu],
          map,
          "historyEarthquake3",
          this.view3d,
          this.canshu
        ).then((res) => {
          let pt = new Point({
            latitude: this.earthData[0][0][4],
            longitude: this.earthData[0][0][5],
          });
          this.view3d.when(() => {
            this.view3d.goTo({
              target: pt,
              zoom: 7.5,
            });
          });
          this.canshu++;
        });
      }, 6000);
    },
    // 滑坡查询
    landslide_find() {
      this.landslide_hisearth = true;
    },
    // 获取建议项
    querySearchAsync(queryString, cb) {
      this.restaurants = this.loadAll();
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return state.value.match(queryString);
      };
    },
    loadAll() {
      var huapo_obj = [];
      for (var i = 0; i < this.huapoDot.length; i++) {
        var item = this.huapoDot[i];
        this.huapo_name.push(item[2]);
        let obj = {
          value: item[2],
          name: i,
        };
        huapo_obj.push(obj);
      }
      return huapo_obj;
    },
    // 滑坡 选择了建议项
    handleSelect(item) {
      //经纬度
      let pt = new Point({
        longitude: parseFloat(this.huapoDot[item.name][3]),
        latitude: parseFloat(this.huapoDot[item.name][4]),
      });
      let that = this;
      this.view3d.when(() => {
        that.view3d.goTo({
          target: pt,
          zoom: 16,
        });
      });
    },
    // 历史地震查询
    his_earth_find() {
      this.initHisData();
      this.landslide_hisearth = false;
      var hisearth_check = this.hisearth_check;
      console.log(hisearth_check);
      this.his_earth.push(hisearth_check[0][0]);
      this.his_name.push(hisearth_check[0][0][3] + hisearth_check[0][0][2]);
      for (var i = 1; i <= hisearth_check.length; i++) {
        var item = hisearth_check[i];
        for (var j = 1; j < item.length; j++) {
          // console.log(item[j])
          if (this.his_name.indexOf(item[j][3] + item[j][2]) > -1) {
            continue;
          } else {
            this.his_earth.push(item[j]);
            this.his_name.push(item[j][3] + item[j][2]);
          }
        }
      }
    },
    // 历史地震选择建议项
    his_handleSelect(item) {
      this.allHis();
      let pt = new Point({
        longitude: parseFloat(this.his_earth[item.name][5]),
        latitude: parseFloat(this.his_earth[item.name][4]),
      });
      let that = this;
      this.view3d.when(() => {
        console.log(pt);
        this.view3d.goTo({
          target: pt,
          zoom: 12,
        });
      });
    },
    // 历史地震 建议项
    his_querySearchAsync(queryString, cb) {
      this.his_restaurants = this.his_loadAll();
      var restaurants = this.his_restaurants;
      var results = queryString
        ? restaurants.filter(this.his_createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    his_createStateFilter(queryString) {
      return (his_state) => {
        return his_state.value.match(queryString);
      };
    },
    his_loadAll() {
      var his_earth = [];
      for (var i = 0; i < this.his_earth.length; i++) {
        var item = this.his_earth[i];
        let obj = {
          value: item[2] + item[3],
          name: i,
        };
        his_earth.push(obj);
      }
      console.log(his_earth);
      return his_earth;
    },
    async GetRouteDistancePlus(id) {
      const view = this.switchFlag ? this.view3d : this.view2d;
      const map = this.switchFlag ? this.map3d : this.map2d;
      if (
        map.findLayerById(id) ||
        map.findLayerById(id + "起点") ||
        map.findLayerById(id + "终点")
      ) {
        this.myMeasure.isMeasure = false;
        map.remove(map.findLayerById(id));
        map.remove(map.findLayerById(id + "起点"));
        map.remove(map.findLayerById(id + "终点"));
        return;
      }
      const start = await this.getdistancePlus(view, map, id, "起点");
      const end = await this.getdistancePlus(view, map, id, "终点");
      let lonAndlat = [
        [parseFloat(start.lon.toFixed(6)), parseFloat(start.lat.toFixed(6))],
        [parseFloat(end.lon.toFixed(6)), parseFloat(end.lat.toFixed(6))],
      ];
      await this.getRoadPath(lonAndlat, map, id);
    },
    async getRoadPath(lonAndlat, map, id) {
      const driving = await drivingLine(
        { lat: lonAndlat[0][0], lon: lonAndlat[0][1] }, //这里的经纬度是反着来的，因为为了使用百度的接口
        { lat: lonAndlat[1][0], lon: lonAndlat[1][1] }
      );
      if (driving.result.total > 0) {
        this.planningRoadPath.routes = driving.result.routes;
        // reverseGeocoding(this.planningRoadPath.routes);
        const end = await reverseGeocoding(
          this.planningRoadPath.routes[0]["destination"]
        );
        const start = await reverseGeocoding(
          this.planningRoadPath.routes[0]["origin"]
        );
        this.myMeasure.startArr = start;
        this.myMeasure.endArr = end;
        this.myMeasure.isMeasure = true;
        this.myMeasure.dis = this.planningRoadPath.routes[0].distance + "米";
        await this.protractPath(this.planningRoadPath.routes[0], id, map);
      }
    },
    complete_() {
      this.showOrHideMarker(this.map3d);
      clearInterval(this.timer);
      store.commit("sethuapoDot", []);
      store.commit("setSwitchEarthquakes", -1);
    },
    select_huapo() {
      if (this.selectComponents.lonlat1.lon) {
        let layer = this.map3d.findLayerById("sketchLayer");
        if (layer) {
          layer.graphics.items.forEach((l) => {
            l.visible = false;
          });
        }
        store.commit("setSketchDot", []);
        let lineSORlonlat;
        if (this.selectComponents.Selected == 0) {
          lineSORlonlat = [
            this.selectComponents.lonlat1.lon,
            this.selectComponents.lonlat1.lat,
            this.selectComponents.lonlat2.lon,
          ];
        } else if (this.selectComponents.Selected < 0) {
          lineSORlonlat = [
            [
              parseFloat(this.selectComponents.lonlat1.lon),
              parseFloat(this.selectComponents.lonlat1.lat),
            ],
            [
              parseFloat(this.selectComponents.lonlat2.lon),
              parseFloat(this.selectComponents.lonlat1.lat),
            ],
            [
              parseFloat(this.selectComponents.lonlat2.lon),
              parseFloat(this.selectComponents.lonlat2.lat),
            ],
            [
              parseFloat(this.selectComponents.lonlat1.lon),
              parseFloat(this.selectComponents.lonlat2.lat),
            ],
          ];
        } else {
          let lonandlat = this.selectComponents.lonlat1.lon.split(";");
          lineSORlonlat = [];
          lonandlat.forEach((e) => {
            let item = e.split(",");
            if (item[0] && item[1]) {
              lineSORlonlat.push([parseFloat(item[0]), parseFloat(item[1])]);
            }
          });
        }
        addSelectGraph(
          this.map3d,
          lineSORlonlat,
          this.selectComponents.Selected
        );
      }
      console.log("选中", this.selectComponents.lonlat1.lon);
    },
    Hide_sketchLayer() {
      let layer = this.map3d.findLayerById("sketchLayer");
      if (layer) {
        layer.graphics.items.forEach((l) => {
          l.visible = false;
        });
        this.selectComponents.lonlat1.lon = "";
        this.selectComponents.lonlat2.lon = "";
        this.selectComponents.lonlat1.lat = "";
        this.selectComponents.lonlat2.lat = "";
      }
      store.commit("setSketchDot", []);
    },
  },
  watch: {
    SwitchEarthquakes(val, oldVal) {
      console.log(val, Sketch);
      this.oldSwitchEarthquakes = oldVal;
      this.myMeasure.isMeasure = false;
      // this.map3d.removeAll();
      // if (
      //   document.getElementsByClassName(
      //     "esri-component esri-sketch esri-widget"
      //   )[0].children[2].children[1]
      // ) {
      //   // document
      //   //   .getElementsByClassName("esri-component esri-sketch esri-widget")[0]
      //   //   .children[3].children[1].children[0].buttonEl.click();
      // }
      this.Hide_sketchLayer();
      if (val != 7) {
        // console.log(val);
        if (Sketch) {
          Sketch.visible = true; //显示草图小组件
        }
        if (document.getElementsByClassName("tools")[2]) {
          document.getElementsByClassName("tools")[2].style.display = "block";
        }
        if (document.getElementsByClassName("tools1")[0]) {
          document.getElementsByClassName("tools1")[0].style.display = "block";
        }
        this.showOrHideMarker(this.map3d);
        clearInterval(this.timer);
        this.mapInit(this.map3d, this.view3d);
      } else {
        document.getElementsByClassName("tools")[2].style.display = "none";
        document.getElementsByClassName("tools1")[0].style.display = "none";
        // this.showOrHideMarker(this.map3d);
        if (Sketch) {
          Sketch.visible = false;
        }
        if (this.canshu != 0) {
          const circleNow = document.getElementsByClassName(
            `circle ${this.canshu - 1}`
          )[0];
          circleNow.style.backgroundColor = "transparent";
        }
        this.canshu = 0;
        // this.initHistory();
        this.allHis();
      }
    },
    myTimer(newVal, oldVal) {
      if (newVal == false) {
        this.open = false;
      }
    },
    // view3d:{
    //     deep:true,
    //     handler:function(newV,oldV){
    //       console.log(newV,oldV)
    //       this.resolution = this.view3d.resolution
    //     }
    //   }
    "view3d.zoom"(newV, oldV) {
      console.log(newV, oldV);
      this.resolution = this.view3d.resolution;
    },
  },
  components: {
    mapComponent,
    flexComponent,
    flexCharts,
    Search,
  },
});
</script>

<style>
.hide-the-popup {
  display: none !important;
}
/* device-pixel-ratio--缩放比的尝试--貌似效果不大 */
@media all and (-moz-min-device-pixel-ratio: 1.09) and (-moz-max-device-pixel-ratio: 1.18),
  (-webkit-min-device-pixel-ratio: 1.09) and (-webkit-max-device-pixel-ratio: 1.18),
  (min-resolution: 1.09dppx) and (max-resolution: 1.18dppx) {
  html {
    font-size: 1vw;
  }
}
p,
h2,
ul {
  margin: 0;
  padding: 0;
}
.content-container {
  overflow: hidden;
  height: 100%;

  text-align: center;
  background-color: #f7f4f4;
}
.flexsible {
  position: absolute;
  top: 23%;
  left: 1.5%;
  z-index: 999;
}
.flexsibleChart {
  position: absolute;
  top: 58%;
  left: 1.5%;
  z-index: 999;
}
.head {
  display: flex;
  align-items: center;
  z-index: 2;
}

.titletxt {
  margin-left: 0.520833rem;
  font-size: 1.5625rem;
  color: #fff;
  text-align: left;
}
.titleimg {
  margin-left: 1.0417rem;
  width: 2.6042rem;
  height: 2.6042rem;
}
.map-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3.385417rem;
  width: 100%;
  background-image: linear-gradient(-180deg, #212239 0%, #1b2132 100%);
  opacity: 0.8;
}
.map-footer::after {
  display: block;
  content: "";
  clear: both;
}
.map-footer .leg {
  float: left;
  list-style: none;
}
.map-footer .leg img {
  display: inline-block;
  width: 0.833333rem;
  margin-left: 0.260417rem;
  vertical-align: middle;
}
.map-footer .leg::after {
  display: inline-block;
  content: "";
  height: 3.385417rem;
  vertical-align: middle;
}
.map-footer .leg > li {
  display: inline-block;
  margin-right: 0.423177rem;
  font-family: myFirstFont;
  font-size: 1.142578rem;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 3.385417rem;
  text-shadow: 0.084635rem 0.126953rem 0 rgba(0, 0, 0, 0.39);
  position: relative;
  height: 3.385417rem;
  width: 7.617188rem;
  vertical-align: middle;
}
.map-footer .leg > li:hover .sub-menu {
  display: block;
}
.map-footer .leg > li .sub-menu {
  display: none;
  position: absolute;
  width: 7.617188rem;
  bottom: 3.385417rem;
  list-style: none;
  padding: 0.423177rem;
  background-image: linear-gradient(180deg, #212239 0%, #1b2132 100%);
  box-shadow: 0 -0.380859rem 0.423177rem 0 rgba(0, 0, 0, 0.28);
}
.map-footer .leg > li .sub-menu li {
  font-family: PingFangSC-Regular;
  font-size: 0.846354rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: justify;
  line-height: 1.904297rem;
  height: 1.904297rem;
}
.map-footer .leg > li .sub-menu li::after {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  content: "";
}
.map-footer .leg > li .sub-menu li::before {
  display: block;
  content: "";
  clear: both;
}
.map-footer .leg > li .sub-menu li img {
  display: inline-block;
  height: 1.269531rem;
  width: 1.269531rem;
  vertical-align: middle;
}
.map-footer .leg > li .sub-menu li .check {
  float: right;
  width: 0.846354rem;
  height: 0.846354rem;
  cursor: pointer;
  position: relative;
  top: 50%;
  transform: translateY(-0.423177rem);
}
.map-footer .leg > li .sub-menu li .add-label {
  float: right;
  width: 0.846354rem;
  height: 0.846354rem;
  cursor: pointer;
  position: relative;
  top: 50%;
  transform: translateY(-0.423177rem);
}
.map-footer .leg > li .sub-menu li input[type="checkbox"] {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 0.846354rem;
  height: 0.846354rem;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}
.map-footer .leg > li .sub-menu li input[type="checkbox"] + .inner-check {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 0.846354rem;
  height: 0.846354rem;
  background: #fff;
  z-index: 4;
}
.map-footer
  .leg
  > li
  .sub-menu
  li
  input[type="checkbox"]:checked
  + .inner-check {
  background: red;
  transition: 1s all;
}
.map-footer .leg > li .sub-menu li input[type="checkbox"] + .inner-check i {
  display: none;
}
.map-footer
  .leg
  > li
  .sub-menu
  li
  input[type="checkbox"]:checked
  + .inner-check
  i {
  display: inline-block;
  position: absolute;
  top: 0;
}

.map-footer
  .leg
  > li
  .sub-menu
  li
  input[type="checkbox"]:checked
  input[type="checkbox"]::before {
  background: red;
}
.map-footer .measure {
  display: inline-block;
  float: left;
  vertical-align: middle;
  height: 100%;
  font-size: 1.09375rem;
  color: #fff;
}
.map-footer .measure p {
  display: block;
  height: 1.666667rem;
  line-height: 1.666667rem;
  text-align: left;
}
.map-footer .measure p span {
  font-size: 1.09375rem;
}
.map-footer .measure p .start {
  color: #67c23a;
}

.map-footer .measure p .end {
  color: #67c23a;
}

.map-footer .measure p .dis {
  color: #409eff;
}
.map-footer .tool {
  display: inline-block;
  margin: 0.846354rem 0;
  position: absolute;
  right: 1.269531rem;
}
.map-footer .tool img {
  width: 1.48112rem;
  height: 1.48112rem;
  margin-right: 2.539063rem;
  cursor: pointer;
}
.map-footer .tool img:last-child {
  margin-right: 0;
}

.roadInfo > p,
.roadInfoButton > span {
  font-family: myFirstFont;
  font-size: 0.846354rem;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 1.269531rem;
  margin-left: 0.211589rem;
  width: 80%;
  text-align: left;
}
.roadInfoButton {
  display: none;
}

.eq-status {
  position: absolute;
  top: 38.720703rem;
  right: 0.634766rem;
  width: 15.234375rem;
  padding: 0 0.423177rem 0 0.423177rem;
  background-image: linear-gradient(-180deg, #212239 0%, #1b2132 100%);
  border-radius: 0.253906rem;
  opacity: 0.8;
}
.eq-time {
  font-family: myFirstFont;
  font-size: 1.184896rem;
  line-height: 1.354167rem;
  padding: 0.423177rem 0 0.423177rem !important;
  color: rgb(250, 241, 67);
  letter-spacing: 0;
  text-align: justify;
  text-shadow: 0.084635rem 0.126953rem 0 rgba(0, 0, 0, 0.39);
}

#earthStatus {
  position: absolute;
  left: -16.145833rem;
  font-size: 2.083333rem;
  box-shadow: 0 0.052083rem 0.104167rem rgba(0, 0, 0, 0);
}
.thdimg {
  width: 100%;
}
.thd-map {
  height: 100%;
}
.home-container .content-container .thd-map {
  height: 50%;
  background-color: transparent;
  padding: 0.126953rem 0.084635rem;
  position: relative;
}
.home-container .content-container .overviewDiv {
  height: 100%;
}
.thd-near {
  margin-top: 0.211589rem;
  background-color: transparent;
}
@media only screen and (min-width: 39.583333rem) {
  .thd-near {
    margin-top: 0;
  }
  .thd-map {
    padding: 0;
  }
}
.thd-near div {
  background-color: transparent;
}
.thd-near-group {
  display: block;
}
.thd-near-item p {
  margin: 0;
}
.thd-near-item {
  display: inline-block;
  width: 45%;
  background-color: #fff !important;
  position: relative;
  padding-top: 0.211589rem;
  padding-bottom: 0.211589rem;
}
.thd-near-item:after {
  content: "";
  clear: both;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 0.052083rem 0 #b9b3b3;
  width: 100%;
  height: 100%;
}
.thd-near-item:first-child {
  margin-right: 3%;
  margin-bottom: 0.423177rem;
}
.thd-near-item:nth-child(3) {
  margin-right: 3%;
}
.thd-near-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 0.084635rem;
  padding-left: 0.126953rem;
  padding-right: 0.042318rem;
  margin-bottom: 0.423177rem;
  position: relative;
  font-size: 0.625rem;
  color: #444242;
  font-weight: 700;
}
.thd-near-title:before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  clear: both;
  border-left: 0.104167rem solid #ec0707;
  height: 100%;
}
.thd-near-name {
  color: #000;
  height: 0.833333rem;
  width: 3.385417rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.thd-near-content {
  font-size: 0.625rem;
  text-align: center;
  font-weight: 700;
  display: flex;
}
.thd-near-control {
  width: calc(100% / 3);
}
p.thd-near-label {
  margin-bottom: 0.126953rem;
  color: #736f6f;
  font-size: 0.520833rem;
}
p.thd-near-int {
  color: #e80e0e;
}
.thd-his {
  background-color: transparent;
  width: 95%;
}
.thd-his div {
  background-color: transparent;
}
.thd-his p {
  margin: 0;
}
.thd-his-title {
  text-align: left;
  margin-top: 0.846354rem;
  margin-bottom: 0.338542rem;
}
.thd-his-title h3 {
  display: inline-block;
  padding: 0.084635rem 0.126953rem;
  background-color: #bdb5b5;
  border-radius: 0.260417rem;
  color: #f5eeee;
}
.thd-his-item {
  display: flex;
  text-align: center;
  margin-bottom: 0.211589rem;
}
.thd-his-date {
  font-size: 0.78125rem;
  font-weight: 700;
  margin-right: 0.423177rem;
  width: 2.158203rem;
}
.thd-his-content {
  display: flex;
  flex-direction: column;
}
.thd-his-addr {
  display: flex;
}
.thd-his-icon {
  width: 0.423177rem;
  margin-right: 0.211589rem;
}
.thd-his-name {
  font-size: 0.78125rem;
  font-weight: 700;
}
.thd-his-detail {
  display: flex;
  font-weight: 500;
  position: relative;
  font-size: 0.625rem;
  padding-left: 0.423177rem;
  padding-top: 0.338542rem;
  margin-left: 0.211589rem;
}
.thd-his-detail:before {
  content: "";
  clear: both;
  position: absolute;
  top: 0;
  left: 0;
  border-left: 0.052083rem solid #000;
  height: 100%;
}
.thd-his-control {
  margin-right: 0.211589rem;
}
p.thd-his-label {
  margin-bottom: 0.126953rem;
  color: #5f5c5c;
  font-size: 0.520833rem;
}
p.thd-his-int {
  font-size: 0.78125rem;
}
.thd-map h4 {
  margin: 0;
  text-align: center;
}
.thd-map .map-control {
  display: none;
}

#eq_center_2D {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  margin-left: -5.208333rem;
  background-color: rgba(102, 102, 102, 0.068);
}
/* //arcmap */
/* 将弹窗的滑动条去掉 */
.esri-popup__content::-webkit-scrollbar {
  width: 0.042318rem;
  height: 16.927083rem;
  background-color: #fff;
}
.esri-popup__content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0rem rgba(240, 240, 240, 0.5);
  border-radius: 0.423177rem;
  background-color: rgba(240, 240, 240, 0.5);
}
.esri-popup__content::-webkit-scrollbar-thumb {
  width: 0.507813rem;
  border-radius: 0.253906rem;
  border: 0.042318rem solid #ffffff;
  box-shadow: inset 0 0 0rem rgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
}

.esri-ui-manual-container > .esri-popup > .esri-popup__main-container {
  background-image: linear-gradient(-180deg, #212239 0%, #1b2132 100%);
  border-radius: 0.423177rem;
  width: 14.599609rem;
  opacity: 0.89;
  padding: 0 0.423177rem;
  width: 31.25rem;
  /* height: 20.833333rem; */
}
.esri-ui .esri-ui-top-left .esri-widget {
  background-color: #fff;
}
.esri-ui .esri-ui-top-right .esri-widget {
  background-color: #fff;
}
.esri-ui .esri-ui-inner-container > .esri-ui-corner {
  background-color: transparent;
}
.esri-ui-manual-container > .esri-popup > .esri-popup__main-container {
  width: 10.416667rem;
}
.esri-expand__container .esri-expand__panel .esri-widget-button {
  background-color: #fff;
}
#topbar {
  background: #fff;
}
.action-button {
  font-size: 0.833333rem;
  background-color: transparent;
  border: 0.052083rem solid #d3d3d3;
  color: #6e6e6e;
  height: 1.666667rem;
  width: 1.666667rem;
  text-align: center;
  box-shadow: 0 0 0.052083rem rgba(0, 0, 0, 0.3);
}
#distanceButton {
  height: 1.666667rem;
  width: 1.666667rem;
  margin: 0;
}
.action-button:hover,
.action-button:focus {
  background: #0079c1;
  color: #e4e4e4;
}
.active {
  background: #0079c1;
  color: #e4e4e4;
}

/* 截图 */
#screen {
  position: relative;
  width: 1.666667rem;
  height: 1.666667rem;
  margin: 0;
  padding: 0;
}
.screenthd {
  position: absolute;
  top: 0.052083rem;
  left: 0.052083rem;
  width: 1.5625rem;
  height: 1.5625rem;
  margin: 0;
  padding: 0;
}
#screenshotDiv {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
}
.screenhide {
  display: none;
}
.screenimg {
  border: 0.520833rem solid white;
  box-shadow: 0.104167rem 0.104167rem 0.260417rem 0 rgba(0, 0, 0, 0.5);
}
#screenshotDiv > * {
  margin: 0.5em;
}
.screenshotCursor {
  cursor: crosshair;
}
#screenshotBtn {
  height: 1.666667rem;
  width: 1.666667rem;
  margin: 0;
}
.screen-button {
  padding: 0.6em;
  background-color: transparent;
  border: 0.052083rem solid #d3d3d3;
  color: #6e6e6e;
  text-align: center;
  cursor: pointer;
}
.screen-button:hover,
.screen-button:focus {
  background: #0079c1;
  color: white;
}

#maskDiv {
  position: absolute;
  background: rgba(255, 51, 0, 0.1);
  border: 0.104167rem dashed rgb(255, 51, 0);
}

.esri-ui-manual-container > .esri-popup > .esri-popup__main-container {
  width: 29.791667rem;
  height: 22.447917rem;
}
.esri-popup__main-container {
  max-height: 52.083333rem !important;
}
.esri-popup__header-title {
  font-size: 1.302083rem !important;
  color: #fff;
  background-color: transparent !important;
  margin: 0.520833rem 0 0 !important;
  z-index: -999 !important;
}
.esri-popup__header-buttons > div:first-child {
  display: none;
}
.esri-ui-corner .esri-component.esri-widget--panel {
  width: 10.416667rem !important;
  font-size: 0.78125rem !important;
}

.esri-editor__content {
  min-height: 10vh !important;
}

.esri-search {
  width: 10.416667rem !important;
}
.esri-widget__table tr td {
  text-align: center;
  font-size: 1.041667rem !important;
  color: #fff;
  border: 0.052083rem solid #fff;
}
.esri-widget__table tr th {
  width: 30% !important;
  font-size: 1.041667rem !important;
  text-align: center !important;
  color: #fff;
  border: 0.052083rem solid #fff;
}
.esri-editor__overlay .esri-editor__warning-card {
  background-color: white !important;
}
/* 量算组件位置 */
.esri-ui-bottom-right {
  bottom: 4.231771rem !important;
  right: 14.811198rem !important;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:31.25rem;*/
  max-height: calc(100% - 1.5625rem);
  max-width: calc(100% - 1.5625rem);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.el-tabs__item {
  width: 7.447917rem;
  height: 1.822917rem;
  line-height: 1.5625rem;
  text-align: center;
  font-size: 0.833333rem;
  font-weight: bold;
  color: #ffffff;
}
.el-tabs__nav-scroll {
  color: #0079c1;
  background-color: #eceef3;
}
.el-tabs__card > .el-tabs__header .el-tabs__nav {
  border: none;
}

.el-tabs__content {
  padding: 0.520833rem;
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background-color: rgba(255, 255, 255, 100);
  color: rgba(97, 154, 241, 100);
}
.newsevent {
  position: absolute;
  top: 10%;
  display: none;
}
.esri-feature-content span {
  color: #fff;
  text-indent: 1.5625rem;
  text-align: justify;
  letter-spacing: 0.026042rem;
}
.esri-popup__inline-actions-container {
  display: none;
}
.esri-popup__header-container--button {
  pointer-events: none;
}
.esri-feature-media__item-title,
.esri-feature-media__container .esri-feature-media__button {
  color: #fff;
  font-size: 1.041667rem !important;
}
.years {
  position: absolute;
  bottom: 4.427083rem;
  right: 1.5625rem;
}
.years ul {
  /* background-image: linear-gradient(-180deg, #212239 0%, #1b2132 100%); */
  opacity: 0.8;
  font-size: 1.041667rem;
  color: #d8d8d4;
  padding: 0.520833rem;
  list-style: none;
}
.circle {
  display: inline-block;
  width: 0.677083rem;
  height: 0.625rem;
  margin-right: 0.416667rem;
  /* margin-bottom: .15625rem; */
  border-radius: 0.520833rem;
  border: 0.15625rem solid #141a19;
  /* box-shadow: .052083rem 0rem .3125rem .208333rem #ffd656;
    background: #ffd656; */
}
.w-Ther {
  display: flex;
  float: right;
  margin-left: 0.423177rem;
  vertical-align: middle;
  position: absolute;
  right: 0;
  height: 3.385417rem;
  vertical-align: top;
}
.w-Ther .weather {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 0.423177rem 0;
  font-family: myFirstFont;
  font-size: 0.846354rem;
  color: #ffffff;
  letter-spacing: 0;
  position: relative;
  height: 3.385417rem;
  vertical-align: top;
}
.w-Ther .weather .first {
  height: 1.692708rem;
}

.w-Ther .weather .first .temp {
  line-height: 1.269531rem;
  margin-left: 0.423177rem;
}
.w-Ther .weather .first .area {
  line-height: 1.269531rem;
  float: left;
}
.w-Ther .weather .second .rain {
  line-height: 1.692708rem;
}
.w-Ther .weather .second .wind {
  line-height: 1.692708rem;
  margin-left: 0.846354rem;
}
.w-Ther .w-img {
  display: inline-block;
  vertical-align: top;
}
.w-Ther .w-img img {
  height: 3.385417rem;
}
.tools {
  position: absolute;
  top: 4.231771rem;
  right: 0.634766rem;
  background-image: linear-gradient(-180deg, #212239 0%, #1b2132 100%);
  border-radius: 0.423177rem;
  width: 15rem;
  /*width: 18.657552rem;*/
  opacity: 0.8;
}
.systemtitle {
  display: flex;
  align-items: center;
  z-index: 2;
  width: 100%;
  height: 3.385417rem;
  position: absolute;
  left: 0rem;
  background-image: linear-gradient(-180deg, #212239 0%, #515a6e 100%);
}
.tools1 {
  position: absolute;
  top: 5.078125rem;
  left: 1.269531rem;
  background-image: linear-gradient(-180deg, #212239 0%, #1b2132 100%);
  border-radius: 0.423177rem;
  width: 20rem;
  opacity: 0.8;
}
.group {
  margin: 0.746354rem;
}
.line {
  width: 0.15625rem;
  background: #141a19;
  margin-left: 0.364583rem;
  box-shadow: 0rem -0.416667rem 0rem 0rem;
  color: #141a19;
}
span.esri-sketch__feature-count-number {
  color: aqua;
}
.huapoNumStyle {
  font-size: 1.345833rem;
  color: rgb(217, 255, 0);
  display: inline-block;
  position: relative;
  right: -2.739583rem;
  top: 0.308333rem;
  width: 11rem;
}
.huapoNumStyle1 {
  font-size: 1.145833rem;
  color: rgb(51, 255, 0);
  display: inline-block;
  position: relative;
  right: 0.104167rem;
  line-height: 1.145833rem;
  /* left: 0rem; */
  top: 0.25rem;
  border-radius: 0.3125rem;
  border: 0.104167rem solid #ff0077;
  padding: 0.364583rem;
  cursor: pointer;
}
.Select {
  width: 15rem;
  /* height:5rem; */
}
.Select_top {
  color: aliceblue;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
}
.Select_top > span {
  cursor: pointer;
}
.Select_content {
  padding: 0.5rem;
}
.Select_content_input {
  color: aliceblue;
}
.scale {
  color: white;
  font-size: 0.9375rem;
  vertical-align: super;
  margin-right: 1.822917rem;
}
.el-button-group > .el-button {
  width: 6.68rem !important;
  float: left;
  position: relative;
}
.el-input-group {
  line-height: normal;
  display: inline-table;
  width: 13.0625rem !important;
  border-collapse: separate;
  border-spacing: 0;
}
.totalbtn {
  width: 3.2083rem !important;
}
.el-button {
  width: 1.8rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 1.5667rem !important;
  white-space: nowrap;
  cursor: pointer;
  padding-top: 0.4167rem !important;
  padding-right: 1rem !important;
  padding-bottom: 0.4167rem !important;
  padding-left: 0.7813rem !important;
  font-size: var(--el-font-size-base, 0.7292rem);
  border-radius: var(--el-border-radius-base);
}
#myChart {
  width: 100%;
  height: 1200px;
}
.chartbox {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #ffffff;
}

.new-dialog .el-dialog__header {
  background: #1b2132;
}
.el:-webkit-full-screen {
  width: 100vw;
  height: 100vh;
}
.el:-moz-full-screen {
  width: 100vw;
  height: 100vh;
}
.el:-ms-fullscreen {
  width: 100vw;
  height: 100vh;
}
.el:fullscreen {
  width: 100vw;
  height: 100vh;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(75, 75, 75, 0.58);
} /*滑块颜色*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(48, 48, 48, 0.92);
}
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}
::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.5) inset;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
.el-dialog {
  background-color: #363a50;
}
.el-dialog .el-dialog__body {
  color: #e4e4e4;
}
.el-dialog__title {
  color: #e4e4e4;
  font-size: 25px;
}
.el-textarea__inner {
  font-family: "Microsoft";
  font-size: 15px;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: var(--el-input-bg-color, var(--el-color-white));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  border: var(--el-input-border, var(--el-border-base));
  box-sizing: border-box;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  display: inline-block;
  font-size: inherit;
  height: 1.6667rem;
  line-height: 1.6667rem;
  outline: 0;
  padding: 0 .5729rem;
  transition: var(--el-transition-border);
  width: 100%;
}
</style>
