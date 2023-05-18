<template>
  <div class="hismanage">
    <div class="upHis">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-button @click="dialogTableVisible = true" size="large" class="fontBtn"
            >新增地震信息</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-select
            v-model="select"
            placeholder="字段"
            style="width: 6.7708rem"
            size="large"
          >
            <el-option label="地震名称" value="0"></el-option>
            <el-option label="发震时间" value="1"></el-option>
            <el-option label="地震震级" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="1" v-show="select == '2'">
          <el-select
            v-model="selectOper"
            placeholder="运算"
            style="width: 6.25rem"
            size="large"
          >
            <el-option label=">" value="0"></el-option>
            <el-option label="=" value="1"></el-option>
            <el-option label="<" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input v-model="search" placeholder="输入" size="medium">
          </el-input
        ></el-col>
        <el-col :span="2">
          <el-button size="large" @click="searchHis" class="fontBtn">搜索</el-button>
        </el-col>
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
            <el-button size="medium" type="primary">选择地震信息文件</el-button>
          </template>
          <el-button
            style="margin-left: 0.5208rem"
            size="small"
            type="success"
            @click="updateHis"
            >上传</el-button
          >
          <template #tip>
            <div class="el-upload__tip">
              上传地震的excel表格,一次只能上传一个excel表格
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
        :data="hisEarth"
        style="width: 100%; font-size: 0.885417rem"
        max-height="50.208333rem"
        id="his-table"
      >
        <!--        <el-table-column type="index" :index="indexMethod" width="100"/>-->
        <el-table-column label="序号" prop="id" width="100" />
        <el-table-column prop="ChineseName" label="地震中文名称" width="200">
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.ChineseName }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.ChineseName"></el-input>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="earthTime" label="发震时间" width="250" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.earthTime }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.earthTime"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="EpicentralLatitude"
          label="震中纬度"
          width="130"
        >
        <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.EpicentralLatitude }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.EpicentralLatitude"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="EpicentralLongitude"
          label="震中经度"
          width="130"
        >
        <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.EpicentralLongitude }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.EpicentralLongitude"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="FocalDepth" label="震源深度/km" width="150" >
        <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.FocalDepth }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.FocalDepth"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="magnitude" label="震 级" width="130" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.magnitude }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.magnitude"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="StationName" label="台站名称" width="200" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.StationName }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.StationName"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="StationCode" label="台站代码" width="130" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.StationCode }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.StationCode"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="StationLatitude" label="台站纬度" width="130" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.StationLatitude }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.StationLatitude"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="StationLongitude" label="台站经度" width="130" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.StationLongitude }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.StationLongitude"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="addressCondition" label="场地条件" width="130" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.addressCondition }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.addressCondition"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="recordModel" label="记录器型号" width="250" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.recordModel }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.recordModel"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="measurePoint" label="测点位置" width="180" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.measurePoint }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.measurePoint"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="recordOrient" label="记录方位" width="130" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.recordOrient }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.recordOrient"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="SamplingInterval"
          label="采样间隔/s"
          width="130"
        >
        <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.SamplingInterval }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.SamplingInterval"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="持续时间/s" width="130" >
          <template #default="scope">
              <div v-show="!scope.row.edit">
                {{ scope.row.duration }}
              </div>
              <div v-show="scope.row.edit">
                <el-input size="large" v-model="scope.row.duration"></el-input>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="PGA" label="PGA值/gal" width="130" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.PGA }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.PGA"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="PGATime" label="PGA值对应时间/s" width="200" >
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.PGATime }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.PGATime"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button
              class="hisbtn"
              size="large"
              @click.prevent="handleEdit(scope.$index, hisEarth)"
              >{{ scope.row.edit ? "提交" : "编辑" }}
            </el-button>
            <el-button
              class="hisbtn"
              size="large"
              @click.prevent="handleCancle(scope.$index, hisEarth)"
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
            :total="total"
            v-model:currentPage="currentPage"
            :page-size="pagesize"
          >
          </el-pagination>
        </el-col>
        <el-col>
          <div class="allTotal">总数：{{total}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getHistoryEq, searchhis } from "@/api/history.js";
import {editMarker,delMarker} from '@/api/huapo.js'
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import excelImg from "@/assets/excelhis.png";
import { getCurrentInstance } from "vue";
import { upExcel } from "@/api/upFile.js";

