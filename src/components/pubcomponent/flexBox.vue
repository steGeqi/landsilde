<template>
  <div
    v-bind:id="id"
    :class="flexclass"
    class="flexbox"
  >
    <!--    <div v-show="show">-->
    <!--      <div class="tool">-->
    <!--        <el-button-group :size="buttonSize">-->
    <!--          <el-button-->
    <!--            ghost-->
    <!--            :icon="open ? 'el-icon-minus' : 'el-icon-plus'"-->
    <!--            @click="switchCard"-->
    <!--          ></el-button>-->
    <!--        </el-button-group>-->
    <!--      </div>-->

    <!--      <div-->
    <!--        class="content"-->
    <!--        v-show="open"-->
    <!--      >-->
    <!--        <div-->
    <!--          class="huapo"-->
    <!--          v-if="SwitchEarthquakes !== 7"-->
    <!--        >-->
    <!--          <div class="titleName">{{ huapoName }}</div>-->
    <!--          <div class="areaName">-->
    <!--            滑坡总数: <span class="areanum">&nbsp;&nbsp; {{ huapoNum }}</span>-->
    <!--          </div>-->
    <!--          <div class="areaName" >-->
    <!--            最大覆盖面积:-->
    <!--            <span class="rednum" style="color: #f5ed89">&nbsp;&nbsp; {{ maxArea }}㎡</span>-->
    <!--          </div>-->
    <!--          <div class="areaName">-->
    <!--            最大坡角: <span class="rednum">&nbsp;&nbsp; {{ maxAngle }}°</span>-->
    <!--          </div>-->

    <!--          <div class="areaName">-->
    <!--            最高地震烈度:-->
    <!--            <span class="rednum">&nbsp;&nbsp; {{ intensity }}</span>-->
    <!--          </div>-->
    <!--          <div class="areaName">-->
    <!--            现场图片数: <span class="areanum">&nbsp;&nbsp; {{picNum}}</span>-->
    <!--          </div>-->
    <!--          <slot></slot>-->
    <!--        </div>-->

    <!--        <div-->
    <!--          class="hisearth"-->
    <!--          v-else-->
    <!--        >-->
    <!--          <div class="titleName">黄土高原地区2001年至2018年历史地震</div>-->
    <!--          <div class="hisName">-->
    <!--            历史地震总数:-->
    <!--            <span class="areanum">&nbsp;&nbsp; {{ hisAllNum }}</span>-->
    <!--          </div>-->
    <!--          <div class="hisName">-->
    <!--            发生过最大震级地区:-->
    <!--            <span class="rednum">&nbsp;&nbsp; {{ maxEarth }}</span>-->
    <!--          </div>-->
    <!--          <div class="hisName">-->
    <!--            被最多台站监测的地区:-->
    <!--            <span class="rednum">&nbsp;&nbsp; {{ maxStation }}被{{max}}个台站监测</span>-->
    <!--          </div>-->

    <!--          <div class="hisName">-->
    <!--            被最少台站监测的地区:-->
    <!--            <span class="rednum">&nbsp;&nbsp; {{ minStation }}被{{min}}个台站监测</span>-->
    <!--          </div>-->
    <!--          <div class="hisName">-->
    <!--            <span>3级以下</span><img-->
    <!--              style="width: 40px;height: 40px;    vertical-align: middle;"-->
    <!--              src="@/assets/imgicon/historyEarth.png"-->
    <!--            />-->
    <!--            <span>3~4.5级</span><img-->
    <!--              style="width: 40px;height: 40px;    vertical-align: middle;"-->
    <!--              src="@/assets/imgicon/historyEarth2.png"-->
    <!--            />-->
    <!--            <span>4.5级以上</span> <img-->
    <!--              style="width: 40px;height: 40px;    vertical-align: middle;"-->
    <!--              src="@/assets/imgicon/historyEarth1.png"-->
    <!--            />-->
    <!--          </div>-->
    <!--          <slot></slot>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-show="show">
      <div class="tool">
        <!-- <el-button-group
        class="el-button-groups"
          :size="buttonSize"
        > -->
          <el-button
          class="el-button-groups"
            ghost
            :icon="open ? Minus : Plus"
            @click="switchCard"
          ></el-button>
        <!-- </el-button-group> -->
      </div>

      <div
        class="content"
        v-show="open"
      >
        <div
          class="huapo"
          v-if="SwitchEarthquakes !== 7"
        >
          <div class="titleName">地震滑坡概况</div>
          <table
            border="1"
            class="huapo_table"
          >
            <tr>
              <td><span class="areaName">滑坡总数</span></td>
              <td>
                <span class="areanum">{{ huapoNum }}&nbsp;<span style="font-size:1.25rem">个</span></span>
              </td>
            </tr>
            <tr>
              <td><span class="areaName">滑坡总覆盖面积</span></td>
              <td>
                <span class="areanum">{{ huapoAllArea }}&nbsp;㎞²</span>
              </td>
            </tr>
            <tr v-show="areaMax">
              <td><span class="areaName">最大覆盖面积</span></td>
              <td>
                <span class="areanum">{{ maxArea }}&nbsp;㎞²</span>
              </td>
            </tr>
            <tr>
              <td><span class="areaName">现场照片数</span></td>
              <td>
                <span class="areanum">{{ picNum }}&nbsp;<span style="font-size:1.25rem">张</span></span> 
              </td>
            </tr>
          </table>
          <slot></slot>
        </div>

        <div
          class="hisearth"
          v-else
        >
          <div class="titleName">黄土高原地区2001年-2018年地震信息</div>
          <table
            border="1"
            class="his_table"
          >
            <tr>
              <td><span class="hisName">地震总数:</span></td>
              <td>
                <span class="his_areanum">{{ hisAllNum }}</span>
              </td>
            </tr>
            <tr>
              <td><span class="hisName">最大震级:</span></td>
              <td>
                <span
                  class="his_areanum point"
                  @click="toMaxEarth(maxEarth.split('_')[1], maxEarth.split('_')[2])"
                >
                  {{ maxEarth.split('_')[0] }}
                </span>
              </td>
            </tr>
            <tr>
              <td><span class="hisName">最小震级:</span></td>
              <td>
                <span
                  class="his_areanum point"
                  @click="toMaxEarth(minEarth.split('_')[1], minEarth.split('_')[2])"
                >
                  {{ minEarth.split('_')[0] }}
                </span>
              </td>
            </tr>
            <tr>
              <td style="width: 11.5625rem">
                <span class="hisName">触发台站最多的地震:</span>
              </td>
              <td>
                <span
                  class="rednum point"
                  @click="toMaxEarth(maxStation.split('_')[1],maxStation.split('_')[2])"
                >
                  {{ maxStation.substr(0, maxStation.indexOf("_")) }} ({{ max }}<span style="font-size:1.25rem">个</span>)
                </span>
              </td>
            </tr>
            <tr>
              <td><span class="hisName">触发台站最少的地震:</span></td>
              <td>
                <span
                  class="rednum point"
                  @click="toMaxEarth(minStation.split('_')[1],minStation.split('_')[2])"
                >
                  &nbsp;&nbsp; {{ minStation.substr(0, minStation.indexOf("_")) }} ({{min}}<span style="font-size:1.25rem">个</span>)
                </span>
              </td>
            </tr>
          </table>
          <div class="hisName">
            <div>
              <span>1&nbsp;≤&nbsp;<span style="font-style: italic">M&nbsp;</span>&lt;3</span>
              <img
                style="width: 2.0833rem; height: 2.0833rem; vertical-align: middle"
                src="@/assets/imgicon/f90600.png"
              />
            </div>
            <!-- <span>>=3级且&lt;4.5级</span> -->
            <div>
              <span>3&nbsp;≤&nbsp;<span style="font-style: italic">M&nbsp;</span>&lt;5</span>
              <img
                style="width: 2.6042rem; height: 2.6042rem; vertical-align: middle"
                src="@/assets/imgicon/f90600.png"
              />
            </div>
            <div>
               <span>5&nbsp;≤&nbsp;<span style="font-style: italic">M&nbsp;</span>&lt;7</span>
              <img
                style="width: 3.125rem; height: 3.125rem; vertical-align: middle"
                src="@/assets/imgicon/f90600.png"
              />
            </div>
          </div>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from "vuex";
