
import { getStationEq } from "@/api/history.js";
import {
    createLabelStyle,
} from "./layers"

import store from "@/store"

import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Graphic from "@arcgis/core/Graphic"


import {
    layersSettings
} from "./layers"

import { baseFun } from "@/api/request"
import provinceDot from "@/assets/provinceDot.json"

import {reactive, ref} from "vue";
import {earth} from "@arcgis/core/geometry/support/Ellipsoid";
const dialogState = reactive({stationName:""},{objectID: 1},
    {stationCode: ""},
    {stationLatitude: ""},
    {stationLongitude: ""},
    {stationName: ""}, {addressCondition:""},{measurePoint: ""}, {recordModel: ""})
const dialogVisible = ref(false )

const type2icon = {}
for (const key in layersSettings) {
    for (const item of layersSettings[key].items) {
        type2icon[item.id] = item.icon
    }
}
const epiLabel = function (eqCenter, view, size, labelPlacement, isDisplay) {
    var features = [];
    console.log(eqCenter);
    let pointCenter = {
        type: 'point',
        latitude: parseFloat(eqCenter[9]),
        longitude: parseFloat(eqCenter[8]),
    }
    const iconRender = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: 50, // points
                resource: {
                    href: new URL('../../imgicon/00FF00.png',import.meta.url).href
                },
                material: {
                    color: [0, 255, 0, 1]
                }
            }]
        }
    };
    // const iconRender = {
    //     type: "simple", // autocasts as new SimpleRenderer()
    //     symbol: {
    //         type: "point-3d",
    //         symbolLayers: [{
    //             type: "icon", // autocasts as new IconSymbol3DLayer()
    //             size: 80, // points
    //             resource: {
    //                 href: centerstarPng
    //             },
    //             material: {
    //                 color: "red"
    //             }
    //         }]
    //     }
    // };
    const labelClass = {
        // When using callouts on labels, "above-center" is the only allowed position
        labelExpressionInfo: {
            value: "{name}" + "地震宏观震中", /////////////////////////////////////////////////////////////////////////////////////////////
        },
        symbol: {
            type: "label-3d", // autocasts as new LabelSymbol3D()
            symbolLayers: [{
                type: "text", // autocasts as new TextSymbol3DLayer()
                material: {
                    color: "#f00"
                },
                halo: {
                    color: "#fff",
                    size: 2
                },
                size: size
            }],
        },
        labelPlacement: labelPlacement || "center-center",
    }
    let CenterPopupTemplate = {
        title: "震中信息",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "time",
                label: "发震时间",
            },
                {
                    fieldName: "district",
                    label: "震中位置"
                },
                {
                    fieldName: "magnitude",
                    label: "震级",
                },
                {
                    fieldName: "depth",
                    label: "震源深度(KM)",
                },
                {
                    fieldName: "intensity",
                    label: "震中烈度",
                },
                {
                    fieldName: "elevation",
                    label: "震中海拔(M)"
                },
                {
                    fieldName: "longitude_latitude",
                    label: "震中经纬度",
                }
            ]
        }],
        overwriteActions: true
    }
    var pointGraphic = new Graphic({
        geometry: pointCenter,
        attributes: {
            name: eqCenter[1],
            district: eqCenter[3] || "不详",
            longitude_latitude: parseFloat(eqCenter[8]).toFixed(3) + "/" + parseFloat(eqCenter[9]).toFixed(3),
            magnitude: eqCenter[4],
            time: eqCenter[2],
            depth: eqCenter[5] || "不详",
            // intensity: "Ⅷ",
            intensity: eqCenter[6],
            elevation: eqCenter[5] || "不详",
        }
    });
    features.push(pointGraphic)
    const peaks = new FeatureLayer({
        id: isDisplay ? `eqCenterLayer${isDisplay - 1}` : 'eqCenterLayer',
        title: "震中标签",
        //*设置3d标签可见*
        labelsVisible: true,
        source: features,
        popupTemplate: CenterPopupTemplate,
        renderer: iconRender,
        fields: [{
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid"
        },
            {
                name: "district",
                alias: "县名",
                type: "string"
            },
            {
                name: "name",
                alias: "地震名称",
                type: "string"
            },
            {
                name: "longitude_latitude",
                alias: "经纬度",
                type: "string"
            },
            {
                name: "magnitude",
                alias: "震级",
                type: "string"
            },
            {
                name: "time",
                alias: "时间",
                type: "string"
            },
            {
                name: "depth",
                alias: "深度",
                type: "string"
            },
            {
                name: "intensity",
                alias: "预估烈度(°)",
                type: "string"
            },
            {
                name: "elevation",
                alias: "震中海拔",
                type: "string"
            },

        ],
        objectIdField: "ObjectID",
        geometryType: "point",
        outFields: ["ObjectID"],
        labelingInfo: [labelClass],
    });
    view.on("click", function (event) {
        // event is the event handle returned after the event fires.
        view.hitTest(event).then(function (response) {
            if (response.results.length) {
                let graphic = response.results.filter(function (result) {
                    return result.graphic.layer === peaks;
                });
                // do something with the result graphic
                if (graphic[0]) {
                    console.log("地震点的点击事件======>", graphic);
                    popupStyle(8, 18.270)//16 734 17 775  41 546
                }
            }
        })
    });
    return peaks;
}


