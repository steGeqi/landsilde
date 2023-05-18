<template>
  <el-main v-loading="pictLoading" element-loading-background="rgba(255,251,240 0.5)" element-loading-text="数据正在加载中">
    <div class="premanage" v-if="data">
      <div class="uppre">
        <el-row :gutter="26">
          <el-col :span="12">
            <el-button @click="dialogTableVisible = true" size="large" class="fontBtn" :disabled="this.now_user_type === '21232f297a57a5a743894a0e4a801fc3' ? false:true" >新增</el-button>
          </el-col>
          <el-col :span="3.5">
            <el-autocomplete
                size="large"
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="输入地区代码或地区名称"
                @select="handleSelect"
            ></el-autocomplete>
          </el-col>
          <el-col :span="1.5">
            <el-button size="large" @click="searchHuapo" class="fontBtn">搜索</el-button>
          </el-col>
          <el-col :span="2"
          ><el-button size="large" @click="get_echarts" v-if="picture" class="fontBtn">生成图表</el-button></el-col>
          <el-col :span="2"><el-button size="large" @click="getPushData" v-if="picture" class="fontBtn">全部数据</el-button></el-col>
        </el-row>
      </div>
      <el-dialog v-model="dialogTableVisible" title="提交操作">
        <div class="tanchu">
          <el-upload
              ref="upload"
              class="upFile"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :on-change="handleChange"
              :on-success="handleSuccess"
          >
            <template #trigger>
              <el-button size="medium" type="primary">选择降雨量文件</el-button>
            </template>
            <el-button
                style="margin-left: .5208rem"
                size="small"
                type="success"
                @click="updatePre"
            >上传</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                上传excel表格,一次只能上传一个excel表格
              </div>
            </template>
          </el-upload>
        </div>
        <div class="shili">
          <span>文件内容示例如下：</span>
          <div class="demo-image__lazy">
            <el-image
                style="width: 100%"
                v-for="url in urls"
                :key="url"
                :src="url"
                :preview-src-list="urls"
                :initial-index="1"
                lazy
            ></el-image>
          </div>
        </div>
      </el-dialog>
      <div class="tableData">

        <el-table
            :data="showPushData"
            style="width: 100%; font-size: .885417rem"
             max-height="50.208333rem"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{textAlign: 'center'}">
        >
        <el-table-column label="序号" prop=id  min-width="10%" align="center" />
          <el-table-column label="年份" prop=year min-width="10%" align="center">
            <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.year }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.year"></el-input>
            </div>
          </template>
          </el-table-column>
          <el-table-column label="地区" prop=area min-width="40%" align="center" >
            <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.area }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.area"></el-input>
            </div>
          </template>
          </el-table-column>
          <el-table-column label="地区代码" prop=area_id min-width="25%"  align="center">
            <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.area_id }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.area_id"></el-input>
            </div>
          </template>
          </el-table-column>
          <el-table-column label="降水量（mm）" prop="precipitation" min-width="15%" align="center">
            <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.precipitation }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.precipitation"></el-input>
            </div>
          </template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
          <template #default="scope">
            <el-button
              class="prebtn"
              size="large"
              :disabled="this.now_user_type === '21232f297a57a5a743894a0e4a801fc3' ? false:true"
              @click.prevent="handleEdit(scope.$index, showPushData)"
              >{{ scope.row.edit ? "提交" : "编辑" }}
            </el-button>
            <el-button
              class="prebtn"
              size="large"
              :disabled="this.now_user_type === '21232f297a57a5a743894a0e4a801fc3' ? false:true"
              @click.prevent="handleCancle(scope.$index, showPushData)"
              >{{ scope.row.edit ? "取消" : "删除" }}
            </el-button>
          </template>
        </el-table-column>
        </el-table>
        <el-row>
        <el-col>
          <el-pagination
        class="fenye"
        background
        layout="prev, pager, next"
        :total="this.num_data"
        @current-change="changePage"
        :page-size="page_size"
      >
      </el-pagination>
        </el-col>
        <el-col>
          <div class="allTotal">总数：{{num_data}}</div>
        </el-col>
      </el-row>
      </div>
    </div>
    <div v-if="!data" class="premanage">
      <div class="uppre">
        <el-row :gutter="20">
          <el-col :span="16"><el-button size="large" @click="echarts_back">返回数据列表</el-button></el-col>
        </el-row>
      </div>
      <div class="chartbox" id ="main" ></div>
    </div>
  </el-main>
</template>