import { getHuapoMarker } from "../../api/huapo";
import { getHistoryEq, getStationEq } from "@/api/history.js";
import { Minus, Plus } from "@element-plus/icons-vue";
import Point from "@arcgis/core/geometry/Point";
import useArcmap from "@/assets/api/arcmap/index";
var view3d = {};
export default {
  setup() {
    return useArcmap("overviewDiv", "thdmap");
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    view: {
      type: Object,
      default: "",
    },
  },
  data: function () {
    return {
      Minus,
      Plus,
      stations: [],
      max: 0,
      min: 0,
      hisAllNum: 0,
      maxEarth: "",
      minEarth: "",
      maxStation: "",
      minStation: "",
      hisEarthData: [],
      riverNum: 300,
      num: 0,
      huapoArea: 0,
      huapoAllArea: 0,
      maxArea: 0,
      angleArr: [],
      OriginalSlopeArea1: [],
      OriginalSlopeArea2: [],

      OriginalSlopeArea3: [],

      OriginalSlopeArea4: [],

      OriginalSlopeArea5: [],

      OriginalSlopeArea6: [],

      OriginalSlopeArea7: [],

      OriginalSlopeArea: [],

      huapoDatatotal: [],
      huapoDatatotals: [],
      picNum: 0,
      huapoDataList: {
        hongdong: "",
        huaxian: "",
        tianshui: 0,
        linfen: "",
        tongwei: "",
        haiyuan: "",
        gulang: "",
      },
      huapoNum: 0,
      flexclass: null,
      buttonSize: "small",
      areaMax: true,
      open: true,
      show: false,
      style: {
        width: this.width,
      },
    };
  },
  watch: {
    SwitchEarthquakes(val, oldVal) {
      console.log(val);
    },
    //   等待外部函数结束之后在执行内部函数
    huapoDot(val, old) {
      console.log(this.picNum);

      this.huapodatas();
    },
  },
  // watch  mounted
  mounted() {
    console.log(this.view);
    this.huapoData();
    this.hisData();
    if (this.SwitchEarthquakes != -1) {
      this.show = true;
    }
  },
  computed: {
    ...mapState(["SwitchEarthquakes", "huapoDot"]),
  },

  methods: {
    switchCard() {
      this.open = !this.open;
      if (this.open) {
        this.style.width = this.width;
      } else {
        this.style.width = "4.1667rem";
      }
    },
    init() {
      //console.log(this.id)
    },
    getMsg(msg) {
      view3d = msg;
    },
    //拿数据
    async huapoData() {
      let huapodata = await getHuapoMarker(-1);
      huapodata.marker.forEach((e) => {
        if (e[18] == "0") {
          this.OriginalSlopeArea6.push(parseInt(e[8]));
        } else if (e[18] == "1") {
          this.OriginalSlopeArea4.push(parseInt(e[8]));
        } else if (e[18] == "2") {
          this.OriginalSlopeArea1.push(parseInt(e[8]));
        } else if (e[18] == "3") {
          this.OriginalSlopeArea7.push(parseInt(e[8]));
        } else if (e[18] == "4") {
          this.OriginalSlopeArea2.push(parseInt(e[8]));
        } else if (e[18] == "5") {
          this.OriginalSlopeArea3.push(parseInt(e[8]));
        } else if (e[18] == "6") {
          this.OriginalSlopeArea5.push(parseInt(e[8]));
        }
      });
      this.huapodatas();
    },
    //参数切换函数
    huapodatas() {
     
      let item = this.huapoDot;
      console.log(item);
      this.huapoNum = item.length;
      // this.huapoArea=item
      //每次都要初始化为0
      this.picNum = 0;
      for (let i = 0; i < item.length; i++) {
        this.picNum += parseInt(item[i][19]);
      }
      this.huapoAllArea = 0;
      for (let i = 0; i < item.length; i++) {
        this.huapoAllArea += parseInt(item[i][8]);
      }
      this.huapoAllArea = (this.huapoAllArea / 1000000).toFixed(2);
      console.log(this.SwitchEarthquakes);
      if (this.SwitchEarthquakes == -1) {
        this.show = true;
        // 由于数据量排序太慢（20S），暂时先写死
        this.areaMax = false;
      } else if (this.SwitchEarthquakes == 2) {
        this.show = true;
        this.areaMax = true;
        this.handleData(this.OriginalSlopeArea1, this.huapoNum);
        // console.log(this.OriginalSlopeLie1);
      } else if (this.SwitchEarthquakes == 4) {
        this.show = true;
        this.areaMax = true;
        this.handleData(this.OriginalSlopeArea2, this.huapoNum);
      } else if (this.SwitchEarthquakes == 5) {
        this.show = true;
        this.areaMax = true;
        this.handleData(this.OriginalSlopeArea3, this.huapoNum);
        // console.log(this.OriginalSlopeLie3);
      } else if (this.SwitchEarthquakes == 1) {
        this.show = true;
        this.areaMax = true;
        this.handleData(this.OriginalSlopeArea4, this.huapoNum);
        // console.log(this.OriginalSlopeLie4);
      } else if (this.SwitchEarthquakes == 6) {
        this.show = true;
        this.areaMax = true;
        this.handleData(this.OriginalSlopeArea5, this.huapoNum);
      } else if (this.SwitchEarthquakes == 0) {
        this.show = true;
        this.areaMax = true;
        this.handleData(this.OriginalSlopeArea6, this.huapoNum);
      } else if (this.SwitchEarthquakes == 3) {
        this.show = true;
        this.areaMax = true;
        this.handleData(this.OriginalSlopeArea7, this.huapoNum);
      } else {
        this.show = true;
      }
    },

    //  数据排序--Area
    handleData(OriginalSlopeArea, length) {
      for (let m = 0; m < length - 1; m++) {
        for (let n = 0; n < length - m - 1; n++) {
          if (OriginalSlopeArea[n] < OriginalSlopeArea[n + 1]) {
            let temp = OriginalSlopeArea[n];
            OriginalSlopeArea[n] = OriginalSlopeArea[n + 1];
            OriginalSlopeArea[n + 1] = temp;
          }
          // if (OriginalSlopeAngle[n] < OriginalSlopeAngle[n + 1]) {
          //   let temp2 = OriginalSlopeAngle[n];
          //   OriginalSlopeAngle[n] = OriginalSlopeAngle[n + 1];
          //   OriginalSlopeAngle[n + 1] = temp2;
          // }
          // if (OriginalSlopeLie[n] < OriginalSlopeLie[n + 1]) {
          //   let temp2 = OriginalSlopeLie[n];
          //   OriginalSlopeLie[n] = OriginalSlopeLie[n + 1];
          //   OriginalSlopeLie[n + 1] = temp2;
          // }
        }
      }
      this.maxArea = (OriginalSlopeArea[0] / 1000000).toFixed(2);
    },
    // this.maxAngle = OriginalSlopeAngle[0];
    // if (OriginalSlopeLie[0] == 6) {
    //   this.intensity = "Ⅵ";
    // } else if (OriginalSlopeLie[0] == 7) {
    //   this.intensity = "Ⅶ";
    // } else if (OriginalSlopeLie[0] == 8) {
    //   this.intensity = "Ⅷ";
    // } else if (OriginalSlopeLie[0] == 9) {
    //   this.intensity = "Ⅸ";
    // } else if (OriginalSlopeLie[0] == 10) {
    //   this.intensity = "Ⅹ";
    // } else if (OriginalSlopeLie[0] == 11) {
    //   this.intensity = "Ⅺ";
    // } else if (OriginalSlopeLie[0] == 12) {
    //   this.intensity = "Ⅺ~Ⅻ";
    // }
    // },

    //历史地震数据
    async hisData() {
      
      let i, j;
      let that = this;
      let temp = {};
      let station = [];
      let linshi = [];
      this.hisEarthData = await getHistoryEq("his_");
      let len = (this.hisAllNum = this.hisEarthData.marker.length);
      let hisAll = this.hisEarthData.marker;
      console.log(hisAll[0]);
      console.log(hisAll[len - 1][7]);
      getStationEq(-1).then((result) => {
        this.stations = result.station;
        for (i = 0; i < len - 1; i++) {
          let res = this.getStation(hisAll[i][0]);
          linshi = [];
          for (let m = 0; m < res.length; m++) {
            linshi.push(res[m]);
          }
          // max = linshi.length > max ? linshi.length : that.maxStation;
          that.maxStation =
            linshi.length > that.max
              ? linshi[0][2] + "_" + linshi[0][4] + "_" + linshi[0][5]
              : that.maxStation;
          that.max = linshi.length > that.max ? linshi.length : that.max;

          that.minStation =
            linshi.length > that.min
              ? linshi[0][2] + "_" + linshi[0][4] + "_" + linshi[0][5]
              : that.minStation;
          that.min = linshi.length < that.min ? linshi.length : that.min;
          for (j = 0; j < len - i - 1; j++) {
            if (parseFloat(hisAll[j][7]) > parseFloat(hisAll[j + 1][7])) {
              temp = hisAll[j];
              hisAll[j] = hisAll[j + 1];
              hisAll[j + 1] = temp;
            }
          }
        }
        this.maxEarth =
          hisAll[len - 1][7].substr(0, hisAll[len - 1][7].indexOf("(")) +
          " ( " + hisAll[len - 1][2] + " )_" 
          +
          hisAll[len - 1][4] +
          "_" +
          hisAll[len - 1][5];
        this.minEarth =
          hisAll[0][7].substr(0, hisAll[0][7].indexOf("(")) +
          " ( " + hisAll[0][2] + " )_" 
          +
          "_" +
          hisAll[0][4] +
          "_" +
          hisAll[0][5];
          
      }
      );
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

    toMaxEarth(x, y) {
      let pt = new Point({
        latitude: parseFloat(x),
        longitude: parseFloat(y),
      });
      let that = this;
      console.log(view3d);
      view3d.when(() => {
        console.log(pt);
        view3d.goTo({
          target: pt,
          zoom: 12,
        });
      });
    },
  },
};
</script>

<style scoped>
html {
  font-size: 1vw;
}
@font-face {
  font-family: "ds-digitalnormal";
  src: url("../../assets/FONT/DS-DIGIT.TTF") format("woff2"),
    url("../../assets/FONT/DS-DIGIB.TTF") format("woff");
  font-weight: normal;
  font-style: normal;
  /* font-size: 1.5625rem; */
}
.point {
  cursor: pointer;
}
.flexbox {
  position: relative;
  float: left;
  z-index: 999;
  background-image: linear-gradient(-180deg, #080810cc 0%, #1b2132d4 100%);
  border-radius: 0.423177rem;
}
.flexbox .tool::after {
  position: absolute;
  display: block;
  content: "";
  clear: both;
}
.flexbox .tool .ivu-btn-group {
  float: right;
}
.flexbox .tool .el-button {
  background: transparent;
  padding: 0.104167rem;
}
.content .huapo {
  height: 17.1875rem;
  width: 20.3125rem;
}
.content .huapo .huapo_table {
  border-spacing: 0;
  width: 100%;
  height: 90%;
}
.content .huapo .huapo_table td {
  text-align: center;
  border-color: #ffffff;
  padding: 0.520833rem;
}

.content .hisearth .his_table {
  border-spacing: 0;
  width: 100%;
  height: 80%;
}
.content .hisearth .his_table td {
  text-align: center;
  border-color: white;
  padding: 0.520833rem;
}
.content .hisearth {
  background-image: linear-gradient(-180deg, #080810cc 0%, #1b2132d4 100%);
  border-radius: 0.423177rem;
  margin-top: -6.166667rem;
  height: 22.270833rem;
  width: 22.395833rem;
}
.titleName {
  font-size: 1.145833rem;
  color: #fff;
}
.areaName {
  text-align: center;
  font-size: 1.09375rem;
  color: #fff;
}
.hisName {
  text-align: center;
  font-size: 1.041667rem;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.areanum {
  text-align: center;
  font-family: "ds-digitalnormal";
  font-size: 1.458333rem;
  color: #f5ed89;
}
.his_areanum {
  font-family: "ds-digitalnormal";
  font-size: 1.145833rem;
  color: #f5ed89;
}
.huapo .rednum {
  font-family: "ds-digitalnormal";
  font-size: 1.458333rem;
  color: #f5ed89;
}
.hisearth .rednum {
  font-family: "ds-digitalnormal";
  /* font-weight: bolder; */
  font-size: 0.9375rem;
  color: #f5ed89;
}
.el-button-groups{
position: absolute; left: 0; z-index: 999; width:1.5625rem !important;
}
</style>