const pushHuapoDot = async (map, view, type, isDisplay) => {
    let features = [];
    let features2 = [];
    let huapoDot = await baseFun("get_marker", type)
    console.log(huapoDot);
    if (store.getters.getSwitchEarthquakes == -1) {
        let item = store.getters.gethuapoDot
        // alert(item)
        item = item.concat(huapoDot.marker)
        store.commit("sethuapoDot", item)
    } else {
        store.commit("sethuapoDot", huapoDot.marker)
    }
    for (const item of huapoDot.marker) {
        let pointCenter = { //这个点放哪
            type: 'point',
            longitude: parseFloat(item[3]), //lonlat.x,
            latitude: parseFloat(item[4]), //lonlat.y,
        }
        const getname = (sname) => {
            let name = ''
            if (sname.search(/自治区/i) != -1) {
                sname = sname.substring(sname.search(/区/i) + 1, sname.length)
            }
            if (sname.search(/镇/i) != -1) {
                name = sname.substring(sname.search(/镇/i) + 1, sname.length)
            } else if (sname.search(/县/i) != -1) {
                name = sname.substring(sname.search(/县/i) + 1, sname.length)
            } else if (sname.search(/区/i) != -1) {

                name = sname.substring(sname.search(/区/i) + 1, sname.length)
            } else {
                name = sname
            }
            return name
        }
        let pointGraphic = new Graphic({
            geometry: pointCenter,
            attributes: { //这个点需要显示的属性
                code: item[1],
                huapoName: getname(item[2]),
                huapoName2: item[2],
                intensity: item[5],
                length: item[6],
                width: item[7],
                shape: item[14],
                arr: item

            }
        });
        let isPhoto = parseInt(item[19])
        if (isPhoto) {
            features.push(pointGraphic);
        } else {
            features2.push(pointGraphic);
        }
    }
    const iconRenderYellow = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: 20, // points
                resource: {
                    href: new URL('../../imgicon/huapo2.png',import.meta.url).href
                },
                material: {
                    color: [255, 153, 0, 1]
                }
            }]
        }
    };
    const iconRender = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: 20, // points
                resource: {
                    href: new URL('../../imgicon/huapo.png',import.meta.url).href
                },
                material: {
                    color: [255, 153, 0, 1]
                }
            }]
        }
    };
    //弹窗显示的属性 和 Graphic 和 feature的fields是相关联的
    let NearPopupTemplate = {
        title: "{huapoName}",
        content: popupContent
    };
    function popupContent(feature) {
        var div = document.createElement("div");
        console.log(feature);
        div.innerHTML = `<iframe src='http://localhost:8848/get_image_HTML/${feature.graphic.attributes.huapoName}_${feature.graphic.geometry.longitude}_${feature.graphic.geometry.latitude}' style='width: 100%; height: 23.4375rem;'></iframe>`;
        return div;
    };
    const labelClass = {
        labelExpressionInfo: {
            expression: "$feature.huapoName"
        },
        symbol: createLabelStyle(11),
        labelPlacement: "center-right",
    };
    let fArr = [{
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
    },
        {
            name: "huapoName",
            alias: "滑坡名称",
            type: "string"
        },
        {
            name: "huapoName2",
            alias: "滑坡名称",
            type: "string"
        },
        {
            name: "intensity",
            alias: "地震烈度",
            type: "string"
        },
        {
            name: "shape",
            alias: "滑坡平面形",
            type: "string"
        },
        {
            name: "code",
            alias: "野外编号",
            type: "string"
        },
        {
            name: "length",
            alias: "滑体长度",
            type: "string"
        },
        {
            name: "width",
            alias: "滑体宽度",
            type: "string"
        }
    ]

    let fealayer = new FeatureLayer({
        id: isDisplay ? "huapoDot" + type : "huapoDot",
        // title: data[0].type,
        labelsVisible: true,
        source: features,
        popupTemplate: NearPopupTemplate,
        renderer: iconRenderYellow,
        // renderer: createIconRender(20, type2icon[stations]),
        fields: fArr,
        objectIdField: "ObjectID",
        geometryType: "point",
        outFields: ["ObjectID"],
        labelingInfo: [labelClass],
    });
    let fealayer2 = new FeatureLayer({
        id: isDisplay ? "huapoDot2" + type : "huapoDot2",
        // title: data[0].type,
        labelsVisible: true,
        source: features2,
        popupTemplate: NearPopupTemplate,
        renderer: iconRender,
        // renderer: createIconRender(20, type2icon[stations]),
        fields: fArr,
        objectIdField: "ObjectID",
        geometryType: "point",
        outFields: ["ObjectID"],
        labelingInfo: [labelClass],
    });

    map.add(fealayer);
    map.add(fealayer2);
    const getDot = (name, layer) => {
        let i
        for (i = 0; i < layer.source.items.length; i++) {
            if (layer.source.items[i].attributes.huapoName == name) break
        }
        return layer.source.items[i].attributes.huapoName2.length
    }
    //这个真好用
    view.on("click", function (event) {
        // event is the event handle returned after the event fires.
        view.hitTest(event).then(function (response) {
            if (response.results.length) {
                let graphic = response.results.filter(function (result) {
                    return result.graphic.layer === fealayer;
                });
                let graphic2 = response.results.filter(function (result) {
                    return result.graphic.layer === fealayer2;
                });
                // do something with the result graphic
                // console.log(graphic[0].graphic,fealayer);
                if (graphic[0]) {
                    popupStyle(getDot(graphic[0].graphic.attributes.huapoName, fealayer), 26.9716)//16 734 17 775  41 546
                } else if (graphic2[0]) {
                    popupStyle(getDot(graphic2[0].graphic.attributes.huapoName, fealayer2), 26.9716)//16 734 17 775  41 546
                }
            }
        })
    });
}
const setprovinceDot = async (map, type) => { //省份名称标识
    let features = [];
    for (const item of provinceDot) {
        let pointCenter = { //这个点放哪
            type: 'point',
            longitude: item.lonAndLat[0], //lonlat.x,
            latitude: item.lonAndLat[1], //lonlat.y,
        }
        let pointGraphic = new Graphic({
            geometry: pointCenter,
            attributes: { //这个点需要显示的属性
                name: item.name
            }
        });
        features.push(pointGraphic);
    }
    //弹窗显示的属性 和 Graphic 和 feature的fields是相关联的


    const labelClass = {
        labelExpressionInfo: {
            expression: "$feature.name"
        },
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#ffff00",
            font: { // autocast as new Font()
                size: 15,
                weight: "bold"
            },
        },
        labelPlacement: "center-center",
    };
    let fealayer = new FeatureLayer({
        id: "provinceDot",
        // title: data[0].type,
        labelsVisible: true,
        source: features,
        // renderer: createIconRender(20, type2icon[stations]),
        fields: [{
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid"
        },
            {
                name: "name",
                alias: "省份名",
                type: "string"
            },
        ],
        objectIdField: "ObjectID",
        geometryType: "point",
        outFields: ["ObjectID"],
        labelingInfo: [labelClass],
    });
    map.add(fealayer);
}
const  popupStyle = (len, height) => {

    setTimeout(()=>{
        let popup = document.getElementsByClassName("esri-popup__main-container")
        while(popup == undefined ||popup.length == 0){
            popup = document.getElementsByClassName("esri-popup__main-container")
        }
        popup = popup[0]
        switch (len) {
            case 1:
                break
            case 2:
                break
            default:
                len = 524 + (len - 10) * 21
                len = len/19.2 > 655/19.2 ? len/19.2 : 655/19.2
                let cssText = `width: ${len}rem;`
                if (height) {
                    cssText += `height:${height}rem;`
                }
                popup.style.cssText = cssText
                console.log(popup.style.cssText,cssText);
                break
        }
    },100)
}
const dingshi = function (n) {
    if (n >= 0) {
        const circle = document.getElementsByClassName(
            `circle ${n}`
        )[0];
        const circleLast = document.getElementsByClassName(
            `circle ${n - 1}`
        )[0];
        circle.style.backgroundColor = "#11bdfd";
        if (n >= 1) {
            circleLast.style.backgroundColor = "transparent";
        } else if (n == 0) {
            const circleEnd = document.getElementsByClassName(`circle 14`)[0];
            circleEnd.style.backgroundColor = "transparent";
        }
    }
}

