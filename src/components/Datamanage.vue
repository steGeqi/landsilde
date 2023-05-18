<template>
  <div class="dataManage">
    <div class="upFile">
      <el-row :gutter="24">
        <el-col :span="2.5"
          ><el-button size="large" @click="dialogTableVisible = true" class="fontBtn"
            >上传新滑坡</el-button
          ></el-col
        >
        <el-col :span="13"
          ><el-button size="large" @click="outExcel" class="fontBtn"
            >导出excel文件</el-button
          ></el-col
        >
        <el-col :span="2">
          <el-select v-model="select" placeholder="字段" style="width: 11.458333rem" size="large">
            <el-option label="滑坡名称" value="0"></el-option>
            <el-option label="平面形态" value="1"></el-option>
            <el-option label="滑体长度" value="2"></el-option>
            <el-option label="滑体宽度" value="3"></el-option>
            <el-option label="滑坡覆盖范围" value="4"></el-option>
            <el-option label="主滑方向" value="5"></el-option>
            <el-option label="滑坡最大水平距离" value="6"></el-option>
            <el-option label="滑坡最大垂直距离" value="7"></el-option>
            <el-option label="原始斜坡坡向" value="8"></el-option>
            <el-option label="原始斜坡坡脚" value="9"></el-option>
            <el-option label="震中距" value="10"></el-option>
            <el-option label="现场照片" value="11"></el-option>
            <!-- <el-option label="相对震中的方位角" value="11"></el-option> -->
          </el-select>
        </el-col>
        <el-col
          :span="1"
          v-show="select !== '1' && select !== '0' && select !== ''"
        >
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
        <el-col :span="1.5"
          ><el-button size="large" @click="searchHuapo" class="fontBtn">搜索</el-button></el-col
        >
        <el-col
          :span="1"
          v-show="select !== '1' && select !== '0' && select !== ''"
          ><el-button size="large" @click="sortData">{{
            sortNum == 1 ? "升序" : "降序"
          }}</el-button></el-col
        >
      </el-row>
    </div>

    <div class="tableData">
      <el-table
      class="tableHei"
        :data="huapo"
        style="width: 100%; font-size: .885417rem"
        max-height="50.208333rem"
        @selection-change="handleSelectionChange"
         :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{textAlign: 'center'}"
        id="my-table"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" :index="indexMethod" width="100">
          <template #header>
            <el-checkbox
              v-model="checkCoAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="codeNum" label="序号" width="120">
          <template #header>
            <el-checkbox
              v-model="checkCo0"
              label="序号"
              size="medium"
            ></el-checkbox>
          </template>
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.codeNum }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="medium" v-model="scope.row.codeNum"></el-input>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="fieldNumber" label="野外编号" width="130">
          <template #header>
            <el-checkbox
              v-model="checkCo1"
              label="野外编号"
              size="large"
            ></el-checkbox>
          </template>
          <template #default="scope">
            <div v-show="!scope.row.edit">
              {{ scope.row.fieldNumber }}
            </div>
            <div v-show="scope.row.edit">
              <el-input size="large" v-model="scope.row.fieldNumber"></el-input>
            </div>
          </template>
        </el-table-column> -->
                <el-table-column
                    prop="LandslideName"
                    label="滑坡名称"
                   width="520"

                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo1"
                            label="滑坡名称"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.LandslideName }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.LandslideName"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="经度（°）" width="150">
                    <template #header>
                        <el-checkbox
                            v-model="checkCo2"
                            label="经度（°）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.longitude }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.longitude"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="latitude" label="纬度（°）" width="150">
                    <template #header>
                        <el-checkbox
                            v-model="checkCo3"
                            label="纬度（°）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.latitude }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.latitude"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="earthIntensity"
                    label="地震烈度"
                    width="120"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo4"
                            label="烈度"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.earthIntensity }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.earthIntensity"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="slideLength"
                    label="滑体长度（m）"
                    width="200"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo5"
                            label="滑体长度（m）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.slideLength }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.slideLength"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="滑体宽度（m）" width="200">
                    <template #header>
                        <el-checkbox
                            v-model="checkCo6"
                            label="滑体宽度（m）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ parseInt(scope.row.slideWidth) }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.slideWidth"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="滑体覆盖范围（m2）" width="250">
                    <template #header>
                        <el-checkbox
                            v-model="checkCo7"
                            label="滑体覆盖范围（㎡）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.slideCoverage }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.slideCoverage"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mainslideDir"
                    label="主滑方向（°）"
                    width="200"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo8"
                            label="主滑方向（°）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.mainslideDir }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.mainslideDir"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lansideMaxHorizon"
                    label="滑坡最大水平距离（m）"
                    width="300"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo9"
                            label="滑坡最大水平距离（m）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.lansideMaxHorizon }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.lansideMaxHorizon"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lansideMaxVertical"
                    label="滑坡最大垂直距离（m）"
                    width="300"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo10"
                            label="滑坡最大垂直距离（m）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.lansideMaxVertical }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.lansideMaxVertical"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="OriginalSlopeAspect"
                    label="原始斜坡坡向（°）"
                    width="200"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo11"
                            label="原始斜坡坡向（°）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.OriginalSlopeAspect }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.OriginalSlopeAspect"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="OriginalSlopeAngle"
                    label="原始斜坡坡角（°）"
                    width="200"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo12"
                            label="原始斜坡坡角（°）"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.OriginalSlopeAngle }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.OriginalSlopeAngle"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="LandslidePlane"
                    label="滑坡平面形态"
                    width="170"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo13"
                            label="滑坡平面形态"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.LandslidePlane }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.LandslidePlane"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="EpicentralDistance"
                    label="震中距"
                    width="150"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo14"
                            label="震中距(km)"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.EpicentralDistance }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.EpicentralDistance"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="RelativeEpicenAngle"
                    label="相对震中的方位角"
                    width="200"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo15"
                            label="相对震中的方位角"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.RelativeEpicenAngle }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.RelativeEpicenAngle"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="FaultDistance"
                    label="断层距"
                    width="150"
                >
                    <template #header>
                        <el-checkbox
                            v-model="checkCo16"
                            label="断层距(km)"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.FaultDistance }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.FaultDistance"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="isPhoto" width="150">
                    <template #header>
                        <el-checkbox
                            v-model="checkCo17"
                            label="现场图片数"
                            size="large"
                        ></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="level" width="150">
                    <template #header>
                        <el-checkbox
                            v-model="checkCo18"
                            label="质量等级"
                            size="large"
                        ></el-checkbox>
                    </template>
                    <template #default="scope">
                        <div v-show="!scope.row.edit">
                            {{ scope.row.level }}
                        </div>
                        <div v-show="scope.row.edit">
                            <el-input
                                size="large"
                                v-model="scope.row.level"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template #default="scope">
                        <el-button
                        class="huapobtn"
                            size="large"
                            @click.prevent="handleEdit(scope.$index, huapo)"
                            >{{ scope.row.edit ? '提交' : '编辑' }}
                        </el-button>
                        <el-button
                        class="huapobtn"
                            size="large"
                            @click.prevent="handleCancle(scope.$index, huapo)"
                            >{{ scope.row.edit ? '取消' : '删除' }}
                        </el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="Operations">
          <template #default>
            <el-button size="small" @click="dialogTableVisible = true"
              >相关图片</el-button
            >
          </template>
        </el-table-column> -->
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
          <div class="allTotal">总数：{{ total }}</div>
        </el-col>
      </el-row>

            <el-dialog v-model="dialogTableVisible" title="提交操作">
                <!-- <el-steps :active="active" finish-status="success" align-center>
          <el-step title="提交滑坡点excel文件"></el-step>
          <el-step title="提交滑坡线json文件"></el-step>
          <el-step title="提交滑坡面json文件"></el-step>
        </el-steps> -->
        <el-radio-group v-model="earthType">
          <el-radio :label="0">洪洞地震</el-radio>
          <el-radio :label="1">华县地震</el-radio>
          <el-radio :label="2">天水地震</el-radio>
          <el-radio :label="3">临汾地震</el-radio>
          <el-radio :label="4">通渭地震</el-radio>
          <el-radio :label="5">海原地震</el-radio>
          <el-radio :label="6">古浪地震</el-radio>
        </el-radio-group>
        <div class="tanchu">
          <!-- <el-radio-group v-model="huapoType">
            <el-radio :label="0" border style="font-size: .9375rem"
              >滑坡点</el-radio
            >
            <el-radio :label="1" border>滑坡线</el-radio>
            <el-radio :label="2" border>滑坡面</el-radio>
          </el-radio-group> -->
          <el-upload
            ref="upload"
            class="upFile"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            :on-change="handleChange"
            :on-success="handleSuccess"
          >
            <template #trigger>
              <el-button  class="choosebtn" size="large" type="primary"
                >选择滑坡点excel文件</el-button
              >
            </template>
            <el-button
            class="huapobtn"
              style="margin-left: .520833rem"
              size="small"
              type="success"
              @click="submitUpload"
              >上传</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                上传滑坡点的excel表格,一次只能上传一个excel表格
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

        <!-- <div>
          <el-image
            style="width: 5.208333rem; height: 5.208333rem"
            src="@/assets/huapoImg/left.jpg"
            fit="fill"
          ></el-image>
        </div> -->
      </el-dialog>
    </div>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from 'vue'