<script>
import * as echarts from 'echarts'
import { ref } from 'vue'
import {getPrecipitation, getPrecipitation_data} from '../api/data'
import { upExcel } from "@/api/upFile.js";
import { ElMessage } from "element-plus";
import { getCurrentInstance } from "vue";
import excelImg from "@/assets/excelpre.png";

export default {
  data: function () {
    return {
      urls: [excelImg],
      proxy : getCurrentInstance(),
      dialogTableVisible: false,
      num_data: 0,
      totalPushData: [],
      showPushData: [],
      page_size: 12,
      pictLoading: false,
      input3: ref(''),
      select: ref(''),
      fileInfo:'',
      fileListInfo:[],
      data:true,
      picture:false,
      restaurants: [],
      state: '',
      timeout:  null,
      searchare_id:"",
      echarts_data:[],
      charts: "",
      queryString:'',
      now_user_type:'',
    }
  },
  mounted() {
    this.getPushData();
  },
  methods: {
    echarts_back(){
      this.$router.go(0)
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : "";
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().match(queryString.toLowerCase()) );
      };
    },
    handleSelect(item) {
      this.searchare_id = item.area_id
      this.queryString = item.value.slice(7)
      getPrecipitation_data(this.searchare_id)
          .then((res)=>{
            console.log(res.data.table_data)
            this.echarts_data = res.data.option_data
            console.log(this.echarts_data)
            var obj = res.data.table_data
            var values = []
            for (var key in obj) {
              values.push(obj[key])
            }
            console.log()
            this.num_data = values.length
            this.totalPushData = values
            let indexPushData = []
            this.totalPushData
                .slice(0, this.page_size)
                .map((data, index) => {
                  data.edit = false;
                  indexPushData.push(data)
                })
            this.showPushData = indexPushData
            this.pictLoading = false
            this.picture=true;
          })
    },
    searchHuapo(){
      this.picture=true;
      getPrecipitation_data(this.searchare_id)
          .then((res)=>{
            console.log(res.data.table_data)
            var obj = res.data.table_data
            var values = []
            for (var key in obj) {
              values.push(obj[key])
            }
            console.log()
            this.num_data = values.length
            this.totalPushData = values
            let indexPushData = []
            this.totalPushData
                .slice(0, this.page_size)
                .map((data, index) => {
                  data.edit = false;
                  indexPushData.push(data)
                })
            this.showPushData = indexPushData
            this.pictLoading = false
          })
    },
    get_echarts(){
      this.data=false
      this.initEcharts()
    },
    //  检查dom是否执行完成
    initEcharts() {
      //  声明定时器
      var timer = null
      let dom = document.getElementById('main')
      console.log(dom)
      if (dom) {
        this.drawPie()
        //  清除定时器
        if (!timer) {
          clearTimeout(timer)
        }
      } else {
        timer = setTimeout(this.initEcharts, 0)
      }
    },
    drawPie() {
      //当前视口宽度----此处解决rcharts中字体自适应
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
      let myChart = this.$echarts.init(document.getElementById('main'))
      const option = {
        title: {
          text: this.queryString+"降雨量波形图",
           x: 'center',
           textStyle: {
                        fontSize: nowSize(23),
                    },
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.echarts_data.map(function (item) {
            return item[0];
          }),
          name:"时间/年",
            nameTextStyle: {
                            fontSize: nowSize(18),

                        },
                         axisLabel: {
                            fontSize: nowSize(15),
                        },
        },
        yAxis: {
          name:"降雨量/mm",
            nameTextStyle: {
                            fontSize: nowSize(18),

                        },
                         axisLabel: {
                            fontSize: nowSize(15),
                        },
        },
        toolbox: {
          right: 10,
          feature: {
            saveAsImage: {},
          }
        },
        dataZoom: [
          {
            startValue: '0'
          },
          {
            type: 'inside'
          }
        ],
        visualMap: {
          show :false,
          pieces: [
            {
              gt: 0,
              lte: 10000,
              color: '#FD0100'
            },
          ],
        },
        series: {
          name: this.queryString,
          type: 'line',
          color: '#FD0100',
          data: this.echarts_data.map(function (item) {
            return item[1];
          }),
        }
      }

      myChart.clear()
      myChart.setOption(option)
      // 图表自适应盒子
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },

    handleChange(file, fileList) {
      this.fileInfo = file.raw;
      this.fileListInfo = fileList;
    },
    updatePre() {
      let data = new FormData();
      data.append("file", this.fileInfo, this.fileInfo.name);
      if (
          this.fileInfo.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileInfo.type === "application/vnd.ms-excel"
      ) {
        upExcel(-2, data).then((res) => {
          console.log(res);
          // this.proxy.$refs.upload.submit();
          ElMessage({
            message: "上传降雨量数据成功",
            type: "success",
          });
          this.dialogTableVisible = false;
        });
      } else {
        ElMessage({
          message: "请按照步骤上传指定文件",
          type: "warning",
        });
      }
    },
    headClass() {
      return 'text-align:center'
    },
    rowClass() {
      return 'text-align:center'
    },
    getPushData() {
      this.now_user_type = sessionStorage.getItem("user_type");
      this.picture = false
      this.pictLoading = true
      getPrecipitation()
          .then((res) => {
            var obj = res.data
            var values = []
            var obj_1={}
            for (var key in obj) {
              values.push(obj[key])
              if(key<=333){
                obj_1={
                  "value":obj[key].area_id+":"+obj[key].area,
                  "area_id":obj[key].area_id
                }
                this.restaurants.push(obj_1)
              }
            }
            // console.log(this.restaurants)
            this.num_data = values.length
            this.totalPushData = values
            let indexPushData = []
            this.totalPushData
                .slice(0, this.page_size)
                .map((data, index) => {
                  data.edit = false;
                  indexPushData.push(data)
                })
            this.showPushData = indexPushData
            this.pictLoading = false
          })
          .catch((err) => {
            console.log(err)
          })
    },
    //分页
    changePage(index) {
      let start_index = (index - 1) * this.page_size
      let end_index = index * this.page_size
      let indexPushData = []
      this.totalPushData
          .slice(start_index, end_index)
          .map((data, index) => {
            data.edit = false;
            indexPushData.push(data)
          })
      this.showPushData = indexPushData
    },
        //编辑功能
    handleEdit(index, rows) {
      rows[index].edit = !rows[index].edit;
      if (!rows[index].edit) {
        console.log("提交");
        editMarker(2,rows[index].id, rows[index]).then((res) => {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        })
      }
    },

    //取消功能
    handleCancle(index, rows) {
      rows[index].edit = !rows[index].edit;
      if (rows[index].edit) {
        ElMessageBox.confirm("确认要删除吗？", "警告", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            console.log(rows[index].id);
            delMarker(2,rows[index].id).then((res) => {
              ElMessage({
                  type: 'success',
                  message: '删除成功',
              })
              refRoad()
            })
          })
          .catch(() => {
            console.log("取消");
          });
      }
    }
  },

}
</script>