let layerBranch = null;
const setHistoryMarker = async function (data, map, id, view, n) {
    view.popup.close()
    let timer = true;
    let features = [];
    console.log(data);
    const hisLevel2 = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: 50, // points
                resource: {
                    href: new URL('../../imgicon/f90600.png',import.meta.url).href
                },
                material: {
                    color: "red"
                }
            }]
        }
    };
    const timeConvert = (date) => {
        date =
            date.toString().substr(0, 4) +
            "-" +
            date.toString().substr(4, 2) +
            "-" +
            date.toString().substr(6, 2) +
            ' ' +
            date.toString().substr(8, 2) +
            ':' +
            date.toString().substr(10, 2) +
            ':' +
            date.toString().substr(12, 2)
        return date
    }
    let hisRenderer = hisLevel2;
    for (const eq of data) {

        let pointCenter = {
            type: 'point',
            longitude: eq[5],
            latitude: eq[4],
        }

        let pointGraphic = new Graphic({
            geometry: pointCenter,
            attributes: {
                longitude: parseFloat(eq[5]).toFixed(3),
                latitude: parseFloat(eq[4]).toFixed(3),
                datetime: timeConvert(eq[3]), //只保留日期，截去时间
                // location: eq[5],
                magnitude: eq[7],
                depth: eq[6],
                earthName: eq[2],
                taizhanNum: eq[8].length
            }
        });
        features.push(pointGraphic);
    }





    const labelClass = {
        labelExpressionInfo: {
            value: "{datetime} {earthName} {magnitude}" + "级",
        },
        symbol: {
            type: "label-3d", // autocasts as new LabelSymbol3D()
            symbolLayers: [{
                type: "text", // autocasts as new TextSymbol3DLayer()
                material: {
                    color: "#ffd554"
                },
                halo: {
                    color: [0, 0, 0, 0.4],
                    size: 1
                },
                size: 15
            }],
        },
        labelPlacement: "center-right",
    };

    //弹窗显示的属性 和 Graphic 和 feature的fields是相关联的




    // let NearPopupTemplate = {
    //     title: "历史地震",
    //     content: [
    //         {
    //             type: "fields",
    //             fieldInfos: [
    //             {
    //                 fieldName: "earthName",
    //                 label: "地震名称"
    //             },
    //             {
    //                 fieldName: "datetime",
    //                 label: "发震时间",
    //             },

    //             {
    //                 fieldName: "longitude",
    //                 label: "震中经度"
    //             },
    //             {
    //                 fieldName: "latitude",
    //                 label: "震中纬度",
    //             },
    //             // {
    //             //     fieldName: "location",
    //             //     label: "震源位置",
    //             // },
    //             {
    //                 fieldName: "magnitude",
    //                 label: "震级",
    //             },
    //             {
    //                 fieldName: "depth",
    //                 label: "震中深度(km)",
    //             },

    //             {
    //                 fieldName:"taizhanNum",
    //                 label:"触发台站数"
    //             }
    //             ]
    //         },
    //     ],

    // }
    let NearPopupTemplate = {
        title: "地震信息",
        content: popupContent
    };
    function popupContent(feature) {
        var div = document.createElement("div");
        console.log(feature);
        div.innerHTML = `<iframe src='http://localhost:8848/data/get_vibration_data?datetime=${feature.graphic.attributes.datetime}&earthName=${feature.graphic.attributes.earthName}&magnitude=${feature.graphic.attributes.magnitude}' style='width: 100%; height: 550px;'></iframe>`;
        return div;
    };
    if (features.length > 0) {
        const peak = new FeatureLayer({
            id: id,
            title: "地震信息",
            labelsVisible: true,
            source: features,
            popupTemplate: NearPopupTemplate,
            renderer: hisRenderer,
            fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
                {
                    name: "earthName",
                    alias: "地震名称",
                    type: "string"
                },
                {
                    name: "longitude",
                    alias: "经度",
                    type: "string"
                },
                {
                    name: "latitude",
                    alias: "纬度",
                    type: "string"
                },
                {
                    name: "location",
                    alias: "地点",
                    type: "string"
                },
                {
                    name: "magnitude",
                    alias: "震级",
                    type: "string"
                },
                {
                    name: "depth",
                    alias: "震中深度(km)",
                    type: "string"
                },
                {
                    name: "distence",
                    alias: "距离震中",
                    type: "double"
                },
                {
                    name: "datetime",
                    alias: "时间",
                    type: "string"
                },

                {
                    name: "taizhanNum",
                    alias: "触发台站数",
                    type: "integer"
                }
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            outFields: ["ObjectID"],
            labelingInfo: [labelClass],
        });
        map.add(peak);

        dingshi(n);

        view.on("click", function (event) {
            // event is the event handle returned after the event fires.
            clearInterval(window.myTimer)
            store.commit("setmyTimer", false)
            view.hitTest(event).then(async function (response) {
                let eqHistory_branch = [];
                if (response.results.length) {
                    let graphic = response.results.filter(function (result) {
                        return result.graphic.layer === peak;
                    });
                    // do something with the result graphic
                    if (graphic[0]) {
                        // console.log(graphic.attributes);
                        // await getStation(data, graphic);
                        // console.log(eqHistory_branch);
                        // setHistoryBranchMarker(eqHistory_branch, map, id);
                        // popupStyle(8, 351)

                        console.log(graphic[0].graphic.attributes);
                        for (let i = 0; i < data.length; i++) {
                            if (graphic[0].graphic.attributes.datetime == timeConvert(data[i][3]) && graphic[0].graphic.attributes.magnitude == data[i][7]) {
                                var p = new Promise(
                                    function (resolve, reject) {
                                        getStationEq(data[i][0]).then(res => {
                                            for (let j = 0; j < res.station.length; j++) {
                                                eqHistory_branch.push(res.station[j]);
                                            }
                                            resolve(console.log(eqHistory_branch))
                                        })
                                    }
                                )
                            }

                        };
                        p.then(() => {
                            setHistoryBranchMarker(eqHistory_branch, map, "setHistoryBranchMarker3");
                            popupStyle(8, 22.2)
                        })

                        // data.forEach(async  eq=> {
                        //     console.log(graphic[0].graphic.attributes.datetime ,eq[3] , graphic[0].graphic.attributes.magnitude , eq[7]);
                        //     if(graphic[0].graphic.attributes.datetime == eq[3] && graphic[0].graphic.attributes.magnitude == eq[7]){
                        //             eqHistory_branch.push(eq);
                        //     }
                        // });
                        // setHistoryBranchMarker(eqHistory_branch, map, id);
                        // popupStyle(8, 351)
                    }
                }
            })
        });
    }
}