import {
    getHuapoMarker,
    searchhuapo,
    editMarker,
    delMarker,
} from '@/api/huapo.js'
import { upExcel, upJson } from '@/api/upFile.js'
import { getCurrentInstance } from 'vue'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { inject } from 'vue'
import excelImg from "@/assets/excel.png";
export default {
    // components: {
    //     Search,
    // },
    setup() {
        
        const reload = inject('reload') //注入刷新事件,这里括号中的参数要对应上前面provide中的第一个参数
        function refRoad() {
            reload()
        }
        let sortNum = ref(1)
        let data = reactive([])
        let search = ref('')
        let originCode = ref('')
        const select = ref('0')
        const selectOper = ref('')
        const state = reactive({
            checkAll: false,
            isIndeterminate: true,
        })
        const isEdit = ref(false)
        const checkCo0 = ref(false)
        const checkCo1 = ref(false)
        const checkCo2 = ref(false)
        const checkCo3 = ref(false)
        const checkCo4 = ref(false)
        const checkCo5 = ref(false)
        const checkCo6 = ref(false)
        const checkCo7 = ref(false)
        const checkCo8 = ref(false)
        const checkCo9 = ref(false)
        const checkCo10 = ref(false)
        const checkCo11 = ref(false)
        const checkCo12 = ref(false)
        const checkCo13 = ref(false)
        const checkCo14 = ref(false)
        const checkCo15 = ref(false)
        const checkCo16 = ref(false)
        const checkCo17 = ref(false)
        const checkCo18 = ref(false)
        const checkCoAll = ref(false)
        const input2 = ref('')
        let pagesize = ref(12)
        const { proxy } = getCurrentInstance()
        const currentPage = ref(1)
        const dialogTableVisible = ref(false)
        let obj = {
            codeNum: '',
            // fieldNumber: "",
            LandslideName: '',
            longitude: '',
            latitude: '',
            earthIntensity: '',
            slideLength: '',
            slideWidth: '',
            slideCoverage: '',
            mainslideDir: '',
            lansideMaxHorizon: '',
            lansideMaxVertical: '',
            OriginalSlopeAspect: '',
            OriginalSlopeAngle: '',
            LandslidePlane: '',
            EpicentralDistance: '',
            RelativeEpicenAngle: '',
            FaultDistance: '',
        }
        let earthType = ref(3)
        let huapoType = ref(0)
        const upload = ref(null)
        let fileInfo = {}
        let fileListInfo = []
        let upUrl = ref('')
        const route = useRoute()
        let tableData = ref([])
        function changeData() {}
        function deleteData() {}
        let huapoTotal = reactive([])
        let total = ref(0)
        let huapo = ref([])
       let urls = ref([excelImg]);
        watch(
            currentPage,
            (newVal, oldVal) => {
                console.log(newVal, oldVal)
                if (oldVal === undefined) {
                    handleData()
                } else {
                    huapo.value = []  
                    for (let i = (newVal - 1) * 12; i < newVal * 12; i++) {
                        // console.log(huapoTotal[i]);
                        if (huapoTotal[i] !== undefined) {
                            huapo.value.push(huapoTotal[i])
                        }
                    }

                    // console.log(huapo.value);
                }
            },
            { immediate: true }
        )
        watch(search, (newVal, oldVal) => {
            console.log(newVal)
            if (newVal === '') {
                handleData()
            }
        })
        watch(checkCoAll, (newVal, oldVal) => {
            if (checkCoAll.value == true) {
            }
        })
        // onBeforeMount(()=>{
        // 		handleData();
        // 	})
        onMounted(() => {
            console.log(proxy)
        })

        const handleCheckAllChange = (val) => {
            state.isIndeterminate = false
            if (checkCoAll.value == true) {
                checkCo0.value = true
                checkCo1.value = true
                checkCo2.value = true
                checkCo3.value = true
                checkCo4.value = true
                checkCo5.value = true
                checkCo6.value = true
                checkCo7.value = true
                checkCo8.value = true
                checkCo9.value = true
                checkCo10.value = true
                checkCo11.value = true
                checkCo12.value = true
                checkCo13.value = true
                checkCo14.value = true
                checkCo15.value = true
                checkCo16.value = true
                checkCo17.value = true
                checkCo18.value = true
            } else {
                checkCo0.value = false
                checkCo1.value = false
                checkCo2.value = false
                checkCo3.value = false
                checkCo4.value = false
                checkCo5.value = false
                checkCo6.value = false
                checkCo7.value = false
                checkCo8.value = false
                checkCo9.value = false
                checkCo10.value = false
                checkCo11.value = false
                checkCo12.value = false
                checkCo13.value = false
                checkCo14.value = false
                checkCo15.value = false
                checkCo16.value = false
                checkCo17.value = false
                checkCo18.value = false
            }
        }

        function handleSelectionChange(a) {
            console.log(a)
            data = a
        }

        //编辑功能
        function handleEdit(index, rows) {
            console.log(rows[index].edit)
            isEdit.value = !isEdit.value
            if (isEdit.value == true) {
                rows[index].edit = true
                originCode.value = rows[index].codeNum
                console.log('修改')
            } else {
                console.log(originCode.value)
                rows[index].edit = false
                console.log(rows[index])
                editMarker(0,originCode.value, rows[index]).then((res) => {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                })
            }
        }

        //取消功能
        function handleCancle(index, rows) {
            isEdit.value = !isEdit.value
            if (isEdit.value == true) {
                console.log('删除')
                ElMessageBox.confirm('确认要删除吗？', '警告', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                })
                    .then(() => {
                        delMarker(0,rows[index].codeNum).then((res) => {
                            ElMessage({
                                type: 'success',
                                message: '删除成功',
                            })
                            refRoad()
                        })
                    })
                    .catch(() => {
                        console.log('取消')
                    })
            } else {
                rows[index].edit = false
                console.log('取消')
            }
        }

        function sortData() {
            let arr = [
                'LandslideName',
                'LandslidePlane',
                'slideLength',
                'slideWidth',
                'slideCoverage',
                'mainslideDir',
                'lansideMaxHorizon',
                'lansideMaxVertical',
                'OriginalSlopeAspect',
                'OriginalSlopeAngle',
                'EpicentralDistance',
                'RelativeEpicenAngle',
            ]
            let name = arr[parseInt(select.value)]
            huapo.value = []
            console.log(parseFloat(huapoTotal[0][name]))
            let i, j, temp
            if (sortNum.value === 1) {
                //升序
                for (i = 0; i < huapoTotal.length - 1; i++) {
                    for (j = 0; j < huapoTotal.length - i - 1; j++) {
                        if (
                            parseFloat(huapoTotal[j][name]) >
                            parseFloat(huapoTotal[j + 1][name])
                        ) {
                            temp = huapoTotal[j]
                            huapoTotal[j] = huapoTotal[j + 1]
                            huapoTotal[j + 1] = temp
                        }
                    }
                }
                sortNum.value -= 1
            } else {
                //降序
                huapoTotal.reverse()
                sortNum.value += 1
            }
            for (i = 0; i < 12; i++) {
                huapo.value.push(huapoTotal[i])
            }
            console.log(huapo.value)
        }

        function outExcel() {
            let arry = []
            let ziduan = []
            let i, j
            // let arr = ["codeNum","fieldNumber","LandslideName","longitude","latitude","earthIntensity","slideLength","slideWidth","slideCoverage","mainslideDir","lansideMaxHorizon","lansideMaxVertical","OriginalSlopeAspect","OriginalSlopeAngle","LandslidePlane","EpicentralDistance","RelativeEpicenAngle","FaultDistance"];
            let checkAll = [
                checkCo0.value,
                checkCo1.value,
                checkCo2.value,
                checkCo3.value,
                checkCo4.value,
                checkCo5.value,
                checkCo6.value,
                checkCo7.value,
                checkCo8.value,
                checkCo9.value,
                checkCo10.value,
                checkCo11.value,
                checkCo12.value,
                checkCo13.value,
                checkCo14.value,
                checkCo15.value,
                checkCo16.value,
                checkCo17.value,
                checkCo18.value,
            ]
            let arr = [
                '序号',
                '滑坡名称',
                '经度（°）',
                '纬度（°）',
                '地震烈度',
                '滑坡长度（m）',
                '滑体宽度（m）',
                '滑体覆盖范围（m）',
                '主滑方向（°）',
                '滑坡最大水平距离（m）',
                '滑坡最大垂直距离（m）',
                '原始斜坡坡向（°）',
                '原始斜坡坡角（°）',
                '滑坡平面形态',
                '震中距',
                '相对震中的方位角',
                '断层距',
                '现场照片',
                "质量等级"
            ]
            let englishZidaun = [
                'codeNum',
                // "fieldNumber",
                'LandslideName',
                'longitude',
                'latitude',
                'earthIntensity',
                'slideLength',
                'slideWidth',
                'slideCoverage',
                'mainslideDir',
                'lansideMaxHorizon',
                'lansideMaxVertical',
                'OriginalSlopeAspect',
                'OriginalSlopeAngle',
                'LandslidePlane',
                'EpicentralDistance',
                'RelativeEpicenAngle',
                'FaultDistance',
                'isPhoto',
                "level"
            ]
            let englishIndex = []
            if (checkAll.value === true) {
                arry.push(arr)
                for (i = 0; i < data.length; i++) {
                    let a = [
                        data[i].codeNum,
                        // data[i].fieldNumber,
                        data[i].LandslideName,
                        parseFloat(data[i].longitude).toFixed(3),
                        parseFloat(data[i].latitude).toFixed(3),
                        data[i].earthIntensity,
                        parseInt(data[i].slideLength),
                        parseInt(data[i].slideWidth),
                        parseInt(data[i].slideCoverage),
                        parseInt(data[i].mainslideDir),
                        parseInt(data[i].lansideMaxHorizon),
                        parseInt(data[i].lansideMaxVertical),
                        parseInt(data[i].OriginalSlopeAspect),
                        parseInt(data[i].OriginalSlopeAngle),
                        data[i].LandslidePlane,
                        data[i].EpicentralDistance,
                        parseInt(data[i].RelativeEpicenAngle),
                        data[i].FaultDistance,
                        parseInt(data[i].isPhoto),
                        parseInt(data[i].level)
                    ]
                    arry.push(a)
                }
                console.log(arry)
            } else {
                for (i = 0; i < checkAll.length; i++) {
                    if (checkAll[i] == true) {
                        ziduan.push(arr[i])
                        englishIndex.push(englishZidaun[i])
                    }
                }
                arry.push(ziduan)
                for (i = 0; i < data.length; i++) {
                    let a = []
                    for (j = 0; j < englishIndex.length; j++) {
                        a.push(data[i][englishIndex[j]])
                    }
                    arry.push(a)
                }
                console.log(arry)
            }

            const ws = XLSX.utils.aoa_to_sheet(arry)

            /* generate workbook and add the worksheet */
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

            /* save to file */
            XLSX.writeFile(wb, 'SheetJS.xlsx')
        }

        function searchHuapo() {
            let num = 0
            total.value = 0
            huapoTotal = []
            huapo.value = []
            console.log(huapo.value)
            console.log(select.value)
            console.log(selectOper.value)
            if (selectOper.value == '') {
                selectOper.value = '5'
            }
            searchhuapo(select.value, selectOper.value, search.value).then(
                (res) => {
                    total.value += res.marker.length
                    console.log(res);
                    for (let j = 0; j < res.marker.length; j++) {
                        let obj = {
                            codeNum: res.marker[j][0],
                            // fieldNumber: res.marker[j][1],
                            LandslideName: res.marker[j][2],
                            longitude: parseFloat(res.marker[j][3]).toFixed(3),
                            latitude: parseFloat(res.marker[j][4]).toFixed(3),
                            earthIntensity: res.marker[j][5],
                            slideLength: parseInt(res.marker[j][6]),
                            slideWidth: parseInt(res.marker[j][7]),
                            slideCoverage: parseInt(res.marker[j][8]),
                            mainslideDir: parseInt(res.marker[j][9]),
                            lansideMaxHorizon: parseInt(res.marker[j][10]),
                            lansideMaxVertical: parseInt(res.marker[j][11]),
                            OriginalSlopeAspect: parseInt(res.marker[j][12]),
                            OriginalSlopeAngle: parseInt(res.marker[j][13]),
                            LandslidePlane: res.marker[j][14],
                            EpicentralDistance: res.marker[j][15],
                            RelativeEpicenAngle: parseInt(res.marker[j][16]),
                            FaultDistance: res.marker[j][17],
                            isPhoto: parseInt(res.marker[j][19]),
                            level: parseInt(res.marker[j][20]),
                            edit: false,
                        }
                        if (num < 12) {
                            huapo.value.push(obj)
                        }
                        huapoTotal.push(obj)
                        num++
                    }
                    // console.log(huapoTotal);
                }
            )
        }

        function handleData() {
            let num = 0
            huapoTotal = []
            total.value = 0
            huapo.value = []
            for (let i = 0; i < 7; i++) {
                getHuapoMarker(i).then((res) => {
                    total.value += res.marker.length
                    for (let j = 0; j < res.marker.length; j++) {
                        let obj = {
                            codeNum: res.marker[j][0],
                            // fieldNumber: res.marker[j][1],
                            LandslideName: res.marker[j][2],
                            longitude: parseFloat(res.marker[j][3]).toFixed(3),
                            latitude: parseFloat(res.marker[j][4]).toFixed(3),
                            earthIntensity: res.marker[j][5],
                            slideLength: parseInt(res.marker[j][6]),
                            slideWidth: parseInt(res.marker[j][7]),
                            slideCoverage: parseInt(res.marker[j][8]),
                            mainslideDir: parseInt(res.marker[j][9]),
                            lansideMaxHorizon: parseInt(res.marker[j][10]),
                            lansideMaxVertical: parseInt(res.marker[j][11]),
                            OriginalSlopeAspect: parseInt(res.marker[j][12]),
                            OriginalSlopeAngle: parseInt(res.marker[j][13]),
                            LandslidePlane: res.marker[j][14],
                            EpicentralDistance: res.marker[j][15],
                            RelativeEpicenAngle: parseInt(res.marker[j][16]),
                            FaultDistance: res.marker[j][17],
                            isPhoto: parseInt(res.marker[j][19]),
                            level: parseInt(res.marker[j][20]),
                            edit: false,
                        }
                        if (num < 12) {
                            huapo.value.push(obj)
                        }
                        // obj.fieldNumber = res.marker[j][1];
                        // obj.LandslideName = res.marker[j][2];
                        // obj.longitude = res.marker[j][3].substr(0, 7);
                        // obj.latitude = res.marker[j][4].substr(0, 6);
                        // obj.earthIntensity = res.marker[j][5];
                        // obj.slideLength = res.marker[j][6];
                        // obj.slideWidth = res.marker[j][7];
                        // obj.slideCoverage = res.marker[j][8];
                        // obj.mainslideDir = res.marker[j][9];
                        // obj.lansideMaxHorizon = res.marker[j][10];
                        // obj.lansideMaxVertical = res.marker[j][11];
                        // obj.OriginalSlopeAspect = res.marker[j][12];
                        // obj.OriginalSlopeAngle = res.marker[j][13];
                        // obj.LandslidePlane = res.marker[j][14];
                        // obj.EpicentralDistance = res.marker[j][15].substr(0, 6);
                        // obj.RelativeEpicenAngle = res.marker[j][16].substr(0, 7);
                        // obj.FaultDistance = res.marker[j][17].substr(0, 6);
                        huapoTotal.push(obj)
                        num++
                    }
                })
            }
            return huapoTotal
        }
        function handleChange(file, fileList) {
            console.log(file, fileList)
            fileInfo = file.raw
            fileListInfo = fileList
        }
        function submitUpload() {
            console.log(fileListInfo)
            let data = new FormData()
            data.append('file', fileInfo, fileInfo.name)
            console.log(fileInfo.type)
            if (
                fileInfo.type ==
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                fileInfo.type === 'application/vnd.ms-excel'
            ) {
                upExcel(earthType.value, data).then((res) => {
                    console.log(res)
                    proxy.$refs.upload.submit()
                    ElMessage({
                        message: '上传滑坡成功',
                        type: 'success',
                    })
                    dialogTableVisible.value = false
                })
            } else {
                ElMessage({
                    message: '请按照步骤上传指定文件',
                    type: 'warning',
                })
            }
        }
        function handleSuccess() {
            proxy.$refs.upload.clearFiles()
        }
        function mouseenter(event, index) {
            const jiedian = event.path[0].childNodes[2]
            jiedian.style.display = 'flex'
        }
        function mouseleave(event) {
            const jiedian = event.path[0].childNodes[2]
            jiedian.style.display = 'none'
        }

        return {
            total,
            huapo,
            currentPage,
            huapoTotal,
            dialogTableVisible,
            mouseenter,
            mouseleave,
            changeData,
            deleteData,
            submitUpload,
            upload,
            earthType,
            huapoType,
            upUrl,
            handleChange,
            handleSuccess,
            urls,
            pagesize,
            input2,
            // Search,
            checkCo0,
            checkCo1,
            checkCo2,
            checkCo3,
            checkCo4,
            checkCo5,
            checkCo6,
            checkCo7,
            checkCo8,
            checkCo9,
            checkCo10,
            checkCo11,
            checkCo12,
            checkCo13,
            checkCo14,
            checkCo15,
            checkCo16,
            checkCo17,
            checkCo18,
            searchHuapo,
            search,
            select,
            selectOper,
            handleSelectionChange,
            outExcel,
            sortNum,
            sortData,
            ...toRefs(state),
            handleCheckAllChange,
            handleEdit,
            isEdit,
            handleCancle,
            checkCoAll,
        }
    },
}
</script>

