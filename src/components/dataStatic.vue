<template>
    <div class="datachartbox">
        <div
            id="fullScreen"
            v-bind:class="{ chartse: isFull, hide: !isFull }"
        ></div>
        <div id="landslideChart" class="chart1"></div>
        <div id="earthChart" class="chart2"></div>
        <div id="earthPro" class="chart3"></div>
        <div id="landangle" class="chart4"></div>
        <!-- 排序按钮 -->
        <!-- <div class="sortnum">
      <el-radio
        v-model="radio1"
        label="1"
        class="lowbtn"
        @click="lowTohei"
        border
        ></el-radio
      >
      <el-radio
        v-model="radio1"
        label="2"
        class="heibtn"
        @click="heiTolow"
        border
        ></el-radio
      >

    </div> -->
    </div>
</template>

<script>
import * as echarts from 'echarts'
// import axios from "axios";
import { getHuapoMarker } from '../api/huapo'
import { getHistoryEq, getStationEq } from '../api/history'
import imgIcon from '../assets/biger.png'
export default {
    data() {
        return {
            OriginalSlopeAngle: [],
            heighdata: [],
            sortData: [],
            nameData: [],
            namesort: [],
            heinameData: [],
            lownameData: [],
            earthprodata: [],
            lowData: [],
            heiData: [],
            radio1: '',
            id1: 'landslideChart',
            id2: 'earthChart',
            id3: 'earthPro',
            id4: 'landangle',
            isFull: false, //false为放大，true为缩小
            huapoDataList: {
                hongdong: '',
                huaxian: '',
                tianshui: '',
                linfen: '',
                tongwei: '',
                haiyuan: '',
                gulang: '',
            },
            eqHistory: [],
            divid1: [],
            divid2: [],
            divid3: [],
            divid4: [],
            divid5: [],
            station1: 0,
            station2: 0,
            station3: 0,
            station4: 0,
            station5: 0,
            stationData: [],
            earthData: [],
        }
    },
    mounted() {
        this.huapoData().then((res) => {
            this.earthpro()
        })

        this.earthyearData().then((res) => {
            // this.chart2().then((res) => {});
            this.earthStation()

            this.earthYear()
            this.earthMT()
        })
    },

    methods: {
        async huapoData() {
            let hongdongData = []
            let huaxianData = []
            let tianshuiData = []
            let linfenData = []
            let tongweiData = []
            let haiyuanData = []
            let gulangData = []
            let huapodata = await getHuapoMarker(-1)
            huapodata.marker.forEach((e) => {
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

            this.huapoDataList.hongdong = hongdongData.length

            this.huapoDataList.huaxian = huaxianData.length

            this.huapoDataList.tianshui = tianshuiData.length

            this.huapoDataList.linfen = linfenData.length

            this.huapoDataList.tongwei = tongweiData.length

            this.huapoDataList.haiyuan = haiyuanData.length

            this.huapoDataList.gulang = gulangData.length
            let sortDatas = [7]
            let nameDatas = [7]
            sortDatas[0] = this.huapoDataList.hongdong
            nameDatas[0] = '洪洞地震'
            sortDatas[1] = this.huapoDataList.huaxian
            nameDatas[1] = '华县地震'
            sortDatas[2] = this.huapoDataList.tianshui
            nameDatas[2] = '天水南地震'
            sortDatas[3] = this.huapoDataList.linfen
            nameDatas[3] = '临汾地震'
            sortDatas[4] = this.huapoDataList.tongwei
            nameDatas[4] = '通渭地震'
            sortDatas[5] = this.huapoDataList.haiyuan
            nameDatas[5] = '海原地震'
            sortDatas[6] = this.huapoDataList.gulang
            nameDatas[6] = '古浪地震'

            for (let i = 0; i < sortDatas.length; i++) {
                // 数据排序
                this.earthprodata[i] = sortDatas[i]
                this.sortData[i] = sortDatas[i]
                this.heiData[i] = sortDatas[i]
                //名字数组
                this.nameData[i] = nameDatas[i]
                this.namesort[i] = nameDatas[i]
                this.heinameData[i] = nameDatas[i]
            }
            // console.log(this.earthprodata[0]);
            this.lowData = this.earthprodata.sort(function (a, b) {
                return a - b
            })
            this.lownameData = this.nameData.sort(function (a, b) {
                return a - b
            })
            for (let j = 0; j < this.heiData.length; j++) {
                for (let k = 0; k < this.heiData.length - j; k++) {
                    if (this.heiData[k] < this.heiData[k + 1]) {
                        let tmp = this.heiData[k + 1]
                        this.heiData[k + 1] = this.heiData[k]
                        this.heiData[k] = tmp
                        let tmps = this.heinameData[k + 1]
                        this.heinameData[k + 1] = this.heinameData[k]
                        this.heinameData[k] = tmps
                    }
                }
            }
        },
        //  排序
        // lowTohei() {
        //   this.sortData = this.lowData;
        //   this.namesort= this.lownameData;
        //   this.earthpro();
        // },
        // heiTolow() {
        //   this.sortData = this.heiData;
        //     this.namesort= this.heinameData;
        //   this.earthpro();
        // },

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
            this.eqHistory = await getHistoryEq('his_')
            this.stationData = await getStationEq(-1)
            let earth_date = []
            this.dateArr = []
            let i
            this.eqHistory.marker.forEach((e) => {
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

            this.eqHistory.marker.forEach((e) => {
                let date = e[3].toString().substr(0, 4)
                e[3] = this.formatDate(e[3])
                this.earthData[this.dateArr.indexOf(date)].push(e)
            })
        },

        earthStation() {
             let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
            const that = this
            let myChart = that.$echarts.init(document.getElementById(this.id1))
            const colors = [
                '#3A85D3',
                '#5AD8A6',
                '#5470c6',
                '#008000',
                '#61a0a8',
            ]

            console.log(this.station3)
            console.log(this.station2)
            console.log(this.station1)

            //  处理地震次数
            for (let i = 0; i < this.eqHistory.marker.length; i++) {
                let dividnum = parseFloat(
                    this.eqHistory.marker[i][7].substr(
                        0,
                        this.eqHistory.marker[i][7].indexOf('(')
                    )
                )

                if (dividnum < 3) {
                    this.divid1.push(dividnum)
                } else if (dividnum >= 3 && dividnum < 4) {
                    this.divid2.push(dividnum)
                } else if (dividnum >= 4 && dividnum < 5) {
                    this.divid3.push(dividnum)
                } else if (dividnum >= 5 && dividnum < 6) {
                    this.divid4.push(dividnum)
                } else if (dividnum >= 6 && dividnum < 7) {
                    this.divid5.push(dividnum)
                }
            }
            //  处理台站数据
            for (let i = 0; i < this.stationData.station.length; i++) {
                let dividnum = parseFloat(
                    this.stationData.station[i][7].substr(
                        0,
                        this.stationData.station[i][7].indexOf('(')
                    )
                )
                let stationNum = parseInt(this.stationData.station[i][20])

                if (dividnum < 3) {
                    this.station1++
                } else if (dividnum >= 3 && dividnum < 4) {
                    this.station2++
                } else if (dividnum >= 4 && dividnum < 5) {
                    this.station3++
                } else if (dividnum >= 5 && dividnum < 6) {
                    this.station4++
                } else if (dividnum >= 6 && dividnum < 7) {
                    this.station5++
                }
            }
            const option = {
                toolbox: {
                    show: true,
                    feature: {
                        // saveAsImage: { show: true },
                        myFull: {
                            textStyle: { fontSize: nowSize (18) },

                            show: true,
                            title: that.isFull == true ? '缩小' : '放大',
                            //  icon：  图片变量写法
                            icon: `image://${imgIcon}`,
                            onclick: function () {
                                if (!that.isFull) {
                                    that.id1 = 'fullScreen'
                                    console.log(that.isFull)
                                }
                                setTimeout(() => {
                                    that.earthStation()
                                }, 500)
                                that.isFull = !that.isFull
                            },
                        },
                    },
                    itemSize: nowSize(30),
                    bottom: 10,
                    right: 10,
                },

                title: {
                    //图表的标题，注释掉就没有名称了
                    text: '不同震级范围的地震与触发台站统计图',
                    left: nowSize(40),
                    y: 'top',
                    textStyle: {
                        fontSize: nowSize(25),
                    },
                },
                color: colors, //下面这种直接配置演示也行
                //color: ['#3A85D3','#5AD8A6','#5470c6',  '#008000', '#61a0a8'], //依次选择颜色，默认为第一个颜色，多根柱子多个颜色
                tooltip: {
                    trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                legend: {
                    data: ['地震次数', '触发台站数'], //这里设置柱状图上面的方块，名称跟series里的name保持一致
                    align: 'right', //上面方块靠右还是居中的设置.不设置则居中
                    right: nowSize(10),
                    textStyle: {
                        //图例文字的样式

                        fontSize: nowSize(16),
                    },
                },
                grid: {
                    left: '3%', //柱状图距离左边的距离，也可以用像素px
                    right: '4%', //柱状图距离右边的距离，也可以用像素px
                    bottom: '8%', //网格图（柱状图、折线图、气泡图等）离底部的距离，也可以用像素比如10px
                    containLabel: true, //grid 区域是否包含坐标轴的刻度标签。false可能溢出，默认为false
                },

                xAxis: [
                    {
                        nameTextStyle: {
                            fontSize: nowSize(18),
                            padding: [0, 0, 0, -30],
                        },
                        name: '震级',
                        type: 'category',
                        data: [
                            '震级<3',
                            '3≤震级<4',
                            '4≤震级<5',
                            '5≤震级<6',
                            '6≤震级<7',
                        ],
                        axisTick: {
                            alignWithLabel: true,
                        },

                        axisLabel: {
                            fontSize: nowSize(20),
                            rotate: 0, //控制柱状图X轴label是否倾斜显示
                        },
                    },
                ],
                yAxis: [
                    {
                        nameTextStyle: {
                            fontSize: nowSize(18),
                            padding: [0, 0, 0, -30],
                        },
                        name: '数量',
                        axisLabel: {
                            fontSize: nowSize(20),
                        },

                        type: 'value',
                    },
                ],
                series: [
                    {
                        //柱状图-柱子1
                        name: '地震次数', //需要跟legend配置项对应
                        type: 'bar',
                        itemStyle: {
                            barBorderRadius: [10, 10, 0, 0], //控制柱状图的圆角显示弧度，（顺时针左上，右上，右下，左下）
                        },
                        barWidth: '20%', //barWidth设置每根柱状图的宽度
                        data: [
                            this.divid1.length,
                            this.divid2.length,
                            this.divid3.length,
                            this.divid4.length,
                            this.divid5.length,
                        ],
                    },
                    {
                        //柱状图-柱子2
                        name: '触发台站数',
                        type: 'bar',
                        //itemStyle: {
                        //    barBorderRadius: [10, 10, 0, 0] //控制柱状图的圆角显示弧度，（顺时针左上，右上，右下，左下）
                        //},
                        barWidth: '20%',
                        data: [
                            this.station1,
                            this.station2,
                            this.station3,
                            this.station4,
                            this.station5,
                        ],
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
        earthYear() {
                let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
            // 获取15年
            let yearData = []
            for (let k = 0; k < 15; k++) {
                yearData[k] = this.dateArr[k]
            }
            const that = this
            const myChart = this.$echarts.init(
                document.getElementById(this.id4)
            )
            const xdata = yearData

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

            const barWidth = 2
            const option = {
                toolbox: {
                    show: true,
                    feature: {
                        // saveAsImage: { show: true },
                        myFull: {
                            textStyle: { fontSize: 18 },

                            show: true,
                            title: that.isFull == true ? '缩小' : '放大',
                            //  变量写法
                            icon: `image://${imgIcon}`,
                            onclick: function () {
                                if (!that.isFull) {
                                    that.id4 = 'fullScreen'
                                    console.log(that.isFull)
                                }
                                setTimeout(() => {
                                    that.earthYear()
                                }, 500)
                                that.isFull = !that.isFull
                            },
                        },
                    },
                    itemSize: nowSize(30),
                    top: 10,
                    right: 10,
                },
                title: {
                    text: '黄土高原2001-2018年地震频度N-t图',
                    x: 'center',
                    y: 'top',
                    textStyle: {
                        fontSize: nowSize(25),
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
                    left: 20,
                    right: 20,
                    top: 28,
                    bottom: 10,
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
                        interval: 0,
                        // rotate: 40,
                        fontSize: nowSize(20),
                        color: '#6f7178',
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
                        color: '#6f7178',
                        padding: [0, 0, 0, -20],
                        fontSize: nowSize(18),
                    },
                    name: 't',
                },
                yAxis: {
                    nameTextStyle: {
                        // 坐标轴名称样式
                        color: '#6f7178',
                        padding: [0, 0, -14, 0],
                        fontSize: 25,
                    },
                    type: 'value',
                    show: true,
                    splitNumber: 8,
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
                        color: '#6f7178',
                        fontSize: nowSize(18),
                    },
                    name: 'N',
                },
                series: [
                    {
                        type: 'line',
                        barWidth: barWidth,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        // { offset: 0, color: "rgba(28, 216, 255, 0.05)" },
                                        { offset: 1, color: '#4f81bd' },
                                    ]
                                ),
                            },
                        },
                        data: yData,
                    },
                    {
                        z: 2,
                        type: 'pictorialBar',
                        data: yData,
                        symbol: 'diamond',
                        symbolOffset: [0, '50%'],
                        symbolSize: [barWidth, barWidth * 0.5],
                        itemStyle: {
                            normal: {
                                color: '#4f81bd',
                            },
                        },
                    },
                    {
                        z: 3,
                        type: 'pictorialBar',
                        symbolPosition: 'end',
                        data: yData,
                        symbol: 'circle',
                        symbolOffset: [0, -barWidth * 0.8],
                        symbolSize: [barWidth * 1.2, barWidth * 1.2],
                        symbol: 'image://' + img,
                        label: {
                            show: false,
                        },
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
        earthpro() {
            //  console.log(this.earthData)
            // let datasort = [];
            // let dataSort = [];
            // // let yeardata=[];
            // for (let j = 0; j < 15; j++) {
            //   console.log(this.earthData[j].length);
            //   datasort[j] = this.earthData[j].length;
            //   dataSort[j] = this.earthData[j].length;
            //   // yeardata[j]=this.earthData[j+1].e[3];
            //   // console.log(yeardata);
            // }

            // datasort.sort(function (a, b) {
            //   return b - a;
            // });
            // let mostearth = [];
            // for (let i = 0; i < 11; i++) {
            //   mostearth[i] = datasort[i];
            // }
            // // 查找选出序号
            // let k = [];
            // for (let j = 0; j < 10; j++) {
            //   for (let i = 0; i <15; i++) {
            //     if (mostearth[j] == dataSort[i]) {
            //       k[j] = i;
            //     }
            //   }
            // }
            // 获取高频地震前十年数据
            // let mostyear = [];
            // for (let n = 0; n < 10; n++) {
            //   mostyear[n] = this.dateArr[k[n]];
            // }
 //当前视口宽度----此处解决rcharts中字体自适应
      let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
            const that = this
            const myChart = this.$echarts.init(
                document.getElementById(this.id3)
            )
            const option = {
                title: {
                    text: '滑坡数量统计柱状图',
                    x: 'center',
                    y: 'top',
                    textStyle: {
                        fontSize: nowSize(25),
                    },
                },
                color: ['#4f81bd'],
                xAxis: [
                    {
                        nameTextStyle: {
                            fontSize: 15,
                        },

                        name: '地震名称',
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 40,
                            fontSize: nowSize(18),

                            rotate: 0, //x轴文字旋转的角度
                        },
                        data: this.heinameData,
                    },
                ],
                yAxis: [
                    {
                        nameTextStyle: {
                            fontSize: 18,
                        },

                        name: '数量/个',
                        type: 'value',
                        axisLabel: {
                            fontSize: nowSize(18),
                        },
                    },
                ],

                series: [
                    {
                        type: 'bar',
                        data: this.heiData,
                        barWidth: '50%', //柱子的宽度
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#4f81bd',
                                        '#4f81bd',
                                        '#4f81bd',
                                        '#4f81bd',
                                        '#4f81bd',
                                        '#4f81bd',
                                        '#4f81bd',
                                    ]
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    fontSize: nowSize(25),
                                    show: true,
                                    position: 'top',
                                    // formatter: '{b}\n{c}'
                                    formatter: function (a) {
                                        return a.value
                                    },
                                },
                            },
                        },
                    },
                ],
                toolbox: {
                    show: true,
                    feature: {
                        // saveAsImage: { show: true },
                        myFull: {
                            textStyle: { fontSize: nowSize(18) },

                            show: true,
                            title: that.isFull == true ? '缩小' : '放大',
                            //  变量写法
                            icon: `image://${imgIcon}`,
                            onclick: function () {
                                if (!that.isFull) {
                                    that.id3 = 'fullScreen'
                                    console.log(that.isFull)
                                }

                                setTimeout(() => {
                                    that.earthpro()
                                }, 500)
                                that.isFull = !that.isFull
                            },
                        },
                    },
                    itemSize: nowSize(30),
                    bottom: 10,
                    right: 10,
                },
            }
            myChart.clear()
            myChart.setOption(option)

            // 图表自适应盒子
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        earthMT() {
                let nowClientWidth = document.documentElement.clientWidth;
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
            let arr = []
            let num = 0
            let arrAll = new Array()
            console.log(this.earthData)
            for (let j = 0; j < this.earthData.length; j++) {
                for (let i = 0; i < this.earthData[j].length; i++) {
                    num++
                    arrAll[num] = new Array()
                    arrAll[num][0] = this.earthData[j][i][3]
                    arrAll[num][1] = parseFloat(this.earthData[j][i][7])
                }
            }
            console.log(arrAll)

            const that = this
            const myChart = this.$echarts.init(
                document.getElementById(this.id2)
            )
            let xdata = arrAll
            const option = {
                color: ['black', '#2f4554', '#61a0a8'],
                title: {
                    text: '地震震级频度M-t图',
                    x: 'center',
                    y: 'top',
                    textStyle: {
                        fontSize: nowSize(25),
                    },
                },

                toolbox: {
                    show: true,
                    feature: {
                        // saveAsImage: { show: true },
                        myFull: {
                            textStyle: { fontSize: nowSize(18) },

                            show: true,
                            title: that.isFull == true ? '缩小' : '放大',
                            //  变量写法
                            icon: `image://${imgIcon}`,
                            onclick: function () {
                                if (!that.isFull) {
                                    that.id2 = 'fullScreen'
                                    console.log(that.isFull)
                                }
                                setTimeout(() => {
                                    that.earthMT()
                                }, 500)
                                that.isFull = !that.isFull
                            },
                        },
                    },
                    itemSize: nowSize(30),
                    top: 0,
                    right: 0,
                },

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        nameTextStyle: {
                            fontSize: nowSize(18),
                            padding: [0, 0, 0, -10],
                        },
                        name: 't',
                        type: 'time',
                        axisLabel: {
                            fontSize: nowSize(15),
                        },
                        axisTick: {
                            alignWithLabel: true,
                        },
                    },
                ],
                dataZoom: [
                    {
                        startValue: '2001-07-07',
                    },
                    {
                        type: 'inside',
                    },
                ],
                yAxis: [
                    {
                        nameTextStyle: {
                            fontSize: nowSize(18),
                        },
                        name: 'M',
                        axisLabel: {
                            fontSize: nowSize(18),
                        },
                        type: 'value',
                    },
                ],
                series: [
                    {
                        name: '震级',
                        type: 'bar',
                        barWidth: '2%',
                        data: xdata,
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
    },
}
//  滚动
</script>

<style>

/* 缩放比的尝试--貌似效果不大 */
@media all
and (-moz-min-device-pixel-ratio: 1.09) and (-moz-max-device-pixel-ratio: 1.18),
    (-webkit-min-device-pixel-ratio: 1.09) and (-webkit-max-device-pixel-ratio: 1.18),
    (min-resolution: 1.09dppx) and (max-resolution: 1.18dppx) {
  html{
 font-size: 1vw;
}
}

.datachartbox {
  position: relative;
  overflow: hidden;
  margin-top: 1.25rem;
}

h1 {
  font-size: 1.875rem;
  margin-left: 3.125rem;
  margin-top: 6.25rem;
}

.hide {
    display: none;
}

.chart1 {
  float: left;
  position: absolute;
  left: 1%;
  cursor: pointer;
  width: 39vw;
  height: 45vh;
  box-shadow: .125rem .125rem 1.25rem .125rem rgba(0, 0, 0, 0.3);
}
.chartse {
  z-index: 999;
  float: left;
  position: absolute;
  left: 1%;
  cursor: pointer;
  width: 88vw;
  height: 98vh;
  background-color: #fff;
}

.chart2 {
  float: left;
  right:1%;
  position: absolute;
  cursor: pointer;
  width: 44vw;
  height: 45vh;
  box-shadow: .125rem .125rem 1.25rem .125rem rgba(0, 0, 0, 0.3);
}
.chart4 {
  float: left;
  top: 50%;
right:1%;
  position: absolute;
  cursor: pointer;
  width: 44vw;
  height: 45vh;
  box-shadow: .125rem .125rem 1.25rem .125rem rgba(0, 0, 0, 0.3);
}
.lowbtn {
  margin-left: 1.25rem;
  margin-top: 31.25rem;
}

.chart3 {
  float: left;
  top: 50%;
 left: 1%;
  float: left;
  position: absolute;
  cursor: pointer;
  width: 39vw;
  height: 45vh;
  box-shadow: .125rem .125rem 1.25rem .125rem rgba(0, 0, 0, 0.3);
}
</style>
