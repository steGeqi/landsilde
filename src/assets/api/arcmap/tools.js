import Graphic from "@arcgis/core/Graphic"
import Point from "@arcgis/core/geometry/Point"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import {
    epiLabel
} from "./marker"

const epicenter = (view, map, eqCenter, size, zoom,isDisplay) => {
    console.log(parseFloat(eqCenter[8]),parseFloat(eqCenter[9]));
    const peaks = epiLabel(eqCenter,view, size,"",isDisplay)

    let pt = new Point({
        latitude: isDisplay? 35.59131635382721: parseFloat(eqCenter[9]),
        longitude: isDisplay?107.09832957004965: parseFloat(eqCenter[8])
    });

    view.when(() => {
        view.goTo({
            target: pt,
            zoom: zoom
        })
    })
    map.add(peaks)
    return peaks;

}

const getdistancePlus = async function (view, map, id, info) { //返回起点座标或终点座标与一个点对象
    return new Promise((resolve) => {
        const viewClick = view.on("click", (event) => {
            viewClick.remove();
            var features = [];
            let labelClass = {};
            let pointCenter = {
                type: 'point',
                longitude: event.mapPoint.longitude, //lonlat.x,
                latitude: event.mapPoint.latitude, //lonlat.y,
            }
            labelClass = {
                symbol: {
                    type: "text", // autocasts as new TextSymbol()
                    color: "#00ff000",
                    haloColor: "white",
                    haloSize: 0,
                    font: { // autocast as new Font()
                        // family: "Ubuntu Mono",
                        size: 20,
                        weight: "bold"
                    }
                },
                labelPlacement: "center-right",
                labelExpressionInfo: {
                    value: info
                },
            }
            var pointGraphic = new Graphic({
                geometry: pointCenter,
            });
            features.push(pointGraphic)
            let dot = new FeatureLayer({
                id: id + info,
                //*设置3d标签可见*
                labelsVisible: true,
                source: features,
                objectIdField: "ObjectID",
                geometryType: "point",
                outFields: ["ObjectID"],
                labelingInfo: [labelClass],
            });
            map.add(dot);
            resolve({
                lat: event.mapPoint.latitude,
                lon: event.mapPoint.longitude,
                dot
            })
        })
    })
}
const transformView = async function (eqlonAndlat, emInfo, mode, view) { //变换地图的视角 mode: 1 跳到两点适合展示的位置 0 回到震中
    let lon, lat, x, ZOOM;
    if (mode) {
        x = emInfo.len
        //用拟合曲线方程算出合适的地图缩放级别
        ZOOM = -0.00002170192143715439 * x * x * x + 0.0032117085113587407 * x * x - 0.16915662087977124 * x + 14.403435452180036
        lon = Math.sqrt(emInfo.lon * parseFloat(eqlonAndlat.longitude))
        lat = Math.sqrt(emInfo.lat * parseFloat(eqlonAndlat.latitude))
    } else {
        ZOOM = 12
        lon = parseFloat(eqlonAndlat.longitude)
        lat = parseFloat(eqlonAndlat.latitude)
    }
    view.goTo({
        target: [lon, lat],
        zoom: ZOOM,
        heading: 0,
        tilt: 50
    }, {
        duration: 2000,
    })
}
export {
    epicenter,
    getdistancePlus,
    transformView
}