<style>
html{
  font-size: 1vw;
}
.widthFit{
  color: aquamarine;
  text-align: center !important;
  background-color: aqua;
}
.el-button{
  font-size: .9375rem !important;
  font-weight: bold !important;
}
.uppre .el-button {
      width:6.7708rem;
  font-size: 1.041667rem;
  font-weight: bold;
}
.tableData {
  border: .052083rem solid #dcdfe6;
  margin: .260417rem 1.302083rem;
}
.el-pagination {
  text-align: center;
  margin-top: 1.302083rem;
}
.el-table {
  font-size: .885417rem;
  max-height: 39.53125rem;
}
.el-table tr{
  height: 3.4375rem;
}
.tableData .el-table .cell {
  text-align: center;
  text-overflow: clip;
}
.uppre {
  padding: 1.041667rem 1.302083rem;
}
.premanage table{
  font-size: 1.041667rem;
}
.fenye .el-pager li{
  font-size: 1.354167rem;
  width: 2.083333rem;
  height: 1.458333rem;
  font-weight: 200;
}
.fenye {
  position: fixed;
  left: 35.666667rem;
  bottom: 2.604167rem;
}
.tableData .allTotal {
  position: fixed;
  right: 26.041667rem;
  bottom: 2.604167rem;
  border: 0.052083rem solid gray;
  padding: 0.15625rem;
  font-size: 1.041667rem;
  background: #f4f4f5;
}
.tableData .el-pagination__total{
  border: .052083rem solid gray;
  font-size: 1.145833rem !important;
  background: #f4f4f5;
  margin-left: 2.3438rem;
}
.premanage .el-select .el-input__inner {
  font-size: 1.041667rem;
  font-weight: bold;
}
.premanage .el-input--medium .el-input__inner {
  font-size: .885417rem;
  font-weight: bold;
  height: 2.083333rem;
}
.el-upload__tip{
  font-size: 1.2rem;
}
.chartbox{
  width:83.3333rem;
  height: 46.875rem;
  /*background-color: aqua;*/
}
.prebtn{
    width: 3.2083rem !important;
}
.fontBtn{
    height: 2.0833rem !important;
}
.el-input__inner{
  font-size: .885417rem;
  font-weight: bold;
}
</style>