function getStation(data, graphic) {
    // console.log(id);
    // let res = await getStationEq(id);
    // eqHistory_branch.push(res.station);
    // console.log(eqHistory_branch);
    // eqHistory_branch = [];
    // data.forEach(async  eq=> {
    //     console.log(graphic[0].graphic.attributes.datetime ,eq[3] , graphic[0].graphic.attributes.magnitude , eq[7]);
    //     if(graphic[0].graphic.attributes.datetime == eq[3] && graphic[0].graphic.attributes.magnitude == eq[7]){
    //         console.log(eq);
    //         getStationEq(eq[0]).then(res=>{
    //             eqHistory_branch.push(res.station);
    //         })

    //         // let res = await getStationEq(eq[0]);
    //         // eqHistory_branch.push(res.station);
    //         console.log(eqHistory_branch);
    //     }
    // });
    for (let i = 0; i < data.length; i++) {
        console.log(graphic[0].graphic.attributes.datetime, data[i][3], graphic[0].graphic.attributes.magnitude, data[i][7]);
        if (graphic[0].graphic.attributes.datetime == data[i][3] && graphic[0].graphic.attributes.magnitude == data[i][7]) {
            var p = new Promise(
                function (resolve, reject) {
                    getStationEq(data[i][0]).then(res => {
                        eqHistory_branch.push(res.station);
                    })
                }
            )
        }

    };
    p.then(() => {
        setHistoryBranchMarker(eqHistory_branch, map, "setHistoryBranchMarker2");
        popupStyle(8, 22.2)
    })
}