<style>
html{
  font-size: 1vw;
}

.upFile .el-button {
    width:6.7708rem;
  font-size: 1.041667rem;
  font-weight: bold;
}
.tableData {
  max-height: 55.208333rem;
  border: .052083rem solid #dcdfe6;
  margin: .260417rem 1.302083rem;
}
.demo-image__lazy {
  height: 20.833333rem;
  overflow-y: auto;
}
.demo-image__lazy img {
  max-width: 305% !important;
  height: 20.833333rem;
}

.operate {
  position: absolute;
  display: flex;
  top: 0rem;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
}
.operate1 {
  flex: 1;
  background: rgb(157 210 130 / 30%);
  font-size: 5.208333rem;
  text-align: center;
  line-height: 20.833333rem;
  color: azure;
}
.operate2 {
  flex: 1;
  background: rgb(136 51 51 / 30%);
  font-size: 5.208333rem;
  text-align: center;
  line-height: 20.833333rem;
  color: azure;
}
.operate1:hover {
    background: rgb(157 210 130 / 50%);
    cursor: pointer;
}
.operate2:hover {
    background: rgb(136 51 51 / 50%);
    cursor: pointer;
}
.el-pagination {
  text-align: center;
  margin-top: 1.302083rem;
}
.el-table {
  font-size: .885417rem;
  max-height: 39.53125rem;
}
.upFile {
  padding: 1.041667rem 1.302083rem;
}
.tanchu {
    display: flex;
    justify-content: space-around;
}
.el-radio__label {
  font-size: .9375rem !important;
}
.tanchu .el-radio-group {
  margin-top: 1.302083rem;
}
.tanchu span {
  font-size: .9375rem;
}
.shili span {
  font-size: .9375rem;
  font-weight: bold;
}
.fenye {
  position: fixed;
  left: 35.666667rem;
  bottom: 2.604167rem;
}
.tableData .cell {
    text-align: center;
   align-items: center;
}
.el-table .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 1.5625rem;
    padding: 0 .625rem;
}
.tableData .el-checkbox__label {
  font-size: 1.041667rem;
  font-weight: bold;
  color: #979899;
}
.dataManage .el-input--medium .el-input__inner {
  font-size: .885417rem;
  font-weight: bold;
  height: 2.083333rem;
}
.dataManage .el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 1.302083rem;
}
.fenye .el-pager li {
  font-size: 1.354167rem;
  width: 2.083333rem;
  height: 1.458333rem;
  font-weight: 200;
}
.dataManage table {
  font-size: 1.041667rem;
}
.el-table tr{
  height: 3.4375rem;
}
.dataManage .el-select .el-input__inner {
  font-size: 1.041667rem;
  font-weight: bold;
}
.tableData .allTotal {
  position: fixed;
  right: 26.041667rem;
  bottom: 2.604167rem;
  border: .052083rem solid gray;
  padding: .15625rem;
  font-size: 1.041667rem;
  background: #f4f4f5;
}
.tableData .el-pagination__total{
  border: .052083rem solid gray;
    font-size: 1.145833rem !important;
    background: #f4f4f5;
    margin-left: 2.3438rem;
}
.huapobtn{
    width: 3.2083rem !important;
}
.choosebtn{
    width: 9.2083rem !important;
}
.el-button{
  font-size: .9375rem !important;
  font-weight: bold !important;
}
.el-input--large .el-input__inner {
    height: 2.1rem;
    line-height: 2.0833rem;
    padding: 0 .7813rem;
}
.fontBtn{
    height: 2.0833rem !important;
}
</style>
