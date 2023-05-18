import {
    reactive
} from 'vue'
import {
    epicenter,

} from "./tools"
import {
    exampleAddWMTS,
    underlyingLayer,
} from "./area"
import {
    addfault_zoneF,
    pushHuapoIntensity,
    pushHuapoArea,
    pushHuapoLine,
    pushAdministrativeZoning,
    pushGeologicalMap,//地质图
    pushRiver,//河流水系
    pushGc
} from "./line"
import {
    pushHuapoDot,
    setprovinceDot
} from "./marker"

const layersSettings = reactive({
    geographic: {
        name: '基础信息',
        items: [{
            id: 'huapoDot',
            name: '滑坡',
            icon: new URL('../../imgicon/yellow.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushHuapoDot(map,view,type,isDisplay)
                // pushHuapoLine(map,type,isDisplay);
                // pushHuapoArea(map,type,isDisplay);

            }
        },{
            id: 'huapo',
            name: '滑坡轮廓',
            icon: new URL('../../imgicon/行政区划@hdpi.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                // pushHuapoDot(map,view,type,isDisplay)
                pushHuapoLine(map,type,isDisplay);
                pushHuapoArea(map,type,isDisplay);

            }
        }, {
            id: 'AdministrativeZoning',
            name: '行政区划',
            icon:new URL('../../imgicon/circleIcon1.png',import.meta.url).href ,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushAdministrativeZoning(map);
                setprovinceDot(map)
            }
        },{
            id: 'GeologicalMap',
            name: '地质图',
            icon:new URL('../../imgicon/GeologicalMap.png',import.meta.url).href ,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                exampleAddWMTS(map)
            }
        },
        //  {
        //     id: 'underlyingLayer',
        //     name: '基础图层',
        //     icon: new URL('../../imgicon/基础图层.png',import.meta.url).href ,
        //     checked: false,
        //     render: async (map, view, eqCenter,type,isDisplay) => {
        //         // underlyingLayer(map)
        //         exampleAddWMTS(map)
        //     }
        // },
          {
            id: 'eqCenterLayer',
            name: '震中位置',
            icon: new URL('../../imgicon/震中-图层@hdpi.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                epicenter(view, map, eqCenter, 7, 10)
            }
        }]
    },
    earthquake: {
        name: '地震信息',
        items: [{
            id: 'intensityCircle',
            name: '烈度圈',
            icon: new URL('../../imgicon/椭圆形@hdpi.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushHuapoIntensity(map,type,isDisplay)
            }
        }, {
            id: 'faultZone',
            name: '活动断裂',
            icon: new URL('../../imgicon/路径@hdpi.png',import.meta.url).href,
            checked: false,
            render: (map, viwe, eqCenter,type,isDisplay) => {
                addfault_zoneF(map,type,isDisplay);
            }
        }],

    },
    riverAndlake:{
        name:"河流水系",
        items:[{
            id: 'river_3',
            name: '三级河流',
            icon: new URL('../../imgicon/river_3.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushRiver(map,"river_3",3)

            }
        },
        {
            id: 'river_4',
            name: '四级河流',
            icon: new URL('../../imgicon/river_4.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushRiver(map,"river_4",4)

            }
        },
        {
            id: 'river_5',
            name: '五级河流',
            icon: new URL('../../imgicon/river_5.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushRiver(map,"river_5",5)

            }
        },
        {
            id: 'lake_3',
            name: '湖泊',
            icon: new URL('../../imgicon/lake_3.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushRiver(map,"lake_3",6)

            }
        }]
    },
    gcData:{
        name:"高程信息",
        items:[{
            id: 'ningxia_50',
            name: '宁夏(50m)',
            icon: new URL('../../imgicon/gc.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushGc(map,"gc0_50",'0_50')

            }
        },
        {
            id: 'ningxia_100',
            name: '宁夏(100m)',
            icon: new URL('../../imgicon/gc.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushGc(map,"gc1_50",'0_100')

            }
        },
        {
            id: 'gc2',
            name: '甘肃(50m)',
            icon: new URL('../../imgicon/gc.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushGc(map,"gc1_50",'1_50')

            }
        },
        {
            id: 'gc3',
            name: '甘肃(100m)',
            icon: new URL('../../imgicon/gc.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushGc(map,"gc1_50",'1_100')

            }
        },
        {
            id: 'gc4',
            name: '青海(100m)',
            icon: new URL('../../imgicon/gc.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushGc(map,"gc2_100",'2_100')

            }
        },
        {
            id: 'shanxi_50',
            name: '山西(50m)',
            icon: new URL('../../imgicon/gc.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushGc(map,"gc3_50",'3_50')

            }
        },
        {
            id: 'shanxi_100',
            name: '山西(100m)',
            icon: new URL('../../imgicon/gc.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushGc(map,"gc3_50",'3_100')

            }
        },
        {
            id: 'shaanxi_50',
            name: '陕西(50m)',
            icon: new URL('../../imgicon/gc.png',import.meta.url).href,
            checked: false,
            render: async (map, view, eqCenter,type,isDisplay) => {
                pushGc(map,"gc4_50",'4_50')

            }
        }
        ]
    }

})
const createStyle = (size, materialColor, haloColor) => {
    return {
        type: "label-3d", // autocasts as new LabelSymbol3D()
        symbolLayers: [{
            type: "text", // autocasts as new TextSymbol3DLayer()
            material: {
                color: materialColor
            },
            halo: {
                color: haloColor,
                size: 1
            },
            size
        }]
    }
}
const createLabelStyle = (size) => {
    return {
        type: "text", // autocasts as new TextSymbol()
        color: "#2a5caa",
        haloColor: "white",
        haloSize: 1,
        font: {
            size: size,
            weight: "bold"
        }
    }
}
const createIconRender = (size, icon) => {
    return {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "point-3d",
            symbolLayers: [{
                type: "icon", // autocasts as new IconSymbol3DLayer()
                size: size, // points
                resource: {
                    href: icon
                }
            }]
        }
    }
}
const type2icon = {}
for (const key in layersSettings) {
    for (const item of layersSettings[key].items) {
        type2icon[item.id] = item.icon
    }
}
const otherList = ['hospital', 'school', 'airport']

const layersStyle = {
    faultZone: [
        createStyle(8, "red", "white"),
        createStyle(11, "red", "white"),
        createStyle(14, "red", "white")
    ],
    historyEarthquake: [
        createStyle(8, "#ffd554", [0, 0, 0, 0.4]),
        createStyle(11, "#ffd554", [0, 0, 0, 0.4]),
        createStyle(14, "#ffd554", [0, 0, 0, 0.4])
    ],
    eqCenterLayer: [
        createStyle(14, "#f00", "#fff"),
        createStyle(17, "#f00", "#fff"),
        createStyle(21, "#f00", "#fff"),
    ],

}



const iconRenderStyle = {
    eqCenterLayer: [
        createIconRender(40, type2icon['eqCenterLayer']),
        createIconRender(60, type2icon['eqCenterLayer']),
        createIconRender(80, type2icon['eqCenterLayer'])
    ],
    historyEarthquake: [
        createIconRender(20, type2icon['historyEarthquake']),
        createIconRender(30, type2icon['historyEarthquake']),
        createIconRender(40, type2icon['historyEarthquake']),
    ],

}
export {
    layersSettings,
    layersStyle,
    iconRenderStyle,
    createLabelStyle,
    createIconRender
}