const setHistoryAllMarker = async function (data, map, id, view) {
    view.popup.close()
    let features = [];
    const timeConvert = (date)=>{
        date =
            date.toString().substr(0, 4) +
            "-" +
            date.toString().substr(4, 2) +
            "-" +
            date.toString().substr(6, 2) +
            ' ' +
            date.toString().substr(8, 2) +
            ':' +
            date.toString().substr(10, 2) +
            ':' +
            date.toString().substr(12, 2)
        return date
    }
    const hisLevel1 = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: 30, // points
                resource: {
                    href: new URL('../../imgicon/f90600.png',import.meta.url).href
                },
                material: {
                    color: "red"
                }
            }]
        }
    };

    const hisLevel2 = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: 50, // points
                resource: {
                    href: new URL('../../imgicon/f90600.png',import.meta.url).href
                },
                material: {
                    color: "red"
                }
            }]
        }
    };

    const hisLevel3 = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: 80, // points
                resource: {
                    href: new URL('../../imgicon/f90600.png',import.meta.url).href
                },
                material: {
                    color: "red"
                }
            }]
        }
    };
    let hisRenderer = hisLevel2;
    if (parseFloat(data[0][7]) >= 1.0 && parseFloat(data[0][7]) < 3.0) {
        hisRenderer = hisLevel1;
    } else if (parseFloat(data[0][7]) >= 3.0 && parseFloat(data[0][7]) < 5.0) {
        hisRenderer = hisLevel2;
    } else {
        hisRenderer = hisLevel3;
    }
    for (const eq of data) {

        let pointCenter = {
            type: 'point',
            longitude: eq[5],
            latitude: eq[4],
        }

        let pointGraphic = new Graphic({
            geometry: pointCenter,
            attributes: {
                longitude: parseFloat(eq[5]).toFixed(3),
                latitude: parseFloat(eq[4]).toFixed(3),
                datetime: timeConvert(eq[3]), //只保留日期，截去时间
                // location: eq[5],
                magnitude: eq[7],
                depth: eq[6],
                earthName: eq[2],
                taizhanNum:eq[9].length
            }
        });
        features.push(pointGraphic);
    }





    const labelClass = {
        labelExpressionInfo: {
            value: "{datetime} {earthName} {magnitude}" + "级",
        },
        symbol: {
            type: "label-3d", // autocasts as new LabelSymbol3D()
            symbolLayers: [{
                type: "text", // autocasts as new TextSymbol3DLayer()
                material: {
                    color: "#ffd554"
                },
                halo: {
                    color: [0, 0, 0, 0.4],
                    size: 1
                },
                size: 15
            }],
        },
        labelPlacement: "center-right",
    };

    //弹窗显示的属性 和 Graphic 和 feature的fields是相关联的




    let NearPopupTemplate = {
        title: "地震信息",
        content: popupContent
    };
    function popupContent(feature) {
        document.querySelector('.esri-popup').classList.remove('hide-the-popup')
        var div = document.createElement("div");
        console.log(feature);
        window.localStorage.setItem('earthtime',feature.graphic.attributes.datetime)
        div.innerHTML = `<iframe src='http://localhost:8848/data/get_vibration_data?datetime=${feature.graphic.attributes.datetime}&earthName=${feature.graphic.attributes.earthName}&magnitude=${feature.graphic.attributes.magnitude}' style='width: 100%; height: 350px;'></iframe>`;
        return div;
    };
    if (features.length > 0) {
        const peak = new FeatureLayer({
            id: id,
            title: "地震信息",
            labelsVisible: true,
            source: features,
            popupTemplate: NearPopupTemplate,
            renderer: hisRenderer,
            fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
                {
                    name: "earthName",
                    alias: "地震名称",
                    type: "string"
                },
                {
                    name: "longitude",
                    alias: "经度",
                    type: "string"
                },
                {
                    name: "latitude",
                    alias: "纬度",
                    type: "string"
                },
                {
                    name: "location",
                    alias: "地点",
                    type: "string"
                },
                {
                    name: "magnitude",
                    alias: "震级",
                    type: "string"
                },
                {
                    name: "depth",
                    alias: "深度",
                    type: "string"
                },
                {
                    name: "distence",
                    alias: "距离震中",
                    type: "double"
                },
                {
                    name: "datetime",
                    alias: "时间",
                    type: "string"
                },

                {
                    name: "taizhanNum",
                    alias: "附近台站数",
                    type: "integer"
                }
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            outFields: ["ObjectID"],
            labelingInfo: [labelClass],
        });
        // peak.renderer={
        //     type: "simple", // autocasts as new SimpleRenderer()
        // symbol: {
        //     type: "point-3d",
        //     symbolLayers: [{
        //         type: "icon", // autocasts as new IconSymbol3DLayer()
        //         size: 30, // points
        //         resource: {
        //             href: hisIconLevel1
        //         },
        //     }]
        // }
        // }
        map.add(peak);

        view.on("click", function (event) {
            // event is the event handle returned after the event fires.
            clearInterval(window.myTimer)
            store.commit("setmyTimer", false)
            view.hitTest(event).then(function (response) {
                let eqHistory_branch = [];
                if (response.results.length) {
                    let graphic = response.results.filter(function (result) {
                        return result.graphic.layer === peak;
                    });
                    // do something with the result graphic
                    if (graphic[0]) {
                        for (let i = 0; i < data.length; i++) {
                            if (graphic[0].graphic.attributes.datetime == timeConvert(data[i][3]) && graphic[0].graphic.attributes.magnitude == data[i][7]) {
                                var p = new Promise(
                                    function (resolve, reject) {
                                        getStationEq(data[i][0]).then(res => {
                                            for (let j = 0; j < res.station.length; j++) {
                                                eqHistory_branch.push(res.station[j]);
                                            }
                                            resolve(console.log(eqHistory_branch))
                                        })
                                    }
                                )
                            }

                        };
                        p.then(() => {
                            setHistoryBranchMarker(eqHistory_branch, map, "setHistoryBranchMarker1",view);
                            popupStyle(8, 22.2)
                        })
                    }
                }
            })
        });
    }
}



