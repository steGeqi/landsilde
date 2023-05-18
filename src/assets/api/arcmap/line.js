import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import WebTileLayer from "@arcgis/core/layers/WebTileLayer"
import SpatialReference from "@arcgis/core/geometry/SpatialReference"

import {baseFun} from "@/api/request"


const pushHuapoIntensity = async function (map,type,isDisplay) { //添加烈度圈

    let lineSymbol = {};
    let labelClass = {};

    lineSymbol = { //这里设置折线的样式
        type: "simple-line",
        color: [255,0, 255],
        width: 2
    };
    let fault_zone = {
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "title",
                label: "说明",
            },{
                fieldName: "len",
                label: "长度",
            }]
        }]
    }
    labelClass = { // autocasts as new LabelClass() //这里设置折线上方的文本样式
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#ff0000",
            font: { // autocast as new Font()
                size: 20,
                weight: "bold"
            },
        },
        labelExpressionInfo: {
            expression: "$feature.title"
        },
    };
    let Graphics = []
    let huapoIntensity = await baseFun("get_json_file",`${type}_1`)
    for (const item of huapoIntensity.features) {
        // pushTongweiLine1(item.geometry.paths,{len:item.attributes.length,title:item.attributes.name},map)
        let polyline = {
            type: "polyline",
            paths: item.geometry.paths,
        };
    
        let polylineGraphic = {
            geometry: polyline,
            attributes: {
                title:item.attributes.intensity
            },
        };
        Graphics.push(polylineGraphic)
    }

    let featureLayer = new FeatureLayer({ 
        id:isDisplay?"intensityCircle"+type:"intensityCircle",
        title: "烈度圈",
        fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
            {
                name: 'title',
                alias: 'title',
                type: 'string'
            },
        ],
        objectIdField: "ObjectID",
        geometryType: "polyline",
        outFields: ["*"],
        labelingInfo: [labelClass],
        // popupTemplate: fault_zone, //弹窗模板
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: lineSymbol
        },
    })

    featureLayer.source = Graphics
    map.add(featureLayer)
    return {
        featureLayer
    }
}
const pushHuapoArea = async function (map,type,isDisplay) { //添加滑坡圈
    let lineSymbol = {};
    let labelClass = {};

    lineSymbol = { //这里设置折线的样式
        type: "simple-line",
        color: [255, 255, 0],
        width: 2
    };
    let fault_zone = {
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "title",
                label: "说明",
            },{
                fieldName: "len",
                label: "长度",
            }]
        }]
    }
    labelClass = { // autocasts as new LabelClass() //这里设置折线上方的文本样式
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#ff0000",
            font: { // autocast as new Font()
                size: 15,
                weight: "bold"
            },
        },
        labelExpressionInfo: {
            // expression: "$feature.title"
        },
    };
    let Graphics = []
    let huapoArea = await baseFun("get_json_file",`${type}_2_2`)
    for (const item of huapoArea.features) {
        // pushTongweiLine1(item.geometry.paths,{len:item.attributes.length,title:item.attributes.name},map)
        let polyline = {
            type: "polyline",
            paths: item.geometry.paths,
        };
    
        let polylineGraphic = {
            geometry: polyline,
            attributes: {
                len:item.attributes.length,
                title:item.attributes.name
            },
        };
        Graphics.push(polylineGraphic)
    }

    let featureLayer = new FeatureLayer({
        id:isDisplay?"huapoArea"+type:"huapoArea",
        title: "滑坡圈",
        fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
            {
                name: 'len',
                alias: 'len',
                type: 'string'
            },
            {
                name: 'title',
                alias: 'title',
                type: 'string'
            },
        ],
        objectIdField: "ObjectID",
        geometryType: "polyline",
        outFields: ["*"],
        labelingInfo: [labelClass],
        // popupTemplate: fault_zone, //弹窗模板
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: lineSymbol
        },
    })

    featureLayer.source = Graphics
    map.add(featureLayer)
    return {
        featureLayer
    }
}
const pushHuapoLine = async function (map,type,isDisplay) { //添加滑坡线
    let lineSymbol = {};
    let labelClass = {};

    lineSymbol = { //这里设置折线的样式
        type: "simple-line",
        color: [0, 255, 255],
        width: 2
    };
    let fault_zone = {
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "title",
                label: "说明",
            },{
                fieldName: "len",
                label: "长度",
            }]
        }]
    }
    labelClass = { // autocasts as new LabelClass() //这里设置折线上方的文本样式
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#ff0000",
            font: { // autocast as new Font()
                size: 15,
                weight: "bold"
            },
        },
        labelExpressionInfo: {
            // expression: "$feature.len"
        },
    };
    let Graphics = []
    let huapoLine = await baseFun("get_json_file",`${type}_2_1`)
    console.log(huapoLine);
    for (const item of huapoLine.features) {
        // pushTongweiLine1(item.geometry.paths,{len:item.attributes.length,title:item.attributes.name},map)
        let polyline = {
            type: "polyline",
            paths: item.geometry.paths,
        };
    
        let polylineGraphic = {
            geometry: polyline,
            attributes: {
                len:item.attributes.length,
                title:item.attributes.name
            },
        };
        Graphics.push(polylineGraphic)
    }

    let featureLayer = new FeatureLayer({ 
        id:isDisplay?"huapoLine"+type:"huapoLine",
        title: "滑坡线",
        fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
            {
                name: 'len',
                alias: 'len',
                type: 'string'
            },
            {
                name: 'title',
                alias: 'title',
                type: 'string'
            },
        ],
        objectIdField: "ObjectID",
        geometryType: "polyline",
        outFields: ["*"],
        labelingInfo: [labelClass],
        popupTemplate: fault_zone, //弹窗模板
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: lineSymbol
        },
    })

    featureLayer.source = Graphics
    map.add(featureLayer)
    return {
        featureLayer
    }
}
const pushAdministrativeZoning = async function (map) { //添加行政区划
    let lineSymbol = {};
    let labelClass = {};

    lineSymbol = { //这里设置折线的样式
        type: "simple-line",
        color: [255, 255, 0],
        width: 2
    };
    labelClass = { // autocasts as new LabelClass() //这里设置折线上方的文本样式
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#ff0000",
            font: { // autocast as new Font()
                size: 15,
                weight: "bold"
            },
        },
        labelExpressionInfo: {
            expression: "$feature.name"
        },
    };
    let Graphics = []
    let huapoLine = await baseFun("get_json_file",`7_7_7`)
    for (const item of huapoLine.features) {
        let polyline = {
            type: "polyline",
            paths: item.geometry.paths
        };
    
        let polylineGraphic = {
            geometry: polyline,
        };
        Graphics.push(polylineGraphic)
    }
    let featureLayer = new FeatureLayer({ 
        id:"AdministrativeZoning",
        title: "行政区划",
        fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
        ],
        objectIdField: "ObjectID",
        geometryType: "polyline",
        outFields: ["*"],
        labelingInfo: [labelClass],
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: lineSymbol
        },
    })

    featureLayer.source = Graphics
    map.add(featureLayer)
}
const pushRiver = async function (map,id,type) { //添加河流水系
    let lineSymbol = {};
    let labelClass = {};
    let colorList = ["#00CCFF","#0099FF","#0000CC","#66CCFF"]

    lineSymbol = { //这里设置折线的样式
        type: "simple-line",
        color: colorList[type-3],
        width: 2
    };

    labelClass = { // autocasts as new LabelClass() //这里设置折线上方的文本样式
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#ff0000",
            font: { // autocast as new Font()
                size: 15,
                weight: "bold"
            },
        },
        labelExpressionInfo: {
            expression: "$feature.name"
        },
    };
    let Graphics = []
    let jsonFile = await baseFun("get_json_file",`7_7_${type+5}`)
    console.log(jsonFile,id);
    for (const item of jsonFile.features) {
        let polyline
        if(item.geometry.paths){
            polyline = {
                type: "polyline",
                paths: item.geometry.paths,
            };
        
        }else{
            polyline = {
                type: "polyline",
                paths: item.geometry.rings,
            };            
        }
    
        let polylineGraphic = {
            geometry: polyline,
            attributes: {
                len:item.attributes.LENGTH,
                name:item.attributes.NAME
                // title:item.attributes.name
            },
        };
        Graphics.push(polylineGraphic)
    }

    let featureLayer = new FeatureLayer({
        id:id,
        title: "河流水系",
        fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
            {
                name: 'len',
                alias: 'len',
                type: 'string'
            },
            {
                name: 'name',
                alias: 'name',
                type: 'string'
            },
        ],
        objectIdField: "ObjectID",
        geometryType: "polyline",
        outFields: ["*"],
        labelingInfo: [labelClass],
        // popupTemplate: fault_zone, //弹窗模板
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: lineSymbol
        },
    })

    featureLayer.source = Graphics
    map.add(featureLayer)
    return {
        featureLayer
    }
}
const pushGeologicalMap = async function (map,id,type) { //添加地质图
    let lineSymbol = {};
    let labelClass = {};
    let colorList = ["#00CCFF","#00CCFF","#0000CC","#66CCFF"]
    console.log('地质图');
    lineSymbol = { //这里设置折线的样式
        type: "simple-line",
        color: colorList[type],
        width: 2
    };
    let fault_zone = {
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "USERID",
                label: "USERID",
            },{
                fieldName: "UNITNAME",
                label: "UNITNAME",
            },{
                fieldName: "perimeter",
                label: "周长(KM)",
            },{
                fieldName: "arer",
                label: "面积(KM²)",
            }]
        }]
    }
    labelClass = { // autocasts as new LabelClass() //这里设置折线上方的文本样式
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#ff0000",
            font: { // autocast as new Font()
                size: 15,
                weight: "bold"
            },
        },
        // labelExpressionInfo: {
        //     expression: "$feature.name"
        // },
    };
    let Graphics = []
    let jsonFile = await baseFun("get_json_file",`7_7_${type+12}`)
    console.log(jsonFile,id);
    for (const item of jsonFile.features) {
        let polyline = {
                type: "polyline",
                paths: item.geometry.rings,
            };  
        let polylineGraphic = {
            geometry: polyline,
            attributes: {
                USERID:item.attributes.USERID,
                UNITNAME:item.attributes.UNITNAME,
                perimeter:item.attributes['周长'],
                arer:item.attributes['面积'],
                // title:item.attributes.name
            },
        };
        Graphics.push(polylineGraphic)
    }

    let featureLayer = new FeatureLayer({
        id:id+type,
        title: "地质图",
        fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
            {
                name: 'USERID',
                alias: 'USERID',
                type: 'string'
            },
            {
                name: 'UNITNAME',
                alias: 'UNITNAME',
                type: 'string'
            },
            {
                name: 'perimeter',
                alias: 'perimeter',
                type: 'string'
            },
            {
                name: 'arer',
                alias: 'arer',
                type: 'string'
            },
        ],
        objectIdField: "ObjectID",
        geometryType: "polyline",
        outFields: ["*"],
        labelingInfo: [labelClass],
        popupTemplate: fault_zone, //弹窗模板
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: lineSymbol
        },
    })

    featureLayer.source = Graphics
    map.add(featureLayer)
    return {
        featureLayer
    }
}
const addfault_zoneF = async function (map,type,isDisplay) { //断裂带

    let SeismicFault = await baseFun("get_json_file",`${type}_0`)
    const lineSymbol = {
        type: "simple-line",
        width: 3,
        color: [255, 0, 0],
        style: 'solid'
        // symbolLayers: [{
        //     type: "line",
        //     size: 2,
        //     material: {
        //         color: [255, 0, 0]
        //     },
        // }],
        // outline: { // autocasts as new SimpleLineSymbol()
        //     width: 6,
        //     color: "white"
        // }
    };
    const labelClass = {
        // When using callouts on labels, "above-center" is the only allowed position
        labelExpressionInfo: {
            //value: "$feature.断裂带的名称",
            expression: "$feature.FaultZoneName"
        },
        symbol: {
            type: "label-3d", // autocasts as new LabelSymbol3D()
            symbolLayers: [{
                type: "text", // autocasts as new TextSymbol3DLayer()
                material: {
                    color: "red"
                },
                halo: {
                    color: "white",
                    size: 1
                },
                size: 10
            }],
        },
    };
    let ididididididididid = isDisplay?"faultZone"+type:"faultZone"
    console.log(ididididididididid);
    const featureLayer = new FeatureLayer({
        id: ididididididididid,
        title: "断裂带",
        fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
            {
                name: 'FaultZoneName',
                alias: 'FaultZoneName',
                type: 'string'
            },
            {
                name: 'ID',
                alias: 'ID',
                type: 'string'
            }
        ],
        objectIdField: "ObjectID",
        geometryType: "polyline",
        outFields: ["*"],
        labelingInfo: [labelClass],
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: lineSymbol,
            outline: { // autocasts as new SimpleLineSymbol()
                width: 6,
                color: "white"
            }
            // symbol: testSymbol
        },
    })

    let Graphics = []
    SeismicFault.features.forEach(e => {
        let polyline = {
            type: "polyline",
            paths: e.geometry.paths
        };
        let polylineGraphic = {
            geometry: polyline,
            attributes: {
                FaultZoneName: e.attributes.Name,
                ID: e.attributes.ID,
                FaultLengt:e.attributes.FaultLengt,
            },
        };
        Graphics.push(polylineGraphic)
    })
    featureLayer.source = Graphics
    map.add(featureLayer)
    // return [bottomFeatureLayer, featureLayer];
}
const protractPath = async function (data, id, map) { //量算曲线 返回一个曲线(严格说是两条)

    let lineSymbol = {};
    let outlineSymbol = {};
    let labelClass = {};

    lineSymbol = { //这里设置折线的样式
        type: "simple-line",
        color: [0, 0, 255],
        width: 2
    };
    outlineSymbol = { //搭在路线下的边框
        type: "simple-line",
        color: [0, 255, 0],
        width: 6
    };
    let fault_zone = {
        title: "道路信息",
        content: [{
            type: "fields",
            fieldInfos: [{
                    fieldName: "RoadName",
                    label: "道路名称",
                },
                {
                    fieldName: "road_type",
                    label: "道路类型",
                },
                {
                    fieldName: "status",
                    label: "路况",
                },
                {
                    fieldName: "adcodes",
                    label: "途经城市编码",
                },
            ]
        }]
    }
    labelClass = { // autocasts as new LabelClass() //这里设置折线上方的文本样式
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "#ff0000",
            font: { // autocast as new Font()
                size: 15,
                weight: "bold"
            },
        },
        labelExpressionInfo: {
            expression: "$feature.RoadName"
        },
    };



    let Graphics = []
    data.steps.forEach(paths => {
        var road_type;
        var status;
        switch (paths.road_type) {
            case 0:
                road_type = "高速路";
                break;
            case 1:
                road_type = "城市高速路";
                break;
            case 2:
                road_type = "国道";
                break;
            case 3:
                road_type = "省道";
                break;
            case 4:
                road_type = "县道";
                break;
            case 5:
                road_type = "乡镇村道";
                break;
            case 6:
                road_type = "其他道路";
                break;
            case 7:
                road_type = "九级路";
                break;
            case 8:
                road_type = "航线(轮渡)";
                break;
            default:
                road_type = "行人道路";
                break;
        }
        switch (paths.traffic_condition[0].status) {
            case 0:
                status = "无路况";
                break;
            case 1:
                status = "畅通";
                break;
            case 2:
                status = "缓行";
                break;
            case 3:
                status = "拥堵";
                break;
            default:
                status = "非常拥堵";
                break;
        }
        var paths_ = [];
        paths.path.split(";").forEach(path => {
            let lonlat_ = path.split(",")
            paths_.push([parseFloat(lonlat_[0]), parseFloat(lonlat_[1])])
        })
        let polyline = {
            type: "polyline",
            paths: paths_
        };

        let polylineGraphic = {
            geometry: polyline,
            attributes: {
                RoadName: paths.road_name,
                road_type: road_type,
                status: status,
                adcodes: paths.adcodes,
            },
        };
        Graphics.push(polylineGraphic)
    })
    let featureLayer = new FeatureLayer({ //道路曲线
        id,
        title: "道路",
        fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            },
            {
                name: 'RoadName',
                alias: 'RoadName',
                type: 'string'
            },
            {
                name: 'road_type',
                alias: 'reason',
                type: 'string'
            },
            {
                name: 'status',
                alias: 'reason',
                type: 'string'
            },
            {
                name: 'adcodes',
                alias: 'reason',
                type: 'string'
            },
        ],
        objectIdField: "ObjectID",
        geometryType: "polyline",
        outFields: ["*"],
        labelingInfo: [labelClass],
        popupTemplate: fault_zone, //弹窗模板
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: lineSymbol
        },
    })

    // let bottomFeatureLayer = new FeatureLayer({ //道路曲线的边框
    //     objectIdField: "ObjectID",
    //     geometryType: "polyline",
    //     outFields: ["*"],
    //     renderer: {
    //         type: "simple", // autocasts as new SimpleRenderer()
    //         symbol: outlineSymbol
    //     },
    // })
    featureLayer.source = Graphics
    // bottomFeatureLayer.source = Graphics
    // map.add(bottomFeatureLayer)
    map.add(featureLayer)
    return {
        featureLayer,
        // bottomFeatureLayer
    }

}
const pushGc = async function(map,id,type){
    if(type === '0_50'){
        const politicsArea = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Aningxia-50&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'ningxia_50'
        })
        map.add(politicsArea)
    }else if(type === '0_100'){
        const politicsArea = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Aningxia-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'ningxia_100'
        })
        map.add(politicsArea)
    }else if(type === '1_50'){
        const politicsArea1 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Agansu1-50&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'gansu1_50'
        })
        const politicsArea2 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Agansu2-50&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'gansu2_50'
        })
        map.add(politicsArea1)
        map.add(politicsArea2)
    }else if(type === '1_100'){
        const politicsArea1 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Agansu2-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'gansu2_100'
        })
        const politicsArea2 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Agansu3-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'gansu3_100'
        })
        const politicsArea3 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Agansu3-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'gansu4_100'
        })
        const politicsArea4 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Agansu3-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'gansu5_100'
        })
        map.add(politicsArea1)
        map.add(politicsArea2)
        map.add(politicsArea3)
        map.add(politicsArea4)
    }else if(type === '2_100'){
        const politicsArea1 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Aqinghai1-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'qinghai1_100'
        })
        const politicsArea2 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Aqinghai2-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'qinghai2_100'
        })
        const politicsArea3 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Aqinghai3-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'qinghai3_100'
        })
        const politicsArea4 = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Aqinghai4-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'qinghai4_100'
        })
        map.add(politicsArea1)
        map.add(politicsArea2)
        map.add(politicsArea3)
        map.add(politicsArea4)
    }else if(type === '3_50'){
        const politicsArea = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Ashanxi-50&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'shanxi_50'
        })
        map.add(politicsArea)
    }else if(type === '3_100'){
        const politicsArea = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Ashanxi-100&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'shanxi_100'
        })
        map.add(politicsArea)
    }else if(type === '4_50'){
        const politicsArea = new WebTileLayer({
            urlTemplate: "http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Ashaanxi-50&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}",
            spatialReference: new SpatialReference({ wkid: 3857 }),
            id:'shaanxi_50'
        })
        map.add(politicsArea)
    }
}

export {
    addfault_zoneF,
    pushHuapoArea,
    pushHuapoLine,
    pushHuapoIntensity,
    protractPath,
    pushAdministrativeZoning,
    pushRiver,
    pushGeologicalMap,
    pushGc
}