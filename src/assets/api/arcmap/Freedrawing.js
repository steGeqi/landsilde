import Sketch from "@arcgis/core/widgets/Sketch";
import Graphic from "@arcgis/core/Graphic"
import Circle from "@arcgis/core/geometry/Circle";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";
import store from "@/store"
// import { parseFloat } from "core-js/core/number";
const addSketch = (view,map)=>{
    const graphicsLayer = new GraphicsLayer({id:'sketchLayer'});
    graphicsLayer.opacity = 1;
    const sketch = new Sketch({
        view:view,
        // layout:"vertical",
        container:"tools1234",
        layer: graphicsLayer,
        defaultCreateOptions :{hasZ:false},
        availableCreateTools: [ "polygon", "rectangle", "circle"],//只显示这三个草图工具
        // graphic will be selected as soon as it is created
        creationMode: "update"
      });
    sketch.visibleElements = {settingsMenu: false}//去掉设置按钮
    view.ui.add(sketch);
    map.add(graphicsLayer)
    // sketch.visible = false
    // Listen to sketch widget's create event.


    sketch.on("update", onGraphicUpdate);
    function onGraphicUpdate(event) {
        const graphic = event.graphics[0];
        let ring = graphic.geometry.rings[0]
        let lineS = []
        for(let xy of ring){
            let lonlat = webMercatorUtils.xyToLngLat(xy[0],xy[1])
            lineS.push(lonlat)
        }
        upDotdata(lineS,map)
    }
    return sketch
}
const upDotdata = (ring,map)=>{

  let layerArr = []
  let idArr = ["huapoDot","huapoDot2"]
  for(let huapoID of idArr){
    if (store.getters.getSwitchEarthquakes == -1) {
        for (let i = 0; i < 7; i++) {
            let layer = map.findLayerById(huapoID + i);
            if (layer) {
                layerArr.push(layer)
            }
        }
    } else {
        let layer = map.findLayerById(huapoID);
        if (layer) {
            layerArr.push(layer)
        }
    }
  }
  let dotarr1 = []
  for(const layer of layerArr){
      for(let dot of layer.source.items){
          if(pointInPolygon([dot.geometry.longitude,dot.geometry.latitude],[ring])){
              dotarr1.push(dot)
          }
      }
  }
  let dotData = []
  for(let dot of dotarr1){
    dotData.push(dot.attributes.arr)
  }
  store.commit("setSketchDot",dotData)
}
const addSelectGraph = (map,lineSORlonlat,type)=>{
  console.log(lineSORlonlat);  
  const graphicsLayer = map.findLayerById("sketchLayer")
  let polygonEllipseGraphic
  let lineSymbol = {
      type: "simple-line",
      color: [57, 60, 64, 51],
      width: 2
  };
  let polygonEllipse
  if(type){
    polygonEllipse = {
      type: "polygon",
      rings: lineSORlonlat,
    };
  }else{
    polygonEllipse = new Circle({
        center:[parseFloat(lineSORlonlat[0]),parseFloat(lineSORlonlat[1])],
        radius:parseFloat(lineSORlonlat[2]),
        numberOfPoints:36,
        geodesic: true,
        spatialReference: { wkid: 3857 },
        radiusUnit: "kilometers",
        type: "polygon",
    })
  }
  polygonEllipseGraphic = new Graphic({
      geometry: polygonEllipse,
      symbol: lineSymbol,
  });
  graphicsLayer.addMany([polygonEllipseGraphic]);
  upDotdata(type?lineSORlonlat:polygonEllipse.rings[0],map)
}

const sketchExport = ()=>{
  let str = ""
  let arr = [
    "序号",
    // "野外编号",
    "滑坡名称",
    "经度（°）",
    "纬度（°）",
    "烈度",
    "滑体长度（m）",
    "滑体宽度（m）",
    "滑体覆盖范围（m）",
    "主滑方向（°）",
    "滑坡最大水平距离（m）",
    "滑坡最大垂直距离（m）",
    "原始斜坡坡向（°）",
    "原始斜坡坡角（°）",
    "滑坡平面形态",
    "震中距（km）",
    "相对震中的方位角（°）",
    "断层距（km）",
  ];
  let dotData1 = store.getters.getSketchDot

  for(let i of arr){
    str += i+','
  }
  str += '\n'
  for(let list of dotData1){
    for(let i=0;i<list.length-3;i++){
      if(list[i]==null || list[i] == 'None' ){
        // list[i] = ""
        continue
      }
      if(i>=6 && i<=13){
        list[i] = parseFloat(list[i]).toFixed(0)
      }
      str += list[i]+','
    }
    str += '\n'
  }
  let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  //通过创建a标签实现
  var link = document.createElement("a");
  link.href = uri;
  //对下载的文件命名
  link.download =  "滑坡数据表.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/**
* 点和面关系
* @param point 点；[经度,纬度]；例：[116.353455, 40.080173]
* @param polygon 面；geojson格式中的coordinates；例：[[[116.1,39.5],[116.1,40.5],[116.9,40.5],[116.9,39.5]],[[116.3,39.7],[116.3,40.3],[116.7,40.3],[116.7,39.7]]]
*
* @return inside 点和面关系；0:多边形外，1：多边形内，2：多边形边上
*/
function pointInPolygon(point, polygon) {
    var isInNum = 0;
    for (var i = 0; i < polygon.length; i++) {
      var inside = pointInRing(point, polygon[i])
      if (inside === 2) {
        return 2;
      } else if (inside === 1) {
        isInNum++;
      }
    }
    if (isInNum % 2 == 0) {
      return 0;
    } else if (isInNum % 2 == 1) {
      return 1;
    }
  }
  
  
  /**
  * 点和面关系
  * @param point 点
  * @param ring 单个闭合面的坐标
  *
  * @return inside 点和面关系；0:多边形外，1：多边形内，2：多边形边上
  */
  function pointInRing(point, ring) {
    var inside = false,
      x = point[0],
      y = point[1],
      intersects, i, j;
  
    for (i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var xi = ring[i][0],
        yi = ring[i][1],
        xj = ring[j][0],
        yj = ring[j][1];
  
      if (xi == xj && yi == yj) {
        continue
      }
      // 判断点与线段的相对位置，0为在线段上，>0 点在左侧，<0 点在右侧
      if (isLeft(point, [ring[i], ring[j]]) === 0) {
        return 2; // 点在多边形边上
      } else {
        if ((yi > y) !== (yj > y)) { // 垂直方向目标点在yi、yj之间
          // 求目标点在当前线段上的x坐标。 由于JS小数运算后会转换为精确15位的float，因此需要去一下精度
          var xx = Number(((xj - xi) * (y - yi) / (yj - yi) + xi).toFixed(10))
          if (x <= xx) { // 目标点水平射线与当前线段有交点
            inside = !inside;
          }
        }
      }
    }
    return Number(inside);
  }
  
  
  /**
  * 判断点与线段的相对位置
  * @param point 目标点
  * @param line 线段
  *
  * @return isLeft，点与线段的相对位置，0为在线段上，>0 p在左侧，<0 p在右侧
  */
  function isLeft(point, line) {
    var isLeft = ((line[0][0] - point[0]) * (line[1][1] - point[1]) - (line[1][0] - point[0]) * (line[0][1] - point[1]))
    // 由于JS小数运算后会转换为精确15位的float，因此需要去一下精度
    return Number(isLeft.toFixed(10))
  }

export{
    addSketch,
    sketchExport,
    addSelectGraph,
}
