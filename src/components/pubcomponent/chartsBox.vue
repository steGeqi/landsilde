<template>
    <div v-bind:id="id" :class="flexclass" class="flexbleChart">
        <div v-show="show">
            <div class="tool">
              
                    <el-button class="button-groups" ghost @click="switchCard">
                        <el-icon style="vertical-align: middle">
                            <Minus v-if="open" />
                            <Plus v-else />
                        </el-icon>
                    </el-button>
        
            </div>

            <div class="contents" v-show="open">
                <div class="huapo" v-if="SwitchEarthquakes !== 7">
                    <el-carousel height="18.2292rem">
                        <el-carousel-item id="average" class="averchat">
                        </el-carousel-item>
                        <el-carousel-item id="FC" class="averchat">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="hisEarthChart" v-else>
                    <div id="hisEarthChart" class="hischat"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import * as echarts from 'echarts'
import { mapState } from 'vuex'
import { getHuapoMarker } from '../../api/huapo'
import { getHistoryEq } from '../../api/history'
import { Minus, Plus } from '@element-plus/icons-vue'
export default {
    props: {
        id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            data1: 0,
            data2: 0,
            data3: 0,
            data4: 0,
            data5: 0,
            data6: 0,
            data7: 0,
            fcData1: 0,
            fcData2: 0,
            fcData3: 0,
            fcData4: 0,
            fcData5: 0,
            fcData6: 0,
            fcData7: 0,
            flexclass: null,
            buttonSize: 'small',
            show: true,
            open: true,
            style: {
                width: this.width,
            },
            huapoDataList: {
                hongdong: '',
                huaxian: '',
                tianshui: 0,
                linfen: '',
                tongwei: '',
                haiyuan: '',
                gulang: '',
            },
            earthData: [],
        }
    },
    components: {
        Minus,
        Plus,
    },
    watch: {
        SwitchEarthquakes(val, oldVal) {
            console.log(val)
            this.changeNum()
            if (val === 7) {
                console.log('lalalallalal')
                this.$nextTick(() => {
                //   this.hischart();
                this.earthyearData().then((res) => {
                    this.hischart()
                })
                });
                // this.initEcharts()
            } else {
                this.$nextTick(() => {
                    this.averData()
                    this.fcData()
                })
            }
        },
    },
    computed: {
        ...mapState(['SwitchEarthquakes']),
    },
    created() {},
    mounted() {
        console.log('图表mounted')

        if (this.SwitchEarthquakes == 7) {
            this.initEcharts()
        } else {
            this.getData().then((res) => {
                this.averData()
                this.fcData()
            })
        }
    },
    methods: {
        switchCard() {
            this.open = !this.open
            if (this.open) {
                this.style.width = this.width
            } else {
                this.style.width = '80px'
            }
        },
        //参数变化
        changeNum() {
            console.log(this.SwitchEarthquakes)
            if (this.SwitchEarthquakes != -1) {
                this.show = true
            }
        },
        //拿数据
        async getData() {
            let hongdongData = []
            let huaxianData = []
            let tianshuiData = []
            let linfenData = []
            let tongweiData = []
            let haiyuanData = []
            let gulangData = []
            let hongdongDataAll = await getHuapoMarker(-1)
            console.log(hongdongDataAll.marker)
            hongdongDataAll.marker.forEach((e) => {
                if (e[18] == '0') {
                    hongdongData.push(e)
                } else if (e[18] == '1') {
                    huaxianData.push(e)
                } else if (e[18] == '2') {
                    tianshuiData.push(e)
                } else if (e[18] == '3') {
                    linfenData.push(e)
                } else if (e[18] == '4') {
                    tongweiData.push(e)
                } else if (e[18] == '5') {
                    haiyuanData.push(e)
                } else if (e[18] == '6') {
                    gulangData.push(e)

                }
            })
            console.log(tianshuiData);
            this.data1 = this.handleAver(hongdongData.length, hongdongData)
            this.fcData1 = this.fc(hongdongData)
            console.log(this.fcData1)

            this.data2 = this.handleAver(huaxianData.length, huaxianData)
            this.fcData2 = this.fc(huaxianData)
            console.log(this.fcData2)

            this.data3 = this.handleAver(tianshuiData.length, tianshuiData)
            this.fcData3 = this.fc(tianshuiData)
            console.log(this.fcData3)

            this.data4 = this.handleAver(linfenData.length, linfenData)
            this.fcData4 = this.fc(linfenData)
            console.log(this.fcData4)

            this.data5 = this.handleAver(tongweiData.length, tongweiData)
            this.fcData5 = this.fc(tongweiData)
            console.log(this.fcData5)

            this.data6 = this.handleAver(haiyuanData.length, haiyuanData)
            this.fcData6 = this.fc(haiyuanData)
            console.log(this.fcData6)

            this.data7 = this.handleAver(gulangData.length, gulangData)
            this.fcData7 = this.fc(gulangData)
            console.log(this.fcData7)
        },
        //处理均值数据
        handleAver(length, name) {
            let data = []
            let sum = 0
            for (let i = 0; i < length; i++) {
                data[i] = parseInt(name[i][7])
                sum += data[i]
            }
            let averdata = (sum / length).toFixed(2)
            return averdata
        },
        //处理方差数据
        fc(arr) {
            let sum = 0
            let s = 0
            for (let i = 0; i < arr.length; i++) {
                sum += parseInt(arr[i][7])
            }
            let ave = sum / arr.length
            for (let j = 0; j < arr.length; j++) {
                s += Math.pow(ave - parseInt(arr[j][7]), 2)
            }
            return Math.sqrt(s / arr.length, 2).toFixed(2)
        },
        //  获取历史地震数据
        formatDate(date) {
            date =
                date.toString().substr(0, 4) +
                '-' +
                date.toString().substr(4, 2) +
                '-' +
                date.toString().substr(6, 2)
            return date
        },
        async earthyearData() {
            let eqHistory = await getHistoryEq('his_')
            console.log(eqHistory)
            let earth_date = []
            this.dateArr = []
            let i
            eqHistory.marker.forEach((e) => {
                let date = e[3].toString().substr(0, 4)
                earth_date.push(date)
            })

            for (i = 0; i < earth_date.length; i++) {
                //循环遍历当前数组
                //判断当前数组下标为i的元素是否已经保存到临时数组
                //如果已保存，则跳过，否则将此元素保存到临时数组中
                if (this.dateArr.indexOf(earth_date[i]) == -1) {
                    this.dateArr.push(earth_date[i])
                }
            }
            for (i = 0; i < this.dateArr.length; i++) {
                this.earthData[i] = []
            }
            this.dateArr = this.dateArr.sort()

            eqHistory.marker.forEach((e) => {
                let date = e[3].toString().substr(0, 4)
                e[3] = this.formatDate(e[3])
                this.earthData[this.dateArr.indexOf(date)].push(e)
            })
        },

        // 滑坡宽度方差统计表
        fcData() {
            //当前视口宽度----此处解决rcharts中字体自适应
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
            console.log('dshdjsgjhgfgdsj')
            let myChart = this.$echarts.init(document.getElementById('FC'))
            const data = [
                this.fcData3,
                this.fcData5,
                this.fcData6,
                this.fcData2,
                this.fcData7,
                this.fcData1,
                this.fcData4,
            ]
            const titlename = [
                '天水南',
                '通渭',
                '海原',
                '华县',
                '古浪',
                '洪洞',
                '临汾',
            ]
            const valdata = []
            const option = {
                backgroundColor: '#081028',
                grid: {
                    left: '20%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                },
                xAxis: {
                    show: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff',
                        },
                    },
                    //设置title 刻度标签样式
                    axisLabel: {
                        show: true,
                        color: '#fff',
                        fontSize: nowSize(18),
                    },
                    //设置底部轴线样式
                    axisLine: {
                        show: true,

                        lineStyle: {
                            color: '#28b1ff',
                        },
                    },
                    //设置网格线颜色
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['rgba(160, 192, 252, 0.2)'],
                            width: 1,
                            type: [5, 8],
                            dashOffset: 2,
                        },
                    },
                },
                title: {
                    text: '滑坡地区宽度方差统计表',
                    x: 'center',
                    y: 'top',
                    textStyle: {
                        fontSize: nowSize(18),
                        color: '#fff',
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b} : {c}',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                yAxis: [
                    //左侧Y轴设置
                    {
                        //数据
                        data: titlename,
                        //显示
                        show: true,
                        //是否是反向坐标轴
                        inverse: false,
                        //轴线样式
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#28b1ff',
                                width: 1,
                            },
                        },
                        //设置网格线
                        splitLine: {
                            show: false,
                        },
                        //坐标轴刻度
                        axisTick: {
                            show: false,
                        },
                        //设置title 刻度标签样式
                        axisLabel: {
                            fontSize: nowSize(18),
                            color: '#fff',
                        },
                    },
                    //右侧侧Y轴设置
                    {
                        show: false,
                        inverse: false,
                        data: valdata,
                        axisLabel: {
                            textStyle: {
                                fontSize: nowSize(12),
                                color: 'red',
                            },
                        },
                        axisLine: {
                            show: true,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: data,
                        barWidth: nowSize(10),
                        itemStyle: {
                            normal: {
                                barBorderRadius: nowSize(10),
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: '#28b1ff',
                                        },
                                        {
                                            offset: 1,
                                            color: '#00fcff',
                                        },
                                    ]
                                ),
                            },
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'inside',
                                formatter: '{c}%',
                            },
                        },
                    },
                    {
                        name: '框',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '-100%',
                        barWidth: nowSize(10),
                        itemStyle: {
                            normal: {
                                color: 'rgba(160, 192, 252, 0.1)',
                                barBorderRadius: nowSize(15),
                            },
                        },
                    },
                ],
            }
            myChart.clear()
            myChart.setOption(option)
            // 图表自适应盒子
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        // 滑坡宽度均值统计表
        averData() {
            //当前视口宽度----此处解决rcharts中字体自适应
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
            let myChart = this.$echarts.init(document.getElementById('average'))
            let yList = [
                this.data3,
                this.data5,
                this.data6,
                this.data2,
                this.data7,
                this.data1,
                this.data4,
            ]
            let xData = ['天水南', '通渭', '海原', '华县', '古浪', '洪洞', '临汾']
            let color = [
                '#CC1CAA',
                '#8D67FF',
                '#00FFFF',
                '#48DE13',
                '#FFC516',
                '#DC3E14',
                '#8E16F8',
            ]
            let dom = nowSize(200)
            let barWidth = dom / 20
            let colors = []
            for (let i = 0; i < 7; i++) {
                colors.push({
                    type: 'linear',
                    x: 0,
                    x2: 1,
                    y: 0,
                    y2: 0,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#73fcff', // 最左边
                        },
                        {
                            offset: 0.5,
                            color: '#86eef1', // 左边的右边 颜色
                        },
                        {
                            offset: 0.5,
                            color: '#5ad6d9', // 右边的左边 颜色
                        },
                        {
                            offset: 1,
                            color: '#3dc8ca',
                        },
                        {
                            offset: 0,
                            color: '#73fcff', // 最左边
                        },
                        {
                            offset: 0.5,
                            color: '#86eef1', // 左边的右边 颜色
                        },
                        {
                            offset: 0.5,
                            color: '#5ad6d9', // 右边的左边 颜色
                        },
                    ],
                })
            }
            const option = {
                backgroundColor: '#081028',
                //提示框
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b} : {c}',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                /**区域位置*/
                grid: {
                    left: '20%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                },
                title: {
                    text: '滑坡地区宽度均值统计表',
                    x: 'center',
                    y: 'top',
                    textStyle: {
                        fontSize: nowSize(18),
                        color: '#fff',
                    },
                },
                //X轴
                xAxis: {
                    data: xData,
                    type: 'category',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,1)',
                            shadowColor: 'rgba(255,255,255,1)',
                            shadowOffsetX: '10',
                        },
                        symbol: ['none', 'arrow'],
                        symbolOffset: [0, 15],
                    },
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        margin: nowSize(10),
                        fontSize: nowSize(15),
                    },
                },
                yAxis: {
                    name: '米',
                    nameTextStyle: {
                        // 坐标轴名称样式
                        color: '#fff',
                        padding: [10, 0, 0, -50],
                        fontSize: nowSize(18),
                    },
                    show: true,
                    splitNumber: 4,
                    axisLine: {
                        show: true,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: '#075858',
                        },
                    },
                    axisLabel: {
                        color: '#FFFFFF',
                        margin: nowSize(10),
                        fontSize: nowSize(15),
                    },
                },

                series: [
                    {
                        type: 'bar',
                        barWidth: barWidth,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colors[params.dataIndex % 7]
                                },
                            },
                        },
                        label: {
                            show: false,
                            position: [barWidth / 2, -(barWidth + 20)],
                            color: '#ffffff',
                            fontSize: nowSize(14),
                            fontStyle: 'bold',
                            align: 'center',
                        },
                        data: yList,
                    },
                    {
                        z: 2,
                        type: 'pictorialBar',
                        data: yList,
                        symbol: 'diamond',
                        symbolOffset: [0, '50%'],
                        symbolSize: [barWidth, barWidth * 0.5],
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colors[params.dataIndex % 7]
                                },
                            },
                        },
                    },
                    {
                        z: 3,
                        type: 'pictorialBar',
                        symbolPosition: 'end',
                        data: yList,
                        symbol: 'diamond',
                        symbolOffset: [0, '-50%'],
                        symbolSize: [barWidth, barWidth * 0.5],
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                color: function (params) {
                                    return colors[params.dataIndex % 7]
                                        .colorStops[0].color
                                },
                            },
                        },
                    },
                ],
            }
            myChart.clear()
            myChart.setOption(option)
            // 图表自适应盒子
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        //历史地震数据表
        hischart() {
            //当前视口宽度----此处解决rcharts中字体自适应
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
            let myChart = this.$echarts.init(
                document.getElementById('hisEarthChart')
            )
            console.log(this.earthData[0].length)

            const echartData = [
                { name: '2001', value: this.earthData[0].length },
                { name: '2003', value: this.earthData[1].length },
                { name: '2004', value: this.earthData[2].length },
                { name: '2007', value: this.earthData[3].length },
                { name: '2008', value: this.earthData[4].length },
                { name: '2009', value: this.earthData[5].length },
                { name: '2010', value: this.earthData[6].length },
                { name: '2011', value: this.earthData[7].length },
                { name: '2012', value: this.earthData[8].length },
                { name: '2013', value: this.earthData[9].length },
                { name: '2014', value: this.earthData[10].length },
                { name: '2015', value: this.earthData[11].length },
                { name: '2016', value: this.earthData[12].length },
                { name: '2017', value: this.earthData[13].length },
                { name: '2018', value: this.earthData[14].length },
            ] // 获取数据
            const img =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAA6UlEQVQ4T+WTPRKCMBSE9wU7tEWQQk/k3yFo7LSms4VDcAHGwhNoZ+kRFOQMFsZBBtQh4THOUJk2mbfv290QOj7U8Xz8kYCzT8fijhCAJQxaX6bOqY29rSxy49QDUQCgXw0l6Sez0ZYTaRQotqYQhKVykJRHjkYr4O4yD1LmlpjclmigqQnY8W1iAIF2a52ahuZLYBhlZm/wiECktoRBIeAA0Oo6t8/lU6VFylA5n6T0k0U9dG0GVS0ZmnxrEtjoasvWtKARASDfFS1pNFt/wrIC+eMaTYt6Nmags/tFI2C1+WA/CXA5q+6fT9VPEc2oIfcAAAAASUVORK5CYII=' //小
            const xData = echartData.map((item, index) => {
                return {
                    value: item.name,
                }
            })
            const yData = echartData.map((item, index) => {
                return {
                    value: item.value,
                }
            })

            const barWidth = nowSize(15)
            const option = {
                toolbox: {
                    show: true,
                    feature: {
                        // saveAsImage: { show: true },
                        myFull: {
                            textStyle: { fontSize: nowSize(18) },

                            show: true,
                        },
                    },
                    itemSize: nowSize(30),
                    top: nowSize(10),
                    right: nowSize(10),
                },
                title: {
                    text: '黄土高原2001-2018年地震信息统计表',
                    x: '80px',
                    y: 'top',
                    textStyle: {
                        fontSize: nowSize(17),
                        color: 'white',
                    },
                },
                //提示框
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b} : {c}',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                /**区域位置*/
                grid: {
                    left: nowSize(20),
                    right: nowSize(20),
                    top: nowSize(28),
                    bottom: nowSize(10),
                    containLabel: true,
                },

                xAxis: {
                    nameTextStyle: {
                        color: '#bac3d4',
                    },

                    data: xData,
                    show: true,
                    type: 'category',
                    axisLabel: {
                        interval: 3,
                        // rotate: 40,
                        fontSize: nowSize(15),
                        color: '#fff',
                    },
                    axisLine: {
                        show: true,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    nameTextStyle: {
                        // 坐标轴名称样式
                        color: '#fff',
                        padding: [0, 0, 0, -30],
                        fontSize: nowSize(18),
                    },
                    name: '年份',
                },
                yAxis: {
                    nameTextStyle: {
                        // 坐标轴名称样式
                        color: '#fff',
                        padding: [0, 0, -14, 0],
                        fontSize: nowSize(20),
                    },
                    type: 'value',
                    show: true,
                    splitNumber: nowSize(8),
                    axisLine: {
                        show: true,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#e7edf8',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        color: '#fff',
                        fontSize: nowSize(12),
                    },
                    name: '次数',
                },
                series: [
                    {
                        type: 'bar',
                        barWidth: barWidth,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        // {
                                        //     offset: 0,
                                        //     color: 'rgba(28, 216, 255, 0.05)',
                                        // },
                                        {
                                            offset: 1,
                                            color: 'rgba(27, 181, 239, 0.82)',
                                        },
                                    ]
                                ),
                            },
                        },
                        data: yData,
                    },
                   
                ],
            }
            //  防止多次渲染图表重叠情况
            myChart.clear()

            myChart.setOption(option)

            // 图表自适应盒子
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        //dom加载
        // initEcharts() {
        //   // 新建一个promise对象
        //   let newPromise = new Promise((resolve) => {
        //     resolve();
        //   });
        //   //然后异步执行echarts的初始化函数
        //   newPromise.then(() => {
        //     console.log("dom");
        //     //	此dom为echarts图标展示dom
        //     this.hischart();
        //   });
        // },

        //  检查dom是否执行完成
        initEcharts() {
            //  声明定时器
            var timer = null
            let dom = document.getElementById('hisEarthChart')
            console.log(dom)
            if (dom) {
                console.log('dom--------------------------------')
                //  执行dom加载完成后的操作，例如echart的初始化操作
                this.earthyearData().then((res) => {
                    this.hischart()
                })

                //  清除定时器
                if (!timer) {
                    clearTimeout(timer)
                }
            } else {
                timer = setTimeout(this.initEcharts, 0)
            }
        },
    },
}
</script>

<style>
html{
  font-size: 1vw;
}
.flexbleChart {
  position: relative;
  float: left;
  /*z-index: 999;*/
  background-image: linear-gradient(-180deg, #080810cc 0%, #1b2132d4 100%);
  border-radius: .423177rem;
}
.flexbleChart .tool::after {
    position: absolute;
    display: block;
    content: '';
    clear: both;
}
.flexbleChart .tool .ivu-btn-group {
    float: right;
}
.flexbleChart .tool .el-button {
  background: transparent;
  padding: .104167rem;
}
.flexbleChart .huapo {
  overflow: hidden;
  height: 18.229167rem;
  width: 20.3125rem;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #ad7432;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
.averchat {
  overflow-y: hidden;
  /* margin-top: .520833rem; */
  height: 18.229167rem;
  width: 20.3125rem;
}
.hischat {
  overflow-y: hidden;
  margin-top: .520833rem;
  height: 19.270833rem;
  width: 22.395833rem;
}
.button-groups{
position: absolute; left: 0; z-index: 999; width:1.3042rem !important;
}
</style>