export default {
  setup() {
    let originCode = ref("");
    let search = ref("");
    const select = ref("0");
    let selectOper = ref("");
    const dialogTableVisible = ref(false);
    let urls = ref([excelImg]);
    let pagesize = ref(12);
    const currentPage = ref(1);
    let total = ref(0);
    let hisEarth = ref([]);
    let hisTotal = [];
    let fileInfo = {};
    let fileListInfo = [];
    const { proxy } = getCurrentInstance();
    watch(
      currentPage,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
        if (oldVal === undefined) {
          handleData();
        } else {
          hisEarth.value = [];
          for (let i = (newVal - 1) * 12; i < newVal * 12; i++) {
            console.log(hisTotal[i]);
            if (hisTotal[i] !== undefined) {
              hisEarth.value.push(hisTotal[i]);
            }
          }
        }
      },
      { immediate: true }
    );
    watch(search, (newVal, oldVal) => {
      console.log(newVal);
      if (newVal === "") {
        handleData();
      }
    });
    function handleData() {
      let num = 0;
      hisTotal = [];
      total.value = 0;
      hisEarth.value = [];
      getHistoryEq("his").then((res) => {
        total.value += res.marker.length;
        res.marker.forEach((e) => {
          let obj = {
            id: e[0],
            EnglishName:e[1],
            ChineseName: e[2],
            earthTime: e[3],
            EpicentralLatitude: e[4],
            EpicentralLongitude: e[5],
            FocalDepth: e[6],
            magnitude: e[7],
            StationName: e[8],
            StationCode: e[9],
            StationLatitude: e[10],
            StationLongitude: e[11],
            addressCondition: e[12],
            recordModel: e[13],
            measurePoint: e[14],
            recordOrient: e[15],
            SamplingInterval: e[16],
            duration: e[17],
            PGA: e[18],
            PGATime: e[19],
            edit: false,
          };
          if (num < 12) {
            hisEarth.value.push(obj);
          }
          hisTotal.push(obj);
          num++;
        });
      });
    }

    //处理时间
    function formatDate(date) {
      date =
        date.toString().substr(0, 4) +
        "-" +
        date.toString().substr(4, 2) +
        "-" +
        date.toString().substr(6, 2);
      return date;
    }
    function handleChange(file, fileList) {
      console.log(file, fileList);
      fileInfo = file.raw;
      fileListInfo = fileList;
    }
    function updateHis() {
      console.log(fileListInfo);
      let data = new FormData();
      data.append("file", fileInfo, fileInfo.name);
      console.log(fileInfo.type);
      if (
        fileInfo.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        fileInfo.type === "application/vnd.ms-excel"
      ) {
        upExcel(-1, data).then((res) => {
          console.log(res);
          proxy.$refs.upload.submit();
          ElMessage({
            message: "上传地震信息成功",
            type: "success",
          });
          dialogTableVisible.value = false;
        });
      } else {
        ElMessage({
          message: "请按照步骤上传指定文件",
          type: "warning",
        });
      }
    }

    //编辑功能
    function handleEdit(index, rows) {
      console.log(rows[index].edit);
      rows[index].edit = !rows[index].edit;
      if (!rows[index].edit) {
        console.log("提交");
        editMarker(1,rows[index].id, rows[index]).then((res) => {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        })
      }
    }

    //取消功能
    function handleCancle(index, rows) {
      rows[index].edit = !rows[index].edit;
      if (rows[index].edit) {
        ElMessageBox.confirm("确认要删除吗？", "警告", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            console.log(rows[index].id);
            delMarker(1,rows[index].id).then((res) => {
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

    //搜索历史地震
    function searchHis() {
      let num = 0;
      hisTotal = [];
      total.value = 0;
      hisEarth.value = [];
      if (selectOper.value == "") {
        selectOper.value = "5";
      }
      searchhis(select.value, selectOper.value, search.value).then((res) => {
        total.value += res.marker.length;
        for (let j = 0; j < res.marker.length; j++) {
          let obj = {
            id: res.marker[j][0],
            EnglishName:res.marker[j][1],
            ChineseName: res.marker[j][2],
            earthTime: res.marker[j][3],
            EpicentralLatitude: res.marker[j][4],
            EpicentralLongitude: res.marker[j][5],
            FocalDepth: res.marker[j][6],
            magnitude: res.marker[j][7],
            StationName: res.marker[j][8],
            StationCode: res.marker[j][9],
            StationLatitude: res.marker[j][10],
            StationLongitude: res.marker[j][11],
            addressCondition: res.marker[j][12],
            recordModel: res.marker[j][13],
            measurePoint: res.marker[j][14],
            recordOrient: res.marker[j][15],
            SamplingInterval: res.marker[j][16],
            duration: res.marker[j][17],
            PGA: res.marker[j][18],
            PGATime: res.marker[j][19],
            edit: false,
          };
          if (num < 12) {
            hisEarth.value.push(obj);
          }
          hisTotal.push(obj);
          num++;
        }
        selectOper.value = "";
      });
    }

    return {
      total,
      pagesize,
      currentPage,
      hisEarth,
      dialogTableVisible,
      urls,
      updateHis,
      handleChange,
      search,
      select,
      selectOper,
      searchHis,
      handleEdit,
      handleCancle,
    };
  },
};
</script>

<style>
html {
  font-size: 1vw;
}
.upHis .el-button {
      width:6.7708rem;
  font-size: 1.041667rem;
  font-weight: bold;
}
.tableData {
  border: 0.052083rem solid #dcdfe6;
  margin: 0.260417rem 1.302083rem;
}
.el-pagination {
  text-align: center;
  margin-top: 1.302083rem;
}
.el-table {
  font-size: 0.885417rem;
  max-height: 39.53125rem;
}
.el-table tr {
  height: 3.4375rem;
}
.tableData .el-table .cell {
  text-align: center;
  text-overflow: clip;
}
.upHis {
  padding: 1.041667rem 1.302083rem;
}
.hismanage table {
  font-size: 1.041667rem;
}
.fenye .el-pager li {
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
.tableData .el-pagination__total {
  border: 0.052083rem solid gray;
  font-size: 1.145833rem !important;
  background: #f4f4f5;
  margin-left: 2.3438rem;
}
/* .tableData .allTotal {
  position: fixed;
  left: 41.666667rem;
  bottom: 2.604167rem;
} */
.tableData .allTotal {
  position: fixed;
  right: 26.041667rem;
  bottom: 2.604167rem;
  border: 0.052083rem solid gray;
  padding: 0.15625rem;
  font-size: 1.041667rem;
  background: #f4f4f5;
}
.hismanage .el-select .el-input__inner {
  font-size: 0.9375rem;
  font-weight: bold;
}
.hismanage .el-input--medium .el-input__inner {
  font-size: 0.885417rem;
  font-weight: bold;
  height: 2.083333rem;
}
.el-button{
  font-size: .9375rem !important;
  font-weight: bold !important;
}
.hisbtn{
    width: 3.2083rem !important;
}
.fontBtn{
    height: 2.0833rem !important;
}
</style>
