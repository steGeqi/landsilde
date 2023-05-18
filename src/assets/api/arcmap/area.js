import WebTileLayer from "@arcgis/core/layers/WebTileLayer"

import SpatialReference from "@arcgis/core/geometry/SpatialReference";
const underlyingLayer = async function (map) {

    //首先设定瓦片信息，天地图经纬度地图的切片信息全部使用该信息设定

    //高德路网
    // let TMSLayer = BaseTileLayer.createSubclass({
    //     properties: {
    //         urlTemplate: null
    //     },

    //     getTileUrl: function(z, y, x) {
    //         // 这里对y轴瓦片编号进行转置
    //         //let y2 = Math.pow(2, z) - y - 1;

    //         return this.urlTemplate
    //             .replace("{z}", z)
    //             .replace("{x}", x)
    //             .replace("{y}", y);
    //     },
    // })
    // let tmsLayer = new TMSLayer({
    //     urlTemplate: "http://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=286783&scale=1&style=8"
    // });
    // this.map.add(tmsLayer)
    // return tmsLayer


    // // console.log(level);
    // // let getTileUrl = (level, row, col) => {
    // //     return "http://t" + row % 8 + ".tianditu.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles&tk=0668827d02828b65997a03dc654a5bc1";
    // // }
    // // let spatialReference = new SpatialReference({ wkid: 4490 })
    // var tiledLayer_poi = new WebTileLayer({
    //     // urlTemplate: "http://{subDomain}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX=10&TILEROW={row}&TILECOL={col}&tk=0668827d02828b65997a03dc654a5bc1",
    //     urlTemplate: "http://webst01.is.autonavi.com/appmaptile?x={col}&y={row}&z={level}&lang=zh_cn&size=286783&scale=1&style=8",
    //     copyright: 'Tianditu',
    //     id: 'Tianditu1',
    //     // subDomains: ["t0"],
    //     // spatialReference: spatialReference,
    //     // tileInfo: tileInfo
    // });
    // this.map.add(tiledLayer_poi, 0)
    // return tiledLayer_poi
    let baseMapMarker = new WebTileLayer("https://{subDomain}.tianditu.gov.cn/DataServer?t=cia_w&x={col}&y={row}&l={level}&tk=0668827d02828b65997a03dc654a5bc1", {
        // let baseMapMarker = new WebTileLayer("https://{subDomain}.tianditu.gov.cn/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={x}&TILECOL={y}&tk=ff8a70be92b11b0a15b79f40eab2f64d", {
        // let baseMapMarker = new WebTileLayer("http://{subDomain}.tianditu.gov.cn/cia_w/wmts?tk=ff8a70be92b11b0a15b79f40eab2f64d", {
        copyright: 'Tianditu',
        // level: 10,
        id: 'underlyingLayer',
        subDomains: ["t0"],
        // tileInfo: tileInfo
    });
    // // let basedivision = new WebTileLayer("https://{subDomain}.tianditu.gov.cn/DataServer?t=ibo_w&x={col}&y={row}&l={level}&tk=ff8a70be92b11b0a15b79f40eab2f64d", {
    // //     copyright: 'Tianditu',
    // //     id: 'Tianditu2',
    // //     subDomains: ['t1'],
    // // });
    map.add(baseMapMarker, 0);
    // // this.map.add(basedivision, 0);
    return baseMapMarker;
}
function exampleAddWMTS(map) {

    let baseMapMarker = new WebTileLayer({
        id: 'GeologicalMap',
        urlTemplate:
            'http://47.92.216.173:502/geoserver/gwc/service/wmts?layer=huapo%3Adzt&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{level}&TileCol={col}&TileRow={row}',
        spatialReference: new SpatialReference({ wkid: 3857 }),

    })
    map.add(baseMapMarker, 0);

}
export {
    underlyingLayer,
    exampleAddWMTS
}
