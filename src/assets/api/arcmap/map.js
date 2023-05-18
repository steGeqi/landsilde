import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer";
import BingMapsLayer from "@arcgis/core/layers/BingMapsLayer";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import SpatialReference from "@arcgis/core/geometry/SpatialReference"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const longitude = 107.09832957004965
const latitude = 35.59131635382721
/**
 * 创建2D 地图 
 * @param {string} id 地图容器ID
 * @param {double}} longitude 经度
 * @param {double} latitude 纬度
 */
const create2DMap = function (id) {

    const map = new Map({
        basemap: "osm", //myBaseMap,
    })
    const view = new SceneView({
        container: id,
        map: map,
        zoom: 15,
        center: [longitude, latitude],
        popup: {
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: false,
                breakpoint: true
            }
        },
        spatialReference: new SpatialReference({
            wkid: 3857
        }),
        highlightOptions: {
            color: [255, 0, 0, 1],
            haloOpacity: 0.9,
            fillOpacity: 0.2,
        },
    });
    // 清空2d地图组件
    view.ui.components = [];

    console.log(view)
    return [map, view]
}
/**
 * 创建3D 地图 
 * @param {string} id 地图容器ID
 * @param {double}} longitude 经度
 * @param {double} latitude 纬度
 */
const create3DMap = function (id) {
    const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
        //高程夸张系数
        properties: {
            exaggeration: 1
        },
        //加载高程数据
        load: function () {
            this._elevation = new ElevationLayer({
                url: "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
            });
            this.addResolvingPromise(this._elevation.load());
        },
        //瓦片
        fetchTile: function (level, row, col) {
            return this._elevation.fetchTile(level, row, col)
                .then(function (data) {
                    var exaggeration = this.exaggeration
                    for (var i = 0; i < data.values.length; i++) {
                        data.values[i] = data.values[i] * exaggeration;
                    }
                    return data;
                }.bind(this));
        }

    });
    let position = {

        type: "point",

        x: 130,

        y: 30,

        spatialReference: { wkid: 4326 },

    }
    let textSymbol = {

        type: "text",

        color: "#2152AC",

        // angle: 90,

        haloColor: "#ffffff",

        haloSize: 1,

        backgroundColor: "#ffffff",

        borderLineSize: 1,

        borderLineColor: "#2152AC",

        text: "天河区dsddddddddddddddddddddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",

        font: {

            size: 15,

            family: "Josefin Slab",

        }

    };

    let graphic = new Graphic({

        geometry: position,

        symbol: textSymbol,

    });

    const baseLayer = new BingMapsLayer({
        style: "aerial",
        key: "Aup3y5WhKFPFbPZDeMbEJKOgstQzeMSEpHfWUdfTWxiRHcBbdp9-KpLU37Ul-RR5"
    });
    const map = new Map({
        basemap: {
            baseLayers: [baseLayer]
        },
        ground: {
            layers: [
                new ExaggeratedElevationLayer()
            ]
        },
    });
    let graphicsLayer = new GraphicsLayer();

    graphicsLayer.add(graphic)
    // map.add(graphicsLayer);

    const kansasExtent = {
        xmax: parseFloat(longitude) + 0.1,
        xmin: parseFloat(longitude) - 0.1,
        ymax: parseFloat(latitude) + 0.1,
        ymin: parseFloat(latitude) - 0.1,
        spatialReference: {
            wkid: 3857
        }
    };
    const view = new SceneView({
        zoom: 6,
        container: id,
        viewingMode: 'global',
        map: map,
        camera: {
            position: {
                x: longitude,
                y: latitude,
                z: 15000,
            },
            heading: 0,
        },
        clippingArea: kansasExtent,
        extent: kansasExtent,
        center: [longitude, latitude],
        constraints: {
            snapToZoom: true
        },
        spatialReference: new SpatialReference({
            wkid: 3857
        }),
        highlightOptions: {
            color: [255, 0, 0, 1],
            haloOpacity: 0.9,
            fillOpacity: 0.2,
        },
    });


    



    view.ui.components = []

    return [map, view]
}

function showExtent(ext) {
    var extentString = "";
    extentString = "XMin: " + ext.xmin +
        " YMin: " + ext.ymin +
        " XMax: " + ext.xmax +
        " YMax: " + ext.ymax;
    document.getElementsByClassName("tools")[0].innerHTML = extentString;
    console.log("-------------------------");
}

export {
    create2DMap,
    create3DMap
}