const setHistoryBranchMarker = async function (data, map, id,view) {
    map.remove(layerBranch);
    let features = []
    for (const eq of data) {
        let pointCenter = {
            type: 'point',
            longitude: eq[11],
            latitude: eq[10],
        }

        let pointGraphic = new Graphic({
            geometry: pointCenter,
            attributes: {
                // EnglishName: eq[1],
                // ChineseName: eq[2],
                // earthTime: eq[3],
                // EpicentralLatitude: parseFloat(eq[4]).toFixed(3),
                // EpicentralLongitude: parseFloat(eq[5]).toFixed(3),
                // FocalDepth: eq[6],
                // magnitude: eq[7],
                StationName: eq[8],
                StationCode: eq[9],
                StationLatitude: parseFloat(eq[10]).toFixed(3),
                StationLongitude: parseFloat(eq[11]).toFixed(3),
                addressCondition: eq[12],
                recordModel: eq[13],
                measurePoint: eq[14],
                // recordOrient: eq[15],
                // SamplingInterval: eq[16],
                // duration: eq[17],
                // PGA: eq[18],
                // PGATime: eq[19],
            }
        });
        features.push(pointGraphic);
    }
    const iconRender = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: 30, // points
                resource: {
                    href:new URL('../../imgicon/taizhan.png',import.meta.url).href
                },

            }]
        }
    };
    const labelClass = {
        labelExpressionInfo: {
            value: "{StationName}",
        },
        symbol: {
            type: "label-3d", // autocasts as new LabelSymbol3D()
            symbolLayers: [{
                type: "text", // autocasts as new TextSymbol3DLayer()
                material: {
                    color: "#ffd554"
                },
                halo: {
                    color: [0, 0, 0, 0.4],
                    size: 1
                },
                size: 15
            }],
        },
        labelPlacement: "center-right",
    };
    //弹窗显示的属性 和 Graphic 和 feature的fields是相关联的
    let NearPopupTemplate = {
        title: "台站信息",
        content:getInfo,
        outFields:["*"]
    }
    function getInfo(feature){
        let graphic,attributes,content;
        if(store.getters.getSwitchEarthquakes == 7 && store.getters.getdialog == 1){
            dialogVisible.value=true;
        }else{
            dialogVisible.value=false
        }
        graphic = feature.graphic;
        attributes = graphic.attributes;
        console.log(graphic.attributes)
        dialogState.objectID = graphic.attributes.Object
        dialogState.stationName =graphic.attributes.StationName
        dialogState.objectID=graphic.attributes.ObjectID
        dialogState.stationCode=graphic.attributes.StationCode
        dialogState.stationLatitude=graphic.attributes.StationLatitude
        dialogState.stationLongitude=graphic.attributes.StationLongitude
        dialogState.stationName=graphic.attributes.StationName
        dialogState.addressCondition=graphic.attributes.addressCondition
        dialogState.measurePoint=graphic.attributes.measurePoint
        dialogState.recordModel=graphic.attributes.recordModel
        window.localStorage.setItem('station_code',graphic.attributes.StationCode)
        document.querySelector('.esri-popup').classList.add('hide-the-popup')
        return content;
    }
    if (features.length > 0) {
        const peak = new FeatureLayer({
            id: id,
            title: "地震信息",
            labelsVisible: true,
            source: features,
            popupTemplate: NearPopupTemplate,
            renderer: iconRender,
            fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
                {
                    name: "StationName",
                    alias: "台站名称",
                    type: "string"
                },
                {
                    name: "StationCode",
                    alias: "台站代码",
                    type: "string"
                },
                {
                    name: "StationLatitude",
                    alias: "台站纬度",
                    type: "string"
                },
                {
                    name: "StationLongitude",
                    alias: "台站经度",
                    type: "string"
                },
                {
                    name: "addressCondition",
                    alias: "场地条件",
                    type: "string"
                },
                {
                    name: "recordModel",
                    alias: "记录器型号",
                    type: "string"
                },
                {
                    name: "measurePoint",
                    alias: "测点方位",
                    type: "string"
                },
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            outFields: ["ObjectID"],
            labelingInfo: [labelClass],
        });

        map.add(peak);
        layerBranch = peak;
        view.on("click", function (event) {
            store.commit('setdialog',1)
        });
        return peak;
    }
    
}
const setStatus = function () {
    dialogVisible.value  = false;
    store.commit('setdialog',0)
}

export {
    epiLabel,
    pushHuapoDot,
    setHistoryMarker,
    dingshi,
    setprovinceDot,//添加省份标注
    setHistoryAllMarker,
    dialogVisible,
    dialogState,
    setStatus
}
